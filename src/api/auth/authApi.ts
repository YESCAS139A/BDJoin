import type {
  AuthApi as IAuthApi,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "./types";
import { api } from "../httpClient";

class AuthApi implements IAuthApi {
  private route = "/auth";

  async login(data: LoginPayload): Promise<LoginResponse> {
    const endpoint = this.route + "/login";
    const response = await api.post<LoginResponse>(endpoint, { data });

    return response.data;
  }

  async register(data: RegisterPayload): Promise<RegisterResponse> {
    const response = await fetch(this.route + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register");
    }

    const responseData: RegisterResponse = await response.json();
    return responseData;
  }
}

export default new AuthApi();
