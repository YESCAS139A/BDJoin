import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import authApi from "../../../api/auth";

type RegisterForm = {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const REGISTER_FORM: RegisterForm = {
  name: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME = /^[a-zA-Z0-9_]{3,10}$/;

const validateRegister = (form: RegisterForm): string | null => {
  const { name, lastName, userName, email, password, repeatPassword } = form;

  if (
    !name.trim() ||
    !lastName.trim() ||
    !userName.trim() ||
    !email.trim() ||
    !password ||
    !repeatPassword
  ) {
    return "Please fill in all required fields";
  }
  if (!USERNAME.test(userName)) {
    return "Username must be 3-10 characters and only contain letters, numbers, or underscores";
  }
  if (!EMAIL.test(email)) {
    return "Please enter a valid email address";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must contain at least one letter and one number";
  }
  if (password !== repeatPassword) {
    return "The passwords don't match";
  }
  return null;
};

function useRegister() {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState<RegisterForm>(REGISTER_FORM);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationError = validateRegister(registerForm);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await authApi.register({
        name: registerForm.name,
        lastName: registerForm.lastName,
        email: registerForm.email,
        userName: registerForm.userName,
        password: registerForm.password,
        confirmPassword: registerForm.repeatPassword,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    // try {
    //   const { token } = await mockRegister({
    //     name,
    //     lastName,
    //     userName,
    //     email,
    //     password,
    //   });
    //   localStorage.setItem("token", token);
    //   resetForm();
    //   navigate("/login");
    // } catch (err) {
    //   console.error("Registration error:", err);
    //   const message =
    //     err instanceof Error
    //       ? err.message
    //       : "There were problems when you signed up";
    //   setError(message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return {
    loading,
    error,
    registerForm,
    handleSubmit,
    handleCancel,
    setRegisterForm,
  };
}

export default useRegister;
