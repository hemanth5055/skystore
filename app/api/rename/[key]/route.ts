import { utapi } from "@/utlis/uploadthingServer";
import { NextRequest, NextResponse } from "next/server";
// Update this to use your actual DB logic
import { changeName, findFileByName } from "@/actions/file";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const { newName } = await req.json();

    if (!newName || !key) {
      return NextResponse.json(
        { success: false, message: "Missing data" },
        { status: 400 }
      );
    }
    const isAlreadyExists = await findFileByName(newName);
    if (isAlreadyExists) {
      return NextResponse.json(
        { success: false, message: `File with \" ${newName} \"already exists` },
        { status: 500 }
      );
    }
    const utRes = await utapi.renameFiles({ fileKey: key, newName });
    if (!utRes?.success) {
      return NextResponse.json(
        { success: false, message: "UploadThing rename failed" },
        { status: 500 }
      );
    }
    const res = await changeName(key, newName);
    return NextResponse.json({
      success: res,
      message: "File renamed successfully",
    });
  } catch (error) {
    console.error("Rename error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
