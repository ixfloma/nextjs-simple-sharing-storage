import fs from "fs";
import path from "path";
import { FileDownload } from "../definition";

export function handleGetListFile(
  sortBy: "date" | "alphabet" = "alphabet"
): FileDownload[] {
  const directoryPath = process.env.LOCAL_STORAGE_PATH;

  if (!directoryPath) return [];
  try {
    const files = fs.readdirSync(directoryPath);
    let fileDetails = files.map((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);
      return {
        filename: file,
        date: stats.mtime, // Modification time
      };
    });

    if (sortBy === "date") {
      fileDetails = fileDetails.sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
    } else if (sortBy === "alphabet") {
      fileDetails = fileDetails.sort((a, b) =>
        a.filename.localeCompare(b.filename)
      );
    }

    return fileDetails;
  } catch (err) {
    console.error("Unable to scan directory: " + err);
    return [];
  }
}
