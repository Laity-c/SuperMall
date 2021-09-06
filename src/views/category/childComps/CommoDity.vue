<template>
  <div class="commo-dity" v-if="Object.keys(categoryData).length !== 0">
    <scroll class="content" ref="scroll">
      <div>
        <commo-dity-item
          v-for="(item, index) in categoryData"
          :itemCategory="item"
          :key="index"
        />
        <tab-control :title="title" @currentClick="currentClick" />
        <goods-list :goods="goods" />
      </div>
    </scroll>
  </div>
</template>

<script>
import CommoDityItem from "./CommoDityItem";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
export default {
  components: {
    CommoDityItem,
    Scroll,
    TabControl,
    GoodsList,
  },
  props: {
    categoryData: {
      type: Array,
      default() {
        return [];
      },
    },
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      title: ["综合", "新款", "销量"],
    };
  },
  methods: {
    currentClick(index) {
      //   console.log(index);
      this.$emit("commoDityClick", index);
    },
  },
};
</script>

<style scoped>
.commo-dity {
  display: flex;
  /* flex-wrap: wrap; */
  overflow: hidden;
  height: calc(100% - 49px - 44px);
}
.content {
  height: 100%;
}
</style>