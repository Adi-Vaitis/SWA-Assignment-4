import { IRegisterViewModel } from "@/viewmodel/IRegisterViewModel";
import { User } from "@/model/user";

export default class RegisterViewModel implements IRegisterViewModel {
  public RegisterUser(user: User): void {
    console.log("Registering user: " + user.username);
  }
}
