<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in title"
          :key="index"
          class="title-item"
          :class="{ active: currentIndex === index }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    backClick() {
      //返回页面
      this.$router.back();
    },
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  text-align: center;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.back {
  text-align: center;
}
.back img {
  margin-top: 10px;
}

.active {
  color: var(--color-navbar);
}
</style>
