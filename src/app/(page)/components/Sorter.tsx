"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Sorter: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortby", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="fixed top-2.5 right-2.5">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => handleSort("date")}
      >
        Sort by Date
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleSort("alphabet")}
      >
        Sort by Alphabet
      </button>
    </div>
  );
};

export default Sorter;
