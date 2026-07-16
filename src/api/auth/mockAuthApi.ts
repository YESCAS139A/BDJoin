import { token } from "../../lib/token";
import type {
  RegisterPayload,
  RegisterResponse,
  AuthApi as IAuthApi,
  LoginPayload,
  LoginResponse,
} from "./types";

const MOCK_USER = {
  userName: "testuser",
  email: "test@example.com",
  password: "test1234",
};

class AuthApi implements IAuthApi {
  async register(data: RegisterPayload): Promise<RegisterResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Mock register con:", data);

    return {
      message: "User registered successfully",
    };
  }

  async login(data: LoginPayload): Promise<LoginResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Mock login con:", data);

    const validEmailOrUser =
      data.emailOrUser === MOCK_USER.email ||
      data.emailOrUser === MOCK_USER.userName;

    const ValidPassword = data.password === MOCK_USER.password;

    if (!validEmailOrUser || !ValidPassword) {
      throw new Error("Invalid email/user or password");
    }

    const mockToken = "mock_token_" + Date.now();
    token.set(mockToken);

    return {
      username: MOCK_USER.userName,
      email: MOCK_USER.email,
      token: mockToken,
    };
  }
}

export default new AuthApi();
