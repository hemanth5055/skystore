// lib/actions/addFile.ts
import { prisma } from "@/prisma";

const MAX_STORAGE = 100 * 1024 * 1024; // 100 MB

export async function addFile({ file, userId }: { file: any; userId: string }) {
  // Create file record in DB
  const result = await prisma.file.create({
    data: {
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.url,
      userId: userId,
      fileKey: file.key,
    },
  });
  const updateUserSpaceUsed = await prisma.user.update({
    where: { id: userId },
    data: {
      spaceUsed: {
        increment: file.size,
      },
    },
  });
  return result;
}

export async function userFreespace(userId: string): Promise<number> {
  if (!userId) return 0;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { spaceUsed: true },
  });

  const used = user?.spaceUsed || 0;
  const free = MAX_STORAGE - used;

  return free > 0 ? free : 0;
}

export async function fileAlreadyExists(fileName: string, userId: string) {
  const file = prisma.file.findFirst({
    where: {
      name: fileName,
      userId,
    },
  });
  return file;
}

export async function changeName(fileKey: string, newName: string) {
  const res = await prisma.file.update({
    where: { fileKey },
    data: { name: newName },
  });
  return res;
}
export async function findFileByName(name: string) {
  const res = await prisma.file.findFirst({
    where: { name },
  });
  return res;
}
