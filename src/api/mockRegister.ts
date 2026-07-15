export interface RegisterPayload {
    name: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    token: string;
}

const Usernames = ["admin", "test", "abraham"];
const Emails = ["abra@gmail.com", "admin@bdjoin.com"];

export async function mockRegister(payload: RegisterPayload): Promise<RegisterResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (Usernames.includes(payload.userName.toLowerCase())) {
        throw new Error("This username is already taken");
    }

    if (Emails.includes(payload.email.toLowerCase())) {
        throw new Error("This email is already registered");
    }

    console.log("Mock register con:", payload);

    return {
        token: "mock-token-" + Date.now(),
    };
}