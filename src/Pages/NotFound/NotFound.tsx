import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3 py-16 md:py-20 px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600 max-w-sm">
        The page you're looking for does not exist.
      </p>
      <Link to={"/home"} className="text-blue-600 hover:underline font-medium">
        Back to the top
      </Link>
    </div>
  );
};

export default NotFound;
