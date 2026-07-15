import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { mockRegister } from "../../../api/mockRegister";

export interface InfoRegisterProps {
    name: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME = /^[a-zA-Z0-9_]{3,10}$/;

const useRegister = () => {

    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
    };

    const resetForm = () => {
        setName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
    };

    const validate = (): string | null => {
        if (!name.trim() || !lastName.trim() || !userName.trim() || !email.trim() || !password || !repeatPassword) {
            return "Please fill in all required fields";
        }
        if (!USERNAME.test(userName)) {
            return "Username must be 3-10    characters and only contain letters, numbers, or underscores";
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


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        // const infoRegister: InfoRegisterProps = {
        //     name,
        //     lastName,
        //     userName,
        //     email,
        //     password,
        //     repeatPassword,
        // };

        setLoading(true);
        try {
            const { token } = await mockRegister({ name, lastName, userName, email, password });
            localStorage.setItem("token", token);
            resetForm();
            navigate("/login");
        } catch (err) {
            console.error("Registration error:", err);
            const message = err instanceof Error ? err.message : "There were problems when you signed up";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        name,
        lastName,
        userName,
        email,
        password,
        repeatPassword,
        loading,
        error,
        handleNameChange,
        handleLastNameChange,
        handleUserNameChange,
        handleEmailChange,
        handlePasswordChange,
        handleRepeatPasswordChange,
        resetForm,
        handleSubmit,
    };
};

export default useRegister;