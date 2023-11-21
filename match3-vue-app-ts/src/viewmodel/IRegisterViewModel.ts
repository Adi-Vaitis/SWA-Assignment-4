import { User } from "@/model/user";

export interface IRegisterViewModel {
  RegisterUser(user: User): void;
}
