<template>
  <div class="botton-bar">
    <div class="bar-icon">
      <div @click="shopClick">
        <i class="service icon"></i>
        <span>客服</span>
      </div>
      <div @click="shopClick">
        <i class="shop icon"> </i>
        <span>店铺</span>
      </div>
      <div @click="collectClick">
        <i class="icon" :class="{ select: selectShow }"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-text">
      <div class="cart" @click="cartClick">加入购物车</div>
      <div class="buy" @click="buyClick">购买</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      selectShow: false,
    };
  },
  methods: {
    collectClick() {
      this.selectShow = !this.selectShow;
      if (this.selectShow) {
        Toast({
          message: "收藏成功",
          duration: 1000,
          position: "bottom",
        });
      } else {
        Toast({
          message: "取消收藏成功",
          duration: 1000,
          position: "bottom",
        });
      }
    },
    cartClick() {
      this.$emit("cartClick");
    },
    buyClick() {
      Toast.loading({
        message: "正在前往支付页面",
        forbidClick: true,
      });
    },
    shopClick() {
      Toast({
        message: "抱歉,此功能暂未开放",
        duration: 1000,
      });
    },
  },
};
</script>

<style scoped>
.botton-bar {
  display: flex;
  height: 49px;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  /* background-color: red; */
}
.botton-bar div {
  flex: 1;
}
.bar-icon {
  display: flex;
  /* background-color: pink; */
}
.bar-icon div {
  flex: 1;
  text-align: center;
  font-size: 14px;
}

.bar-icon .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 5px auto 2px;
  /* 图片路径 位置 大小 */
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bar-icon .service {
  background-position: 0 97px;
}

.bar-icon .shop {
  background-position: 0 52px;
}

.bar-icon .select {
  background-position: 0 124px;
}

.bar-text {
  /* width: 50%; */
  /* height: 100%; */
  /* position: relative; */
  /* padding-left: 4p; */
  /* top: -6px; */

  display: flex;
  align-items: center;

  background-color: #ee5a24;
  border-radius: 25px;
}

.bar-text div {
  float: left;
  text-align: center;
  line-height: 49px;
  font-size: 18px;
}
.bar-text .cart {
  /* width: 50%; */
  background-color: #f79f1f;
  color: #666666;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}

.bar-text .buy {
  /* width: 50%; */
  color: #fff;
  /* background-color: #ee5a24; */
}
</style>