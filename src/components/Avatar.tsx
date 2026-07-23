import { CiUser } from "react-icons/ci";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  src?: string;
  size?: AvatarSize;
  className?: string;
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

function Avatar({ src, size = "md", className = "" }: AvatarProps) {
  const dimensionClass = sizeClasses[size];

  if (!src) {
    return (
      <div
        className={`${dimensionClass} flex items-center justify-center bg-gray-200 rounded-full shrink-0 ${className}`}
      >
        <CiUser className="w-1/2 h-1/2 text-gray-500" />
      </div>
    );
  }

  return (
    <img
      src={src}
      className={`${dimensionClass} rounded-full object-cover bg-gray-100 shrink-0 ${className}`}
    />
  );
}

export default Avatar;
