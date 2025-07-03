// app/api/file-sizes/route.ts
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const files = await prisma.file.findMany({
      where: { userId },
      select: { size: true, type: true },
    });

    let imageSize = 0;
    let videoSize = 0;
    let pdfSize = 0;

    files.forEach((file) => {
      if (!file.type) return;

      if (file.type.startsWith("image/")) imageSize += file.size;
      else if (file.type.startsWith("video/")) videoSize += file.size;
      else if (file.type === "application/pdf") pdfSize += file.size;
    });

    return NextResponse.json({
      imageSize,
      videoSize,
      pdfSize,
      total: imageSize + videoSize + pdfSize,
    });
  } catch (error) {
    console.error("Error fetching file sizes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
