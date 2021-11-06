<template>
  <div id="orderform">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <van-search v-model="value" placeholder="搜索我的订单" />
      </div>
      <div slot="right">
        <button @click="onSearch" class="btnSearch">搜索</button>
      </div>
    </nav-bar>
    <van-empty v-show="show" image="search" description="您还没有相关的订单" />
    <order-list />
  </div>
</template>

<script>
import NavBar from "../../common/navbar/NavBar.vue";
import OrderList from "./childComps/OrderList.vue";

import { login } from "network/request";

import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    NavBar,
    OrderList,
  },
  data() {
    return {
      value: "",
      show: false,
    };
  },
  methods: {
    ...mapActions(["addOrder", "clearOrder"]),
    backClick() {
      this.$router.push("/profile");
    },
    onSearch() {
      this.clearOrder();
      const { id } = JSON.parse(localStorage.getItem("username"));
      const value = { id };
      login({
        url: "/orderform/search/" + this.value,
        method: "post",
        data: value,
      }).then((res) => {
        if (res) {
          //当返回的是一个空数据就显示错误图片
          if (res.length === 0) {
            this.show = true;
          } else {
            //返回的是数据就储存到orderList属性中
            this.show = false;
            for (const key in res) {
              this.addOrder(res[key]).then((res) => {
                console.log(res);
              });
            }
          }
        }
      });
      // console.log(this.value);
    },
  },
  computed: {
    ...mapGetters(["getorderListLength"]),
  },
  created() {
    // const { id } = JSON.parse(localStorage.getItem("username"));
    // console.log(1);
    // login({
    //   url: "orderform/" + id,
    //   method: "get",
    // }).then((res) => {
    //   console.log(res);
    //   for (const key in res) {
    //     this.addOrder(res[key]).then((res) => {
    //       console.log(res);
    //     });
    //   }
    // });
  },
  activated() {
    this.show = false;
    //当没有数据的时候向数据库发送网络请求，把当前用户保存在订单表的数据请求到，然后保存至getorderLIst属性中
    if (!this.getorderListLength) {
      console.log(1);
      const { id } = JSON.parse(localStorage.getItem("username"));
      login({
        url: "orderform/" + id,
        method: "get",
      }).then((res) => {
        for (const key in res) {
          this.addOrder(res[key]).then((res) => {
            console.log(res);
          });
        }
      });
    }
  },
  deactivated() {
    this.clearOrder();
  },
};
</script>

<style scoped>
#orderform {
  height: 100vh;
}
.nav-bar {
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}

.back {
  text-align: center;
}
.back img {
  margin-top: 10px;
}

/deep/ .van-search {
  margin-top: 5px;
  padding: 0;
}

.btnSearch {
  width: 40px;
  height: 33px;
  border: none;
  color: #000;
  /* font-family: "黑体"; */
  background-color: #fff;
}
</style>