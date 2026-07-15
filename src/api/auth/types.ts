export interface AuthApi {
  register(data: RegisterPayload): Promise<RegisterResponse>;
  login(data: LoginPayload): Promise<LoginResponse>;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  username: string;
  token: string;
  email: string;
};

// Input de /auth/register
export type RegisterPayload = {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Output de /auth/register
export type RegisterResponse = {
  message: string;
};

// Input {magia} Output
