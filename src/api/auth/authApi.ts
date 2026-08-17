import type {
  AuthApi as IAuthApi,
  ChangePasswordPayload,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "./types";
import { api } from "../httpClient";
import { token } from "../../lib/token";

class AuthApi implements IAuthApi {
  private route = "/Api/Auth";

  async login(data: LoginPayload): Promise<LoginResponse> {
    const endpoint = this.route + "/Login";
    const response = await api.post<LoginResponse>(endpoint, data);

    if (response.data?.token) {
      token.set(response.data.token);
    }

    return response.data;
  }

  async register(data: RegisterPayload): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      this.route + "/Register",
      data,
    );
    return response.data;
  }

  async changePassword(data: ChangePasswordPayload): Promise<void> {
    const endpoint = this.route + "/Change-password";
    await api.post(endpoint, data);
  }

  async deleteAccount(): Promise<void> {
    const endpoint = `${this.route}/Delete`;
    await api.delete(endpoint);
  }
}

export default new AuthApi();
