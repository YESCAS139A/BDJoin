import type {
  AuthApi as IAuthApi,
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
}

export default new AuthApi();
