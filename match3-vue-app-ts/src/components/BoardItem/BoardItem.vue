<template>
  <div class="board-item-container">
    <img
      :src="require(`../../assets/BoardImages/${image}`)"
      :style="{
        width: '100px',
        height: '100px',
        objectFit: 'contain',
        border: isSelected ? '2px solid yellow' : 'none',
      }"
      @click="onClick"
    />
  </div>
</template>
<script>
export default {
  props: {
    // image: string;
    // isSelected: boolean;
    // onClick: () => void;
    image: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    //
  },
};
</script>
