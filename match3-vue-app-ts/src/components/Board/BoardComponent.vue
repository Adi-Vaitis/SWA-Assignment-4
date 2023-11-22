<template>
  <div>
    <div class="container-game-info">
      <h3>Current score: {nowScore - not added yet}</h3>
      <h3>Current game ID: {{ this.game.gameId }}</h3>
      <h3>Left moves: {leftMoves - not added yet}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
    updateMoveOnBoard: {
      type: Function,
      required: true,
    },
    updateGame: {
      type: Function,
      required: true,
    },
    resetNotMatchesFound: {
      type: Function,
      required: true,
    },
    endGameWithNoMovesLeft: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    //
  },
};
</script>

<style scoped></style>
