import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Landing = () => {
  return (
    <div>
      <h1>Bienvenido</h1>
      <div>
        <Link to="/register">
          <Button name="Register" className="bg-black text-pink-500" />
        </Link>
        <Link to="/login">
          <Button name="Log In" />
        </Link>
      </div>
    </div>
  );
};

export default Landing;
