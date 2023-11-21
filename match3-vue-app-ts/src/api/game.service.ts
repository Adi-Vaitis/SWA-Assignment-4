import { Token } from "@/model/token";
import { Game } from "@/model/game";

export class GameService {
  static async getGame(token: Token, gameId: number) {
    const apiUrl = new URL(`http://localhost:9090/games/${gameId}`);
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

  static async getGames(token: Token) {
    const apiUrl = new URL(`http://localhost:9090/games`);
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

  static async createGame(token: Token) {
    const apiUrl = new URL(`http://localhost:9090/games`);
    if (token) {
      apiUrl.searchParams.append("token", token.token.token);
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    } as RequestInit;

    return fetch(apiUrl.toString(), requestOptions);
  }

  static async updateGame(
    token: Token,
    gameId: number | undefined,
    gameUpdates: Game
  ) {
    if (!gameId) throw new Error("gameId is undefined");

    const apiUrl = new URL(`http://localhost:9090/games/${gameId}`);
    if (token) {
      apiUrl.searchParams.append("token", token.token.token);
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(gameUpdates);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    } as RequestInit;

    return fetch(apiUrl.toString(), requestOptions);
  }
}
