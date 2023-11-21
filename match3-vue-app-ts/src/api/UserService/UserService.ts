import { User } from "@/model/user";
import { Token } from "@/model/token";

export default class UserService {
  static PATH: string;

  private constructor() {
    UserService.PATH = "http://localhost:9090";
  }

  async login(user: User) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(user);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };

    return fetch("http://localhost:9090/login", requestOptions);
  }

  async register(user: User): Promise<Response> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(user);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    } as RequestInit;

    return fetch(`${UserService.PATH}/users`, requestOptions);
  }

  async getUser(token: Token): Promise<Response> {
    const apiUrl = new URL(`${UserService.PATH}/users/${token.userId}`);
    if (token) {
      apiUrl.searchParams.append("token", token.token.token);
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    } as RequestInit;

    return fetch(apiUrl.toString(), requestOptions);
  }

  async updateUserProfile(
    token: Token,
    profileUpdates: { password?: string }
  ): Promise<Response> {
    const apiUrl = new URL(`${UserService.PATH}/users/${token.userId}`);

    if (token) {
      apiUrl.searchParams.append("token", token.token.token);
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestBody = JSON.stringify({
      password: profileUpdates.password,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: requestBody,
      redirect: "follow" as RequestRedirect,
    } as RequestInit;

    return fetch(apiUrl.toString(), requestOptions);
  }
}
