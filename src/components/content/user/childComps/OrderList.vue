<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <order-list-item
        v-for="(item, index) in getorderList"
        :key="index"
        :product="item"
        :itemIndex="index"
      />
    </scroll>
  </div>
</template>

<script>
import OrderListItem from "./OrderListItem.vue";

import Scroll from "components/common/scroll/Scroll";

// import { login } from "network/request";

import { mapGetters } from "vuex";
export default {
  components: {
    OrderListItem,
    Scroll,
  },
  computed: {
    ...mapGetters(["getorderList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
    // const { id } = JSON.parse(localStorage.getItem("username"));
    // login({
    //   url: "orderform/" + id,
    //   method: "get",
    // }).then((res) => {
    //   //将用户储存在数据中的商品数据都渲染到购物车中
    //   if (res) {
    //     console.log(res);
    //     // console.log(id);
    //     for (const key in res) {
    /* const { image, title, desc, price, iid, createAt } = res[key];
          // console.log(res[0]);
          this.product.image = image;
          this.product.title = title;
          this.product.desc = desc;
          this.product.price = price;
          this.product.iid = iid;
          this.product.createAt = createAt.slice(0, 10);

          this.getorderLists.push(this.product);
          // this.getorderLists.product = this.product;
          console.log(this.getorderLists); */
    // console.log();
    // console.log([res]);
    // this.getorderLists = res[key];
    // console.log(this.getorderLists);
    // this.getorderLists.push(res[key]);
    // this.addOrder(res[key]).then((res) => {
    //   console.log(res);
    // });
    // console.log(this.getcartLists);
    // console.log(key);
    // console.log(res[key]);
    // this.addCarte(res[key]).then((res) => {
    //   Toast.success({
    //     message: res,
    //     duration: 1000,
    //   });
    // });
    //     }
    //   }
    // });
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 49px - 44px);
  overflow: hidden;
}
.content {
  height: 100%;
}
</style>