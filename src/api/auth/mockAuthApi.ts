import { token } from "../../lib/token";
import type {
  AuthApi as IAuthApi,
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  ChangePasswordPayload,
  CurrentUser,
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

    const identifier =
      "username" in data && data.username ? data.username : data.email;

    const validIdentifier =
      identifier === MOCK_USER.email || identifier === MOCK_USER.userName;
    const validPassword = data.password === MOCK_USER.password;

    if (!validIdentifier || !validPassword) {
      throw new Error("Invalid username/email or password");
    }

    const mockToken = "mock_token_" + Date.now();
    token.set(mockToken);

    return {
      username: MOCK_USER.userName,
      token: mockToken,
      email: MOCK_USER.email,
    };
  }

  async getMe(): Promise<CurrentUser> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Mock getMe");

    if (!token.isAuthenticated()) {
      throw new Error("Not authenticated");
    }

    return {
      userName: MOCK_USER.userName,
      email: MOCK_USER.email,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIYyD47-CjBVKGcoo-cEZB36Xr-Wd6JMzBWfE7_QotYQ&s=10",
    };
  }

  async changePassword(data: ChangePasswordPayload): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Mock changePassword con:", data);
  }

  async deleteAccount(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Mock deleteAccount ejecutado");
  }
}

export default new AuthApi();
