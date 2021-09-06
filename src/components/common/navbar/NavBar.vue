<template>
  <!-- 因为我们的导航栏会在多个页面中使用，所以我们这里使用class没有使用id -->
  <div class="nav-bar">
    <!-- 每个页面的导航栏可能不一样，所以我们把导航栏分为三个部分，预留三个插槽来填充内容 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
}
</style>