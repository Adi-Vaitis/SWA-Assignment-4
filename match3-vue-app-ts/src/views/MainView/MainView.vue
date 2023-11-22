<script>
import { GameService } from "@/api/game.service";
import { RandomGenerator } from "@/model/randomGenerator";
import * as Board from "@/model/board";

export default {
  // data() corresponds to the Model in MVVM
  setup() {
    const token = JSON.parse(localStorage.getItem("token"));

    return {
      token,
    };
  },
  data() {
    return {
      isFetching: false,
      score: 0,
      currentMoveNumber: 0,
      maxMoveNumber: 20,
      gameId: undefined,
      completed: false,
      board: undefined,
      games: [],
      movedItems: false,
      notFoundMatches: false,
      gameEnded: false,
      gameEndedWithNoMovesLeft: false,
    };
  },
  watch: {},
  // methods correponds to the ViewModel in MVVM
  methods: {
    fetchInitialBoardGame() {
      this.isFetching = true;
      if (this.gameId) {
        this.updateGame();
      }
      this.createNewGame();
    },
    updateGame() {
      this.isFetching = true;
      this.movedItems = true;
      GameService.updateGame(this.token(), this.gameId, {
        id: -1,
        user: -1,
        board: this.board,
        score: this.score,
        completed: this.completed,
        currentMoveNumber: this.currentMoveNumber,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          this.isFetching = false;
          this.movedItems = false;
        })
        .catch((error) => {
          alert("Error: " + error.message);
          this.isFetching = false;
          this.movedItems = false;
        });
    },
    createNewGame() {
      let game = {};
      this.isFetching = false;
      if (this.gameEndedWithNoMovesLeft) {
        this.gameEndedWithNoMovesLeft = false;
      }
      GameService.createGame(this.token())
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((returnedGame) => {
          game = {
            ...returnedGame,
          };
          const newBoard = Board.create(RandomGenerator.getInstance(), 5, 5);
          this.board = {
            ...newBoard,
          };
          this.gameId = game.id;
          this.currentMoveNumber = 0;
          this.score = 0;
          this.isFetching = false;
        })
        .catch((error) => {
          console.error("Error: " + error.message);
          this.isFetching = false;
        });
    },
  },
  beforeMount() {
    // something to mount
  },
};
</script>

<style></style>
