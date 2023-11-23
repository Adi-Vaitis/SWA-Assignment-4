<template>
  <div>
    <div v-if="isFetching">Loading...</div>
    <div class="scores-container" v-else>
      <h1>High Scores</h1>
      <div>
        <h1>Top 10 High Scores</h1>
        <div
          class="high-score-games-item"
          v-for="game in highScoreGames"
          v-bind:key="game.id"
        >
          <div>Game id: {{ game.id }}</div>
          <div>Score: {{ game.score }}</div>
        </div>
      </div>
      <div>
        <h1>Your Top 3 High Scores</h1>
        <div
          class="user-high-score-games-item"
          v-for="game in userHighScoreGames"
          v-bind:key="game.id"
        >
          <div>Game id: {{ game.id }}</div>
          <div>Score: {{ game.score }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GameService } from "@/api/game.service";

export default {
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("token");
    if (!token) {
      next("/login");
    } else {
      next();
    }
  },
  data() {
    return {
      token: JSON.parse(localStorage.getItem("token") || "{}"),
      isFetching: false,
      highScoreGames: [],
      userHighScoreGames: [],
    };
  },
  methods: {
    fetchGames() {
      this.isFetching = true;

      let highScoreGames = [];
      let usersHighScoreGames = [];
      GameService.getGames(this.token)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((returnedGames) => {
          let sortedGames = [
            ...returnedGames.sort((a, b) => {
              return b.score - a.score;
            }),
          ];
          let counterHighScoreGames = 0;
          highScoreGames = [
            ...sortedGames.filter((game) => {
              if (game.completed && counterHighScoreGames < 10) {
                counterHighScoreGames++;
                return game;
              }
            }),
          ];
          counterHighScoreGames = 0;
          usersHighScoreGames = [
            ...sortedGames.filter((game) => {
              if (
                game.completed &&
                game.user === this.token.userId &&
                counterHighScoreGames < 3
              ) {
                counterHighScoreGames++;
                return game;
              }
            }),
          ];
          this.highScoreGames = highScoreGames;
          this.userHighScoreGames = usersHighScoreGames;
          this.isFetching = false;
        })
        .catch((error) => {
          alert("Error: " + error.message);
          this.isFetching = false;
        });
    },
  },
  mounted() {
    this.fetchGames();
  },
};
</script>
<style scoped>
.scores-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
}

.high-score-games-item {
  display: flex;
  justify-content: space-between;
}

.user-high-score-games-item {
  display: flex;
  justify-content: space-between;
}
</style>
