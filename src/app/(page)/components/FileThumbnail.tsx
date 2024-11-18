"use client";

import { PlayCircleIcon } from "lucide-react";
import { FileDownload } from "../definition";

const FileThumbnail: React.FC<{ file: FileDownload }> = ({
  file: { fileUrl, filename, date },
}) => {
  const handleDownload = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onClick={() => handleDownload(fileUrl)}
      className="flex gap-4 justify-between cursor-pointer text-center p-4 rounded-lg bg-slate-50"
    >
      <div className="w-24 h-24 bg-gray-300 rounded-lg shrink-0 flex items-center justify-center">
        <PlayCircleIcon className="w-8 h-8 text-white" />
      </div>
      <div className="flex flex-col w-full items-start justify-between text-left text-slate-800">
        <p>{filename}</p>
        <p className="text-gray-600">{date.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })}</p>
      </div>
    </div>
  );
};

export default FileThumbnail;
