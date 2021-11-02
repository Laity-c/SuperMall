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

import { login } from "network/request";

import { mapGetters, mapActions } from "vuex";
import { Toast } from "vant";

// import { addCarte } from "../../store/actions";
export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartListLength"]),
  },
  methods: {
    ...mapActions(["addCarte"]),
  },
  // created() {},
  activated() {
    if (!this.cartListLength) {
      const { id } = JSON.parse(localStorage.getItem("username"));
      console.log(id);
      const product = {};
      /**
       * 下面测试错误的主要原来不是数据循环问题
       * 主要是因为我们数据库中返回的数据属性名称和调用接口数据中的名称不同
       * 然后造成了在跳转到addCart这个函数中进行判断商品的iid是否一致还是不一致
       * 然后判断的结果一直都是false,因为我们返回的数据属性为shopid里面根本没有iid
       * 所以全是一样的数据结果
       * 解决办法：
       *  把我们数据库表中的数据属性名全改成和vue组件中渲染的.属性名一样的
       *  改变数据库表中的数据属性名需要把vue页面和koa后台里面应用的数据名称全部改掉
       */
      login({
        url: "commodity/goods/" + id,
        method: "get",
      }).then((res) => {
        //将用户储存在数据中的商品数据都渲染到购物车中
        for (const key in res) {
          this.addCarte(res[key]).then((res) => {
            Toast.success({
              message: res,
              duration: 1000,
            });
          });
        }
      });
      // console.log(this.addCarte);
    }
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