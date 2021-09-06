<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: #f6f6f6;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
</style>