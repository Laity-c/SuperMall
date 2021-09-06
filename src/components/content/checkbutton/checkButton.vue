<template>
  <div class="check-button" :class="{ active: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.check-button {
  width: 20px;
  height: 20px;
  padding-top: 2px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.active {
  background-color: red;
  border: none;
}
</style>
