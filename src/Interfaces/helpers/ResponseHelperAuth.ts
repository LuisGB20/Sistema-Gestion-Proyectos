import type { User } from "../User";

export interface ResponseHelperAuth {
  success: boolean;
  message: string;
  user: User
}
