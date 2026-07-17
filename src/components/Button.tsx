export interface ButtonProps {
  name: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({ name, type, disabled, className, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 w-full md:w-auto shadow-sm cursor-pointer ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;
