"use client";

import { FilmIcon, Loader2Icon } from "lucide-react";
import { FileDownload } from "../definition";
import { useTransition } from "react";

const FileThumbnail: React.FC<{ file: FileDownload }> = ({
  file: { filename, date },
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDownload = (fileUrl: string) => {
    startTransition(async () => {
      await fetch("/api/file?filelocation=" + encodeURIComponent(fileUrl))
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const blob = await response.blob();

          const contentDisposition = response.headers.get(
            "content-disposition"
          );
          const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
          const filename = filenameMatch ? filenameMatch[1] : "downloaded_file";
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);
        })
        .catch((error) => console.error("Error downloading file: ", error));
    });
  };

  return (
    <button
      onClick={() => handleDownload(filename)}
      disabled={isPending}
      className="flex gap-4 justify-between cursor-pointer text-center p-4 rounded-lg bg-slate-50 hover:bg-slate-200 active:bg-slate-200 disabled:opacity-50 transition-colors"
    >
      <div className="w-24 h-24 bg-gray-300 rounded-lg shrink-0 flex items-center justify-center">
        {isPending ? (
          <Loader2Icon className="w-8 h-8 text-white animate-spin ease-in-out" />
        ) : (
          <FilmIcon className="w-8 h-8 text-white" />
        )}
      </div>
      <div className="flex flex-col w-full items-start justify-between text-left text-slate-800">
        <p>{filename}</p>
        <p className="text-gray-600">
          {date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
      </div>
    </button>
  );
};

export default FileThumbnail;
