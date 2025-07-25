import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { utapi } from "@/utlis/uploadthingServer";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const session = await auth();

  if (!session || !session.user) {
    console.log("Unauthorized");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { key } = await params;
  try {
    // 1. Delete the file from UploadThing
    const utDeleteRes = await utapi.deleteFiles(key);
    if (!utDeleteRes.success) {
      return NextResponse.json(
        { message: "Failed to delete file from storage" },
        { status: 500 }
      );
    }
    const res = await prisma.file.delete({
      where: {
        fileKey: key,
      },
    });
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        spaceUsed: {
          decrement: res.size,
        },
      },
    });
    return NextResponse.json({
      success: true,
      space: res,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
