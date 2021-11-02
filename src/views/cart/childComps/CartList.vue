<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in getcartList"
        :key="index"
        :product="item"
        :itemIndex="index"
      />
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import Scroll from "components/common/scroll/Scroll";

// import { login } from "network/request";

import { mapGetters } from "vuex";
export default {
  components: {
    CartListItem,
    Scroll,
  },
  computed: {
    ...mapGetters(["getcartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
    // const { id } = JSON.parse(localStorage.getItem("username"));
    // login({
    //   url: "commodity/goods/" + id,
    //   method: "get",
    // }).then((res) => {
    //   for (const key in res) {

    //     console.log(res[key].id);
    //   }
    // });
    // console.log(this.CartListItem);
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 49px - 44px - 40px);
  overflow: hidden;
}
.content {
  height: 100%;
}
</style>