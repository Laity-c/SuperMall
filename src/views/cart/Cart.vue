<template>
  <div id="cart">
    <!-- 导航栏 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ cartListLength }})</div>
    </nav-bar>

    <!-- 商品展示 -->
    <cart-list />

    <!-- 底装工具栏 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartListLength"]),
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.cart-nav {
  text-align: center;
  color: #fff;
  background-color: var(--color-navbar);
}
</style>