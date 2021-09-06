<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :title="['流行', '新款', '精选']"
      @currentClick="currentClick"
      ref="tabControl2"
      v-show="isTabFixed"
      class="tab-control"
      @click.native="tabControlTop"
    />
    <scroll
      class="content"
      ref="Scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="scroll"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" @recommendLoad="recommendLoad" />
      <feature-view @featureLoad="featureLoad" />
      <tab-control
        :title="['流行', '新款', '精选']"
        @currentClick="currentClick"
        ref="tabControl1"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 不能直接在组件上监听点击，如果需要在组件上监听需要加上.native -->
    <back-top @click.native="backTopClick" v-show="saveY" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
// import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { backTopMixin } from "common/mixin";

export default {
  // 混入模式
  mixins: [backTopMixin],
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      // goods是用来保存们三个页面所有数据的一个属性
      //page可以存放当前pop页面的数据请求到多少条
      //list就可以保存pop页面请求到的所有数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currenttype: "pop",
      //用当保存scroll页面中的y值
      //saveY: 0, //控制返回顶部按钮的显示与隐藏
      isTabFixed: false, //控制tabControl2的显示与隐藏
      tabOffsetTop: 0, //保存tabControl1的offsetTop值
      deactivtedY: 0, //保存离开当前页的位置
    };
  },
  computed: {
    showGoods() {
      //因为我们模块中尽量要不要写一大串逻辑代码，这样显得乱
      //所以可以封装为一个计算属性来完成操作
      return this.goods[this.currenttype].list;
    },
  },
  //进入当前组件会调用这个函数
  activated() {
    this.$refs.Scroll.scrollTo(0, this.deactivtedY, 0);
  },
  //离开当前组件会调用这个函数
  deactivated() {
    this.deactivtedY = this.$refs.Scroll.getScrollY();
  },
  //created是组件创建完成的一个生命周期函数
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求本周流行数据
    //因为要同时请求三个页面的数据，所以需要调用三次请求，同时传递不同的参数
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     *事件监听相关方法
     */
    currentClick(index) {
      //通过子组件传递过来的方法和参数来实现点击导航栏就会请求到不同的数据
      //通过点击导航栏获取下标，在把下标数据传递到父组件，我们在通过传递过来的下标判断。
      // 给this.currenttype属性赋值，因为传递过来的下标对应着我们请求类型
      switch (index) {
        case 0:
          this.currenttype = "pop";
          break;
        case 1:
          this.currenttype = "new";
          break;
        case 2:
          this.currenttype = "sell";
          break;
      }

      // 为了保证我们在点击导航栏的时候,两个导航栏显示的样式一至,所以需要在点击的里为tabControl组件中的currentIndex属性都重新赋值
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 返回顶部点击
    // backTopClick() {
    //   this.$refs.Scroll.scrollTo(0, 0);
    // },
    // 监听滚动显示和隐藏返回顶部按钮
    scroll(position) {
      //判断返回顶部是否显示和隐藏
      this.saveY = -position.y > this.tabOffsetTop ? true : false;

      // 决定tabContorl是否吸顶
      // 当我们滑动的距离大于我们导航栏的top值停住
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //上拉加载请求新的数据
    pullingUp() {
      this.getHomeGoods(this.currenttype);
    },

    //图片加载完成后在请求导航栏的top值
    // 吸顶效果函数，取top值
    swiperImageLoad() {
      // 如果需要获取到组件中的元素那么就需要使用$el了
      // console.log(this.$refs.tabControl1.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },
    // 防止在刷新时导致图片没有加载完成，使获取到的offsetTop不准确
    recommendLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },
    featureLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },
    // 点击复制的tabControl使tabControl回到顶部
    tabControlTop() {
      this.$refs.Scroll.scrollTo(0, -this.tabOffsetTop, 0);
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      //type是传递要请求的页面
      //声明page是因为每次上拉加载时，都会请求下一页的数据，所以我们每请求一个数据之后就让Page加1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //把请求到的数据保存到goods[属性].list里面。...这个是可以把请求到的所以数据全都追加到我们的数组里面。
        this.goods[type].list.push(...res.data.list);
        //我们把每次请求到多少条数据的个数，保存到goods[属性].page里面
        this.goods[type].page += 1;

        //完成上拉加载更多
        // 因为每次执行了上拉加载之后只会执行一次。只有在scroll里面调用这个finishPullUp方法，之后才能在次上拉加载
        this.$refs.Scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  /* 只有我们在使用原生滚动时才需要让home-nav使用fixed定位 */
  /*  position: fixed;
  top: 0;
  left: 0;
  right: 0;
   */

  /* 滑动的进程中导航的层级低于scroll滚动区域所以加定位提高层级 */
  position: relative;
  z-index: 9;

  text-align: center;
  color: var(--color-background);
  background-color: var(--color-navbar);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>
