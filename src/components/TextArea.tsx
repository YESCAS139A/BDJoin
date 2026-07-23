import type { ChangeEvent } from "react";

export interface TextAreaProps {
  name?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  rows?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({
  name,
  placeholder,
  value,
  className = "",
  rows = 4,
  onChange,
}: TextAreaProps) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      rows={rows}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black resize-none ${className}`}
    />
  );
};

export default TextArea;
