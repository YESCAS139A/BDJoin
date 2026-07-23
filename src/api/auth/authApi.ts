import type {
  AuthApi as IAuthApi,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  CurrentUser,
} from "./types";
import { api } from "../httpClient";

class AuthApi implements IAuthApi {
  private route = "/auth";

  async login(data: LoginPayload): Promise<LoginResponse> {
    const endpoint = this.route + "/login";
    const response = await api.post<LoginResponse>(endpoint, data);
    return response.data;
  }

  async register(data: RegisterPayload): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      this.route + "/register",
      data,
    );
    return response.data;
  }

  async getMe(): Promise<CurrentUser> {
    const response = await api.get<CurrentUser>(this.route + "/me");
    return response.data;
  }
}

export default new AuthApi();
