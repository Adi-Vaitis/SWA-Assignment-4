import { Token } from "@/model/token";
import { IGameService } from "@/api/GameService/IGameService";

export default class GameService implements IGameService {
  public static API_URL: string;

  constructor() {
    GameService.API_URL = "http://localhost:9090";
  }

  async getGame(token: Token, gameId: number): Promise<Response> {
    const apiUrl = new URL(`${GameService.API_URL}/games/${gameId}`);
    if (token) {
      apiUrl.searchParams.append("token", token.token.token);
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    } as RequestInit;

    return fetch(apiUrl.toString(), requestOptions);
  }

  async getGames(): Promise<Response> {
    const apiUrl = new URL(`${GameService.API_URL}/games`);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    } as RequestInit;

    return fetch(apiUrl.toString(), requestOptions);
  }

  async createGame(): Promise<Response> {
    const apiUrl = new URL(`${GameService.API_URL}/games`);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    } as RequestInit;

    return fetch(apiUrl.toString(), requestOptions);
  }

  // async updateGame(
  //   token: Token,
  //   gameId: number | undefined,
  //   gameUpdates: Game
  // ) {
  //   if (!gameId) throw new Error("gameId is undefined");
  //
  //   const apiUrl = new URL(`${GameService.API_URL}/games/${gameId}`);
  //   if (token) {
  //     apiUrl.searchParams.append("token", token.token.token);
  //   }
  //
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //
  //   const raw = JSON.stringify(gameUpdates);
  //
  //   const requestOptions = {
  //     method: "PATCH",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   } as RequestInit;
  //
  //   return fetch(apiUrl.toString(), requestOptions);
  // }
}
