import { User } from "@/model/user";
import { Token } from "@/model/token";

export interface IUserService {
  register(user: User): Promise<Response>;

  getUser(token: Token): Promise<Response>;

  updateUserProfile(
    token: Token,
    profileUpdates: { password?: string }
  ): Promise<Response>;
}
