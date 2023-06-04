import { useRouter } from "next/router";
import React, { MouseEventHandler, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { UserBody } from "../../typings";
import { Button, PressEvent } from "@nextui-org/react";

const Searchbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    router.push(`/focus/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-gray-400  z-20 focus-within:text-gray-600 "
    >
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex flex-row justify-end items-center"></div>
    </form>
  );
};

export default Searchbar;
