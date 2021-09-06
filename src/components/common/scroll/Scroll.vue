<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
      <div v-if="pullUpLoad" class="pullup-tips">
        <div v-if="!isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">Pull up to load more items</span>
        </div>
        <div v-else class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bscroll: null,
      isPullUpLoad: false,
    };
  },
  mounted() {
    //1.创建BScroll实例
    this.bscroll = new BScroll(this.$refs.wrapper, {
      // 在bscroll里面默认会阻止js点击事件，需要我们开启
      click: true,
      //我们这们把probeType的值设置为可以让使用这个组件的人传递的
      // 这样在多次使用这个组件时，可以传入不同的值来决定要不要监听这滚动
      // 1. probeType 为 0，在任何时候都不派发 scroll 事件，
      // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
      // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
      // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
      probeType: this.probeType,
      // pullUpLoad是否开启上拉加载
      pullUpLoad: this.pullUpLoad,
      // 当这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法
      observeDOM: true,
      // 开启对 wrapper 子元素中图片元素的加载的探测。无论图片的加载成功与否，都会自动调用 BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度
      observeImage: true,
    });
    //2.监听滚动
    //因为只有处于2或3才需要监听,发送事件.其他时候都不会发送事件出去,这样更节省性能
    if (this.probeType === 2 || this.probeType === 3) {
      this.bscroll.on("scroll", (position) => {
        //把拿到的值传给父组件
        this.$emit("scroll", position);
      });
    }

    //监听是否到底部
    // if (this.pullUpLoad) {
    //   this.bscroll.on("pullingUp", () => {
    //     this.$emit("pullingUp");
    //   });
    // }
    if (this.pullUpLoad) {
      this.bscroll.on("pullingUp", this.pullingUpHandler);
    }
  },
  methods: {
    // 在每个函数体里面都加上this.scroll 是为了保证，每次执行时，scroll这个实例已经被创建出来了
    scrollTo(x, y, time = 300) {
      this.bscroll && this.bscroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      // finishPullUp这个方法能让我们上滑到底部时，再次上拉加载
      this.bscroll && this.bscroll.finishPullUp();
    },
    getScrollY() {
      //this.bscroll.y获取当前滚动的y值
      return this.bscroll ? this.bscroll.y : 0;
    },
    refresh() {
      // refresh重新计算BetterScroll的高度
      this.bscroll && this.bscroll.refresh();
    },
    async pullingUpHandler() {
      this.$emit("pullingUp");
      this.isPullUpLoad = true;

      await this.requestData();

      this.bscroll.finishPullUp();
      this.bscroll.refresh();
      this.isPullUpLoad = false;
    },
    async requestData() {
      try {
        const newData = await this.ajaxGet(/* url */);
        this.data += newData;
      } catch (err) {
        // handle err
        console.log(err);
      }
    },
    ajaxGet(/* url */) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(20);
        }, 1000);
      });
    },
  },
};
</script>

<style  scoped>
.pullup-tips {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
