<template>
  <div class="main-view-container">
    <h1 v-if="gameEndedWithNoMovesLeft">
      Your game has ended because there were no moves left.
    </h1>
    <BoardComponent
      v-if="gameId"
      v-bind:game="{
        isFetching: this.isFetching,
        gameId: this.gameId,
        board: this.board,
        score: this.score,
        maxMoveNumber: this.maxMoveNumber,
        currentMoveNumber: this.currentMoveNumber,
        completed: this.completed,
        games: this.games,
        movedItems: this.movedItems,
        notFoundMatches: this.notFoundMatches,
        gameEnded: this.gameEnded,
        gameEndedWithNoMovesLeft: this.gameEndedWithNoMovesLeft,
      }"
      v-bind:reset-not-matches-found="resetNotMatchesFound"
      v-bind:end-game-with-no-moves-left="endGameWithNoMovesLeft"
      v-bind:update-move-on-board="updateMoveOnBoard"
      v-bind:update-game="updateGame"
    ></BoardComponent>
    <div>
      <button v-if="!gameId" @click="fetchInitialBoardGame">
        Start new game
      </button>
      <button v-if="gameId && !gameEnded" @click="endGame">
        End current game
      </button>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>
<script>
import { GameService } from "@/api/game.service";
import { RandomGenerator } from "@/model/randomGenerator";
import * as Board from "@/model/board";
import BoardComponent from "@/components/Board/BoardComponent.vue";
import { ref, watch } from "vue";

export default {
  components: { BoardComponent },
  // data() corresponds to the Model in MVVM
  data() {
    return {
      token: JSON.parse(localStorage.getItem("token") || "{}"),
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
      GameService.updateGame(this.token, this.gameId, {
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
      GameService.createGame(this.token)
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
    updateMoveOnBoard(selectedPosition, newPosition) {
      this.isFetching = true;

      try {
        let resultAfterMove = Board.move(
          RandomGenerator.getInstance(),
          this.board,
          {
            row: selectedPosition.row,
            col: selectedPosition.col,
          },
          {
            row: newPosition.row,
            col: newPosition.col,
          }
        );

        let effectsAfterMove = [];
        if (resultAfterMove) {
          effectsAfterMove = [...resultAfterMove.effects];
        }
        this.currentMoveNumber = this.currentMoveNumber + 1;
        if (effectsAfterMove.length > 0) {
          let onlyMatchEffects = effectsAfterMove.filter(
            (effect) => effect.kind === "Match"
          );
          let newScore = onlyMatchEffects.length * 10 + this.score;

          this.board = resultAfterMove.board;
          this.score = newScore;
          this.completed = false;
        } else {
          this.notFoundMatches = true;
        }
        this.isFetching = true;
      } catch (error) {
        alert("Error: " + error.message);
        this.isFetching = true;
      }
    },
    endGame() {
      this.completed = true;
      this.isFetching = true;
      this.gameEnded = true;
      GameService.updateGame(this.token, this.gameId, {
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
          this.gameEnded = false;
        })
        .catch((error) => {
          alert("Error: " + error.message);
          this.isFetching = false;
          this.gameEnded = false;
        });
      this.createNewGame();
    },
    endGameWithNoMovesLeft() {
      this.gameEndedWithNoMovesLeft = true;
      this.completed = true;

      setTimeout(() => {
        // nothing to do here;
      }, 2000);
      GameService.updateGame(this.token, this.gameId, {
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
          this.score = 0;
          this.currentMoveNumber = 0;
          this.maxMoveNumber = 20;
          this.gameId = undefined;
          this.completed = false;
          this.board = undefined;
          this.games = [];
          this.movedItems = false;
          this.notFoundMatches = false;
          this.gameEnded = false;
        })
        .catch((error) => {
          alert("Error: " + error.message);
          this.gameEnded = false;
        });
    },
    resetNotMatchesFound() {
      this.notFoundMatches = false;
    },
    clickWatchToken() {
      console.log(this.token);
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    beforeRouteEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (!token) {
        next("/login");
      } else {
        next();
      }
    },
  },
  beforeMount() {
    // something to mount
  },
};
</script>

<style scoped>
.main-view-container {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
