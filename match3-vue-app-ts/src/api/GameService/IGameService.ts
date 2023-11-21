import { Token } from "@/model/token";

export interface IGameService {
  getGame(token: Token, gameId: number): Promise<Response>;

  getGames(token: Token): Promise<Response>;

  createGame(): Promise<Response>;

  // updateGame(
  //   token: Token,
  //   gameId: number | undefined,
  //   gameUpdates: Game
  // ): Promise<Response>;
}
