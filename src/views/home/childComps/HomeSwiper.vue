<template>
  <swiper :options="swiperOption" ref="mySwiper" class="home-swiper">
    <swiper-slide
      v-for="(item, index) in banners"
      :key="index"
      class="swiper-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
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
      imgLoad: false,
    };
  },
  methods: {
    imageLoad() {
      if (!this.imgLoad) {
        //我们只需要发送一次就可以,所以我们使用一个变量控制,只能进一次
        this.$emit("swiperImageLoad");
        this.imgLoad = true;
      }
    },
  },
};
</script>

<style scoped>
.swiper-item img {
  width: 100%;
  height: 100%;
}
</style>