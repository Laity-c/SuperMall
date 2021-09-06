<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in title"
      :key="index"
      class="tab-control-item"
      :class="{ active: currentIndex === index }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("currentClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;

  /* position: sticky; */
  /* top: 44px; */
  /* z-index: 9; */
}
.tab-control-item {
  flex: 1;
}

.active {
  color: var(--color-navbar);
}

.active span {
  padding: 5px;
  border-bottom: 2px solid var(--color-navbar);
}
</style>