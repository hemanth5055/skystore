import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";
import { addFile, userFreespace } from "@/actions/file";

const f = createUploadthing();

export const ourFileRouter = {
  skystore: f({
    image: { maxFileSize: "32MB", maxFileCount: 1 },
    video: { maxFileSize: "32MB", maxFileCount: 1 },
    pdf: { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .middleware(async ({ files }) => {
      const session = await auth();
      if (!session) throw new UploadThingError("Unauthorized");
      const free = await userFreespace(session.user.id);
      const incomingSize = files.reduce((acc, file) => acc + file.size, 0);
      if (free < incomingSize) {
        throw new UploadThingError(
          "You have exceeded your storage limit of 100MB"
        );
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const userId = metadata.userId;
      const result = await addFile({
        userId,
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          url: file.ufsUrl,
          key:file.key
        },
      });
      if (result) {
        return result;
      }
      throw new UploadThingError("Failed to add file to database");
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
