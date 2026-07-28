import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Landing = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
        <div className="max-w-3xl">
          <h1 className="font-serif text-gray-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Welcome to your new favorite mini social network
          </h1>
          <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
            On this social network, you can add all your friends, post about
            whatever topics you like, and view both your friends' posts and your
            own.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Link to="/login">
            <Button name="Log In" />
          </Link>
          <Link to="/register">
            <Button name="Register" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
