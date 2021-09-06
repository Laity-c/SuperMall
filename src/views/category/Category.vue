<template>
  <div class="cate-gory">
    <!-- 导航栏 -->
    <nav-bar class="gory-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="box">
      <!-- 商品标题 -->
      <div class="box1">
        <trade :trabeName="trabeName" @titleClick="titleClick" class="trade" />
      </div>
      <!-- 商品展示 -->
      <div class="box2">
        <commo-dity
          :categoryData="categoryData"
          class="dity"
          :goods="showGoodsList"
          @commoDityClick="commoDityClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Trade from "./childComps/Trade";
import CommoDity from "./childComps/CommoDity";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
export default {
  name: "Category",
  components: {
    NavBar,
    Trade,
    CommoDity,
  },
  data() {
    return {
      trabeName: [],
      categoryData: [],
      maitKey: "",
      miniWallkey: "",
      categoods: {
        pop: { type: "pop", miniWallkey: "", list: [] },
        new: { type: "new", miniWallkey: "", list: [] },
        sell: { type: "sell", miniWallkey: "", list: [] },
      },
      currentType: "pop",
    };
  },
  computed: {
    showGoodsList() {
      // 我们需要根据type的不同传递给goodsList组件不同的数据
      // 这段期间也可以直接写在传值的地方，但为了使代码看着简洁就使用计算属性了
      return this.categoods[this.currentType].list;
    },
  },
  created() {
    this.getCategory();
    //获取商品标题数据

    //首次调用数据
    this.getSubcategory(3627);
    this.getCategoryDetail(10062603, "pop");
    this.getCategoryDetail(10062603, "new");
    this.getCategoryDetail(10062603, "sell");

    this.categoods["pop"].miniWallkey = 10062603;
    this.categoods["new"].miniWallkey = 10062603;
    this.categoods["sell"].miniWallkey = 10062603;
  },
  methods: {
    // 获取标题数据
    getCategory() {
      getCategory().then((res) => {
        // console.log(res);
        this.trabeName = res.data.category.list;
        // console.log(this.trabeName);
      });
    },
    // 点击标题时在请求应该的商品数据
    titleClick(index) {
      // 保存请求商品和请求推荐商品的参数
      this.maitKey = this.trabeName[index].maitKey;
      this.miniWallkey = this.trabeName[index].miniWallkey;

      // 点击哪个标题我们就会把当前参数传给网络请求
      this.getSubcategory(this.maitKey);

      // 因为请求的每个miniwallkey都是一样的。所以我给每个对象保存了同一存miniWallkey
      // 当点击不同的标题只需要type发生改变就可以了
      this.categoods["pop"].miniWallkey = this.miniWallkey;
      this.categoods["new"].miniWallkey = this.miniWallkey;
      this.categoods["sell"].miniWallkey = this.miniWallkey;
      // console.log(this.categoods[this.currentType].miniWallkey);

      // 点击不同标题需要请求新的网络数据
      this.getCategoryDetail(
        this.categoods[this.currentType].miniWallkey,
        this.categoods[this.currentType].type
      );
      // console.log(this.categoods[this.currentType].miniWallkey,
      //   this.categoods[this.currentType].type);
    },
    // 通过点击tadControl组件，传递过来的下标值。每个下标值对应着我们需要请求数据的type值
    commoDityClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // console.log(this.categoods[this.currentType].type);
      // console.log(this.miniWallkey);
      // 点击后需要请求数的数据
      // console.log(this.categoods[this.currentType].miniWallkey);
      this.getCategoryDetail(
        this.categoods[this.currentType].miniWallkey,
        this.categoods[this.currentType].type
      );
    },
    // 请求商品数据
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then((res) => {
        this.categoryData = res.data.list;
        // console.log(this.categoods["pop"].list);
      });
    },
    // 对请求推荐商品数据的封装函数
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then((res) => {
        // console.log(...res);
        // 因为我们每次展示的数据都是一次性请求完的。不需要把上一次请求的数据加进去
        // 所以在每次请求新的数据时我都会把原来的数据清空
        this.categoods[type].list = [];
        this.categoods[type].list.push(...res);
      });
    },
  },
};
</script>

<style scoped>
.cate-gory {
  height: 100vh;
}
.box {
  height: 100vh;
  display: flex;
}
.gory-nav {
  text-align: center;
  color: #fff;
  background-color: var(--color-navbar);
}

.box {
  display: flex;
}
.box1 {
  width: 100px;
}
.box2 {
  flex: 1;
}
</style>