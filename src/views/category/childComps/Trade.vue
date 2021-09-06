<template>
  <div class="trade">
    <scroll class="content" ref="scroll">
      <div
        v-for="(item, index) in trabeName"
        :key="index"
        class="trade-item"
        @click="itemClick(index)"
        :class="{ active: currIndex === index }"
      >
        {{ item.title }}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  components: {
    Scroll,
  },
  props: {
    trabeName: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currIndex = index;
      this.$emit("titleClick", index);
    },
  },
};
</script>

<style scoped>
.trade {
  width: 100px;
  height: calc(100% - 49px - 44px);
  overflow: hidden;
  text-align: center;
  background-color: #f6f6f6;
}
.content {
  height: 100%;
}

.trade-item {
  width: 100px;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
}
.active {
  border-left: 2px solid var(--color-navbar);
  background-color: #fff;
  color: var(--color-navbar);
}
</style>