import Button from "../../components/Button";
import Input from "../../components/Input";
import Label from "../../components/Label";
import useRegister from "./hooks/useRegister";

function Register() {
  const { loading, error, registerForm, setRegisterForm, handleSubmit } =
    useRegister();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col min-h-0">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Register
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm"
      >
        <Label name="Name" />
        <Input
          value={registerForm.name}
          onChange={(e) =>
            setRegisterForm((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="First name"
          required
        />

        <Label name="Last Names" />
        <Input
          value={registerForm.lastName}
          onChange={(e) =>
            setRegisterForm((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
          placeholder="Last Name"
          required
        />

        <Label name="User" />
        <Input
          value={registerForm.userName}
          onChange={(e) =>
            setRegisterForm((prev) => ({ ...prev, userName: e.target.value }))
          }
          placeholder="User Name"
          required
        />

        <Label name="Email" />
        <Input
          value={registerForm.email}
          onChange={(e) =>
            setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
          }
          type="email"
          placeholder="Email@Example.com"
          required
        />

        <hr className="border-gray-200 my-6" />

        <h2 className="text-lg font-semibold text-gray-800 mb-3">Password</h2>

        <Label name="Create Password" />
        <Input
          value={registerForm.password}
          onChange={(e) =>
            setRegisterForm((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Ex: 123"
          type="password"
          required
        />

        <Label name="Repeat Password" />
        <Input
          value={registerForm.repeatPassword}
          onChange={(e) =>
            setRegisterForm((prev) => ({
              ...prev,
              repeatPassword: e.target.value,
            }))
          }
          placeholder="Ex: 123"
          type="password"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end pt-4 border-t border-gray-200 ">
          <Button
            type="submit"
            disabled={loading}
            name={loading ? "Creating an account..." : "Create Account"}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 w-full md:w-auto shadow-sm cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default Register;
