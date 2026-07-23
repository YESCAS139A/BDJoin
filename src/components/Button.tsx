import { useNavigate } from "react-router-dom";

export interface ButtonProps {
  name: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  fullWidthOnMobile?: boolean;
  nav?: string;
}

const Button = ({
  name,
  type,
  disabled,
  className,
  onClick,
  fullWidthOnMobile = true,
  nav,
}: ButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (nav) {
      navigate(nav);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${fullWidthOnMobile ? "w-full sm:w-auto" : ""}px-4 sm:px-6 py-2 sm:py-2.5
        text-sm sm:text-base
        rounded-lg font-medium
        transition-all duration-200
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        bg-blue-500 hover:bg-blue-600 text-white ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;
