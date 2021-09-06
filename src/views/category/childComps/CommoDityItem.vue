<template>
  <div class="dity-item">
    <a :href="itemCategory.link">
      <img :src="itemCategory.image" alt="" />
    </a>
    <div>{{ itemCategory.title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    itemCategory: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.dity-item {
  margin: 5px;
  display: inline-block;
  width: 80px;
  height: 80px;
  text-align: center;
  font-size: 12px;
}
.dity-item a img {
  margin-bottom: 5px;
  width: 60px;
  height: 60px;
}
</style>