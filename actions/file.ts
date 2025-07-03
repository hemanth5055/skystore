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
