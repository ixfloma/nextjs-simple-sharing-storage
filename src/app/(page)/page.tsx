import { handleGetListFile } from "./server/action";
import FileThumbnail from "./components/FileThumbnail";
import { redirect } from "next/navigation";
import Sorter from "./components/Sorter";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{
    sortby?: string;
  }>;
}) {
  const params = await searchParams;
  if (!params?.sortby) redirect("/?sortby=date");
  const listFile = handleGetListFile();
  return (
    <div className="container mx-auto p-4">
      <Sorter />
      <h1 className="text-2xl font-bold mb-4">File List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listFile.map((file, index) => (
          <FileThumbnail key={index} file={file} />
        ))}
      </div>
    </div>
  );
}
