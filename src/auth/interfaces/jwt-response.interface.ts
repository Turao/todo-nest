import { User } from "../../users/user.entity";

export interface JwtResponse {
  user: User;
  token: string;
}