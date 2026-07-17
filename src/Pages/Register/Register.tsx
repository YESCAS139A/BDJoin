import Button from "../../components/Button";
import Input from "../../components/Input";
import Label from "../../components/Label";
import useRegister from "./hooks/useRegister";

function Register() {
  const {
    loading,
    error,
    registerForm,
    setRegisterForm,
    handleSubmit,
    handleCancel,
  } = useRegister();

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label name="Name" />
            <Input
              value={registerForm.name}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="First name"
              required
            />
          </div>
          <div>
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label name="UserName" />
            <Input
              value={registerForm.userName}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }))
              }
              placeholder="UserName"
              required
            />
          </div>

          <div>
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
          </div>
        </div>

        <hr className="border-gray-200 my-6" />

        <h2 className="text-lg font-semibold text-gray-800 mb-3">Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label name="Password" />
            <Input
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="Example1234qa"
              type="password"
              required
            />
          </div>

          <div>
            <Label name="Confirm Password" />
            <Input
              value={registerForm.repeatPassword}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  repeatPassword: e.target.value,
                }))
              }
              placeholder="Example1234qa"
              type="password"
              required
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex flex-col sm:flex-row justify-end pt-4 border-t border-gray-200 gap-3">
          <Button
            type="button"
            onClick={handleCancel}
            name="Cancel"
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 cursor-pointer w-full sm:w-auto"
          />
          <Button
            type="submit"
            disabled={loading}
            name={loading ? "Recording..." : "Register"}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 w-full sm:w-auto shadow-sm cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default Register;
