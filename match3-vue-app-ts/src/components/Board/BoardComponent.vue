<template>
  <div>
    <div class="container-game-info">
      <h3>Current score: {{ nowScore }}</h3>
      <h3>Current game ID: {{ this.game.gameId }}</h3>
      <h3>Left moves: {{ leftMoves }}</h3>
    </div>
    <div class="board-items-container">
      <div
        class="row-items-container"
        v-for="(row, rowIndex) in this.game.board.board"
        :key="rowIndex"
      >
        <div v-for="(col, colIndex) in row" :key="colIndex">
          <BoardItem
            :image="col"
            :isSelected="
              selectedPositionToMove.row === rowIndex &&
              selectedPositionToMove.col === colIndex
            "
            @click="handleBoardItemClick(rowIndex, colIndex)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { ref, watch } from "vue";
import BoardItem from "@/components/BoardItem/BoardItem.vue";

export default {
  components: {
    BoardItem,
  },
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
    const openNotification = (type, description) => {
      const toast = useToast();
      switch (type) {
        case "success":
          toast.success(description);
          break;
        case "error":
          toast.error(description);
          break;
        case "info":
          toast.info(description);
          break;
        case "warning":
          toast.warning(description);
          break;
        default:
          toast(description);
          break;
      }
    };

    const positionIsNotEqualWithDefaultValues = (position) => {
      return position.row !== -1 && position.col !== -1;
    };

    watch(
      () => props.game.gameEnded,
      (newValue, oldValue) => {
        if (newValue) {
          openNotification(
            "success",
            `Game ended! Your score: ${props.game.score}. A new game will start.`
          );
        }
      }
    );
    watch(
      () => props.game.movedItems,
      (newValue, oldValue) => {
        if (newValue) {
          openNotification(
            "success",
            `Found match! Items moved! Current score: ${props.game.score}`
          );
        }
      }
    ),
      watch(
        () => props.game.notFoundMatches,
        (newValue, oldValue) => {
          if (newValue) {
            openNotification("error", "No matches found! Try again!");
            props.resetNotMatchesFound();
          }
        }
      );

    let leftMoves = ref(
      props.game.maxMoveNumber - props.game.currentMoveNumber
    );
    let previousMoveNumber = ref(props.game.currentMoveNumber);
    let currentMoveNumber = ref(props.game.currentMoveNumber);
    watch(
      () => props.game.currentMoveNumber,
      (newValue, oldValue) => {
        let currentLeftMoves =
          props.game.maxMoveNumber - props.game.currentMoveNumber;
        leftMoves.value = currentLeftMoves;
        previousMoveNumber.value = oldValue;
        currentMoveNumber.value = newValue;

        if (currentLeftMoves === 0) {
          props.endGameWithNoMovesLeft();
          openNotification("error", "No moves left! Game ended!");
        } else if (currentMoveNumber.value !== previousMoveNumber.value) {
          openNotification("warning", "Left moves: " + currentLeftMoves);
        }
      }
    );

    let beforeScore = ref(props.game.score);
    let gameObj = ref(props.game);
    let nowScore = ref(props.game.score);
    watch(
      () => props.game.score,
      (newValue, oldValue) => {
        gameObj = props.game;
        nowScore.value = newValue;
        props.updateGame();
      }
    );

    let selectedPositionToMove = ref({
      row: -1,
      col: -1,
    });
    let selectedPositionToMoveTo = ref({
      row: -1,
      col: -1,
    });
    let positionToMoveAlreadySelected = ref(false);
    return {
      openNotification,
      positionIsNotEqualWithDefaultValues,
      leftMoves,
      previousMoveNumber,
      currentMoveNumber,
      beforeScore,
      gameObj,
      nowScore,
      selectedPositionToMove,
      selectedPositionToMoveTo,
      positionToMoveAlreadySelected,
    };
  },
  methods: {
    makeMove(selectedPositionToMove, selectedPositionToMoveTo) {
      if (
        this.positionIsNotEqualWithDefaultValues(selectedPositionToMove) &&
        this.positionIsNotEqualWithDefaultValues(selectedPositionToMoveTo)
      ) {
        this.updateMoveOnBoard(
          selectedPositionToMove,
          selectedPositionToMoveTo
        );
        this.selectedPositionToMoveTo = {
          row: -1,
          col: -1,
        };
        this.selectedPositionToMove = {
          row: -1,
          col: -1,
        };
        this.positionToMoveAlreadySelected = false;
      }
    },
    handleBoardItemClick(rowIndex, colIndex) {
      const position = { row: rowIndex, col: colIndex };
      if (!this.positionToMoveAlreadySelected) {
        this.selectedPositionToMove = position;
        this.positionToMoveAlreadySelected = true;
      } else {
        this.selectedPositionToMoveTo = position;
        this.makeMove(
          this.selectedPositionToMove,
          this.selectedPositionToMoveTo
        );
      }
    },
  },
};
</script>

<style scoped>
.container-game-info {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.board-items-container {
  display: flex;
  flex-direction: column;
}

.row-items-container {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
</style>
