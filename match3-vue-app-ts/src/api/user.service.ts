import { User } from "@/model/user";
import { Token } from "@/model/token";

export class UserService {
  static async login(user: User) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(user);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    } as RequestInit;

    return fetch(`http://localhost:9090/login`, requestOptions);
  }

  static async register(user: User) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(user);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    } as RequestInit;

    return fetch(`http://localhost:9090/users`, requestOptions);
  }

  static async getUser(token: Token) {
    const apiUrl = new URL(`http://localhost:9090/users/${token.userId}`);
    if (token) {
      apiUrl.searchParams.append("token", token.token);
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

  static async updateUserProfile(token: Token, profileUpdates: User) {
    const apiUrl = new URL(`http://localhost:9090/users/${token.userId}`);

    if (token) {
      apiUrl.searchParams.append("token", token.token);
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestBody = JSON.stringify(profileUpdates);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: requestBody,
      redirect: "follow" as RequestRedirect,
    } as RequestInit;

    return fetch(apiUrl.toString(), requestOptions);
  }
}
