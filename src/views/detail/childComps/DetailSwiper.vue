<template>
  <swiper :options="swiperOption" ref="mySwiper" class="detail-swiper">
    <swiper-slide
      v-for="(item, index) in topImages"
      :key="index"
      class="swiper-item"
    >
      <img :src="item" alt="" />
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
    topImages: {
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
    };
  },
  methods: {},
};
</script>

<style scoped>
.detail-swiper {
  height: 288px;
  overflow: hidden;
}

.swiper-item img {
  width: 100%;
  /* height: 100%; */
}
</style>