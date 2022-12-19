import React, { ChangeEvent, FC } from "react";
import { FcSearch } from "react-icons/fc";
import Input from "../Input/Input";

interface SearchProps {
  query: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: FC<SearchProps> = ({ query, onChange }) => {
  return (
    <div className="flex items-center gap-2 w-full rounded-md bg-gray-100 border border-gray-200 px-2 py-2">
      <FcSearch className="text-xl" />
      <Input value={query} onChange={onChange} />
    </div>
  );
};

export default Search;
