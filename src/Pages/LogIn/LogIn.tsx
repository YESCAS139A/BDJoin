import useLogIn from "./hooks/useLogIn";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function LogIn() {
  const { loading, error, loginForm, handleSubmit, setLoginForm } = useLogIn();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col min-h-0">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Log In</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-h-[calc(100vh-140px)] overflow-y-auto space-y-4 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm pr-2 md:pr-4"
      >
        <Label name="User mame or Email" />
        <Input
          placeholder="email@gmail.com"
          type="text"
          value={loginForm.emailOrUsername}
          onChange={(e) =>
            setLoginForm((prev) => ({
              ...prev,
              emailOrUsername: e.target.value,
            }))
          }
          disallowSpaces
          required
        />

        <Label name="Password" />
        <Input
          placeholder="User123"
          type="password"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm((prev) => ({ ...prev, password: e.target.value }))
          }
          disallowSpaces
          required
        />

        <p className="mt-8 flex flex-col sm:flex-row gap-1 sm:gap-2 text-sm sm:text-base">
          <span className="font-medium font-sans">
            Sign up for an account if you don't have one
          </span>
          <Link to="/Register" className="text-blue-500 font-sans">
            Register
          </Link>
        </p>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

        <div className="flex justify-end pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <Button
            type="submit"
            disabled={loading}
            name={loading ? "Logging in..." : "log in"}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 w-full md:w-auto shadow-sm cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default LogIn;
