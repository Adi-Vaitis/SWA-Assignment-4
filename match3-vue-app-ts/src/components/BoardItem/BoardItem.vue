<template>
  <div class="board-item-container">
    <img
      :src="require(`@/assets/BoardImages/${image}`)"
      :style="{
        width: '100px',
        height: '100px',
        objectFit: 'contain',
        border: isSelected ? '2px solid yellow' : 'none',
      }"
    />
  </div>
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    //
  },
};
</script>

<style>
.board-item-container {
  border: 1px solid black;
  margin-bottom: 0.5rem;
}

.board-item-container:hover {
  border: 1px solid red;
  transition: border 0.5s;
  cursor: pointer;
}
</style>
