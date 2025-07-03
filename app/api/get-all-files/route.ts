// app/api/files/route.ts
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
      orderBy: { createdAt: "desc" }, // optional: newest first
    });
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Failed to fetch files:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
