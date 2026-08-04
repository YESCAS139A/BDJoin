export interface AuthApi {
  register(data: RegisterPayload): Promise<RegisterResponse>;
  login(data: LoginPayload): Promise<LoginResponse>;
}

export type LoginPayload =
  | { username: string; email?: never; password: string }
  | { email: string; username?: never; password: string };

export type LoginResponse = {
  username: string;
  token: string;
  email: string;
};

export type CurrentUser = {
  userName: string;
  email: string;
  avatar?: string;
};

// Input de /auth/register
export type RegisterPayload = {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

// Output de /auth/register
export type RegisterResponse = {
  message: string;
};

// Input {magia} Output
