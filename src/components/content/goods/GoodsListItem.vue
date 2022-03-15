<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img v-lazy="imgUrl" alt="" />
    <div>
      <p class="title">{{ goodsItem.title }}</p>
      <span class="price"><span>￥</span>{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    imgUrl() {
      //因为被复用的时候，获取的数据不一样所以需要判断一下
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    },
  },
  methods: {
    goodsItemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-list-item {
  position: relative;
  width: 48%;
  font-size: 12px;
  padding-bottom: 20px;
  /* margin: 10px;
  width: calc(100% / 3 - 20px); */
}
.goods-list-item img {
  width: 100%;
  height: 90%;
  border-radius: 2%;
}
.title {
  /* 第一步强制让文本在一行上显示不换行 */
  white-space: nowrap;
  /* 第二步让溢出的文字隐藏 */
  overflow: hidden;
  /* 第三步将溢出的文字部分用省略号代替 */
  text-overflow: ellipsis;
  margin-bottom: 3px;
}

.collect {
  position: relative;
}
.collect::before {
  content: "";
  position: absolute;
  left: -16px;
  bottom: 0;
  width: 14px;
  height: 14px;
  background: url(~assets/img/common/collect.svg) 0 0/14px 14px;
}

.price {
  margin-right: 30px;
  font-size: 16px;
  color: #fc5531;
}

.price span {
  font-size: 12px;
}

.goods-list-item div {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  /* background-color: #000; */
  /* text-align: center; */
}
</style>
