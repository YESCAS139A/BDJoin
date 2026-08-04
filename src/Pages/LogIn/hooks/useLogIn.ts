import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import authApi from "../../../api/auth";

type LoginForm = {
  emailOrUsername: string;
  password: string;
};

const LOGIN_FORM: LoginForm = {
  emailOrUsername: "",
  password: "",
};

function useLogIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loginForm, setLoginForm] = useState<LoginForm>(LOGIN_FORM);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const input = loginForm.emailOrUsername.trim();
    const isEmail = input.includes("@");

    try {
      // Discrimina si es correo o usuario según la presencia de "@"
      await authApi.login({
        ...(isEmail ? { email: input } : { username: input }),
        password: loginForm.password,
      });

      const redirectPath = searchParams.get("redirectTo") || "/home";
      navigate(redirectPath);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginForm, setLoginForm, handleSubmit };
}

export default useLogIn;
