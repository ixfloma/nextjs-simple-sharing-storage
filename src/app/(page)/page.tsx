import { handleGetListFile } from "./server/action";
import FileThumbnail from "./components/FileThumbnail";
import { redirect } from "next/navigation";
import Sorter from "./components/Sorter";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{
    sortby?: string;
    query?: string;
  }>;
}) {
  const params = await searchParams;
  if (!params?.sortby) redirect("/?sortby=date");
  const query = params?.query || "";
  const listFile = handleGetListFile();
  return (
    <>
      <Sorter />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listFile
            .filter((el) =>
              query ? el.filename.toLowerCase().includes(query) : true
            )
            .map((file, index) => (
              <FileThumbnail key={index} file={file} />
            ))}
        </div>
      </div>
    </>
  );
}
