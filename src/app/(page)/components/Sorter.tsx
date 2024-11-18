"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routerShallowReplace } from "@src/lib/helper";
import { useDebouncedCallback } from "use-debounce";

const Sorter: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChangeQuery = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    console.log(params);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="sticky top-0 left-0 w-full shadow bg-white p-4 flex items-center gap-4">
      <p className="font-bold text-lg shrink-0">File List</p>
      <input
        defaultValue={searchParams.get("query") || ""}
        onChange={(e) => handleChangeQuery(e.target.value)}
        className="w-full bg-slate-50 focus:border-0 focus:outline-none py-2 px-4"
        placeholder="Cari nama file..."
      />
    </div>
  );
};

export default Sorter;
