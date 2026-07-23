import type { ChangeEvent } from "react";

import { handleInputSpaces } from "../lib/spaceremover";

export interface InputProps {
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disallowSpaces?: boolean;
  className?: string;
}

const Input = ({
  placeholder,
  type = "text",
  value,
  onChange,
  required,
  disallowSpaces = false,
  className = "",
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleInputSpaces(e, disallowSpaces, onChange)}
      required={required}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black ${className}`}
    />
  );
};

export default Input;
