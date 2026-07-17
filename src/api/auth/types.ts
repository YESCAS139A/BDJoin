export interface AuthApi {
  register(data: RegisterPayload): Promise<RegisterResponse>;
  login(data: LoginPayload): Promise<LoginResponse>;
  getMe(): Promise<CurrentUser>;
}

export type LoginPayload = {
  emailOrUser: string;
  password: string;
};

export type LoginResponse = {
  username: string;
  token: string;
  email: string;
};

export type CurrentUser = {
  userName: string;
  email: string;
  displayName: string;
  avatar?: string;
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
