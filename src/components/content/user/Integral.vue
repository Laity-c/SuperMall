<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center">积分商城</div>
    </nav-bar>
    <swiper :options="swiperOption" ref="mySwiper" class="home-swiper">
      <swiper-slide class="swiper-item">
        <img src="~assets/img/shop/1.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <img src="~assets/img/shop/2.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <img src="~assets/img/shop/3.jpg" alt="" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <van-grid class="shop1">
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品1.jpg" alt="" />
        <span>6000积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品13.jpg" alt="" />
        <span>5500积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品4.jpg" alt="" />
        <span>4000积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品11.jpg" alt="" />
        <span>2000积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品16.jpg" alt="" />
        <span>5000积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品17.jpg" alt="" />
        <span>11000积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品7.jpg" alt="" />
        <span>8000积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品14.jpg" alt="" />
        <span>10000积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品2.jpg" alt="" />
        <span>1000积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品10.jpg" alt="" />
        <span>1000积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品8.jpg" alt="" />
        <span>1000积分</span>
      </van-grid-item>
      <van-grid-item img="photo-o" text="文字">
        <img src="~assets/img/shop/商品9.jpg" alt="" />
        <span>1000积分</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import NavBar from "../../common/navbar/NavBar.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  components: {
    NavBar,
    Swiper,
    SwiperSlide,
  },
  methods: {
    backClick() {
      //返回页面
      this.$router.back();
    },
  },
  data() {
    return {
      swiperOption: {
        //   定义自动轮播
        autoplay: {
          delay: 2000, //多少秒轮播
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        pagination: {
          //设置小圆点
          el: ".swiper-pagination",
        },
      },
    };
  },
};
</script>

<style scoped>
.nav-bar {
  text-align: center;
  background-color: #fff;
}

.back {
  text-align: center;
}
.back img {
  margin-top: 10px;
}

.home-swiper {
  width: 100%;
  height: 150px;
}

.swiper-item img {
  width: 100%;
  height: 100%;
}

.shop1 {
  margin-top: 20px;
}

.shop1 img {
  width: 80%;
  height: 100%;
}

.shop1 span {
  margin-top: 3px;
  font-size: 12px;
}
</style>