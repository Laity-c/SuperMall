<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNav"
    />
    <scroll class="content" ref="Scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :Goods="Goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <detail-goods :goods="recommend" ref="goods" />
    </scroll>
    <detail-bottom-bar @cartClick="cartClick" />
    <back-top @click.native="backTopClick" v-show="saveY" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import DetailGoods from "../../components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll.vue";

import { getDetail, Goods, Shop, GoodsParam, getComment } from "network/detail";
import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  name: "Detail",
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailGoods,
    DetailBottomBar,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      Goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [], //保存要跳转到的y值
      getThemTopY: null,
      crurrIndex: 0,
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      let data = res.result;
      //1.保存轮播图的数据
      this.topImages = data.itemInfo.topImages;
      //2.保存商品信息数据
      this.Goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.保存店铺信息
      this.shop = new Shop(data.shopInfo);
      //4.获取商品详细信息
      this.detailInfo = data.detailInfo;
      //5.保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.保存评论信息
      if (data.rate.cRate !== 0) this.commentInfo = data.rate.list[0];
      //7.请求推荐商品信息
      getComment().then((res) => {
        this.recommend = res.data.list;
        // console.log(this.recommend);
      });

      this.getThemTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        // this.$refs.param.$el.offsetTop &&
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 50);
        // this.$refs.comment.$el.offsetTop &&
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 40);
        // this.$refs.goods.$el.offsetTop &&
        this.themeTopYs.push(this.$refs.goods.$el.offsetTop - 40);
        //第二种方法 添加一个无穷大值
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
      }, 500);
    });
  },
  methods: {
    ...mapActions(["addCarte"]),
    titleClick(index) {
      // 点击导航回到相应的位置
      this.$refs.Scroll.scrollTo(0, -this.themeTopYs[index]);
      this.$refs.detailNav.currentIndex = index;
      // console.log(index);
      console.log(this.$refs.detailNav.currentIndex);
    },
    imageLoad() {
      // 图片全部加载完成后在获取模块的offsetTop值
      this.getThemTopY();
      // console.log(this.$refs.param.$el.offsetTop);
    },
    contentScroll(position) {
      //判断返回顶部是否显示和隐藏
      this.saveY = -position.y > 1000;

      //1.获取y值 因为获取到的是负值，我们需要用其转换主正值
      const positionY = -position.y;

      //2.positionY和主题里面的值进行对比
      for (const key in this.themeTopYs) {
        //for in 里面的k为字符串，不是数字，所以不能用于运算。所以我们需要把字符串转换为数字
        let i = parseInt(key);
        // 这种方法较为复杂
        /* if (
          (positionY > this.themeTopYs[i] &&
            positionY <= this.themeTopYs[i + 1]) ||
          (this.themeTopYs.length - 1 === i && positionY >= this.themeTopYs[i])
        ) {
          this.crurrIndex = i;
          this.$refs.detailNav.currentIndex = this.crurrIndex;
        } */
        // 我们使用这种比较简单的方法 来进行比较
        if (
          this.crurrIndex !== i &&
          positionY > this.themeTopYs[i] &&
          positionY <= this.themeTopYs[i + 1]
        ) {
          this.crurrIndex = i; //这个变量主要的作用就是控制我们多少次赋值

          this.$refs.detailNav.currentIndex = i;
          // console.log(i);
          // console.log(this.themeTopYs[i]);
          // console.log(this.themeTopYs[i + 1]);
        }
      }
    },
    cartClick() {
      //1.添加购物车需要展示的数据
      // console.log(this.Goods);
      const product = {};
      product.image = this.topImages[0];
      product.title = this.Goods.title;
      product.desc = this.Goods.desc;
      product.price = this.Goods.realPrice;
      product.iid = this.iid;

      this.addCarte(product).then((res) => {
        Toast.success({
          message: res,
          duration: 1000,
        });
      });
      // this.$store.dispatch("addCarte", product).then((res) => {
      //   Toast.success(res);
      // });
    },
  },
};
</script>
    
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  top: 0;
  background-color: #fff;
  z-index: 9;
}
.content {
  /* position: absolute;
  top: 44px;
  bottom: 49px; */
  height: calc(100% - 93px);
  overflow: hidden;
  /* margin-top: 44px; */
}
</style>