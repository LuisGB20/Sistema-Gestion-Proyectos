import type { User } from "./User";

export interface LoginResponse {
  user: User;
  token: Token;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}
