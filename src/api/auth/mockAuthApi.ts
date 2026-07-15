import { token } from "../../lib/token";
import type {
  RegisterPayload,
  RegisterResponse,
  AuthApi as IAuthApi,
  LoginPayload,
  LoginResponse,
} from "./types";

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
    console.log("Mock register con:", data);
    token.set("mock_token");

    return {
      username: "mock_" + Date.now(),
      email: data.email,
      token: "",
    };
  }
}

export default new AuthApi();
