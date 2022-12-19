import React, { ChangeEvent, FC, forwardRef } from "react";
import { FcSearch } from "react-icons/fc";

interface InputProps {
  value: string | number | readonly string[] | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  withIcon?: boolean;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string | number | null;
}

const Input: FC<InputProps> = forwardRef(
  ({
    value,
    onChange,
    withIcon = false,
    placeholder = "",
    isInvalid = false,
    errorMessage = "",
  }) => {
    return (
      <div
        className={`relative flex flex-row items-center gap-2 w-full rounded-md bg-gray-100 border ${
          isInvalid ? "border-red-300" : "border-gray-200"
        } px-2 py-2`}
      >
        {withIcon ? <FcSearch className="text-xl" /> : null}
        <input
          value={value}
          onChange={onChange}
          className="text-sm py-[2px] bg-transparent text-gray-600 w-full placeholder:text-sm outline-none"
          placeholder={placeholder}
        />
        {isInvalid ? (
          <span className="absolute -bottom-4 left-0 text-red-400 font-medium text-xs">
            {errorMessage}
          </span>
        ) : null}
      </div>
    );
  }
);

export default Input;
