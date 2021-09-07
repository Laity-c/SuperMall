<template>
  <div v-if="Object.keys(detailInfo).length !== 0" id="goods-info">
    <div class="info-desc">
      <div class="stare"></div>
      <div class="text">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key" v-if="detailInfo.detailImage">
      {{ detailInfo.detailImage[0].key }}
    </div>
    <div class="info-list">
      <!-- <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :src="item"
        alt=""
        :key="index"
        @load="imageLoad" 通过在updata中在调用获取各模块offsetTop值也是正确的。并不会引发错误
        监听图片的方式会引发$el为undefind的错误
      /> -->
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :src="item"
        alt=""
        :key="index"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // imageLoad() {
    //   this.$emit("imageLoad");
    // },
  },
};
</script>

<style scoped>
#goods-info {
  padding: 20px 0 0 15px;
}
.info-desc {
  position: relative;
}
.stare,
.end {
  /* margin-left: 5px; */
  width: 100px;
  height: 0.5px;
  background-color: #c0c0c1;
}

.stare::after {
  content: "";
  position: absolute;
  top: -4px;
  width: 4px;
  height: 4px;
  background-color: #000;
}

.end::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 15px;
  width: 4px;
  height: 4px;
  background-color: #000;
}

.end {
  float: right;
  margin-right: 15px;
}

.text {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  color: #333333;
}

.info-list img {
  width: 100%;
}
</style>