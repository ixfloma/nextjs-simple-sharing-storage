import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("filelocation");

  const localStoragePath = process.env.LOCAL_STORAGE_PATH;

  if (!localStoragePath)
    return new NextResponse("Local storage path is not defined", {
      status: 500,
    });

  const filePath = path.join(localStoragePath, query || "");
  const fileBuffer = await fs.readFile(filePath);
  const fileName = path.basename(query || "");
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
};
