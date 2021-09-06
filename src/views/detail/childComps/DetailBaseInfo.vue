<template>
  <div v-if="Object.keys(Goods).length !== 0" class="base-info">
    <div class="info-title">{{ Goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ Goods.newPrice }}</span>
      <span class="o-price">{{ Goods.oldPrice }}</span>
      <span
        v-if="Goods.discount"
        :style="{ backgroundColor: Goods.discountBcolor }"
        class="discount"
        >{{ Goods.discount }}</span
      >
    </div>
    <div class="info-other">
      <span>{{ Goods.columns[0] }}</span>
      <span>{{ Goods.columns[1] }}</span>
      <!-- <span v-if="Goods.services">{{ Goods.services[1].name }}</span> -->
      <span>{{ Goods.columns[2] }}</span>
    </div>
    <div class="info-service">
      <span
        v-for="(item, index) in Goods.services"
        :key="index"
        class="info-service-item"
      >
        <img :src="item.icon" alt="" />
        <span>{{ item.name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  border-bottom: 5px solid var(--border-color);
}

.info-title {
  color: #000;
  font-size: 16px;
}

.info-price {
  position: relative;
  margin: 10px 0 15px 0;
}

.n-price {
  font-size: 24px;
  color: var(--color-high-text);
}

.o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}

.discount {
  position: absolute;
  top: 0;
  font-size: 13px;
  color: #fff;
  background-color: var(--color-tint);
  padding: 2px 5px;
  margin-left: 5px;
  border-radius: 8px;
}

.info-other {
  display: flex;
  font-size: 13px;
  color: #bbbbbb;
  /* width: 100%; */
  border-bottom: 1px solid var(--border-color);
}
.info-other span {
  flex: 1;
  padding: 5px 0;
}
.info-other span:nth-child(2) {
  text-align: center;
}
.info-other span:nth-child(3) {
  text-align: right;
}

.info-service {
  display: flex;
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.info-service-item {
  flex: 1;
  font-size: 12px;
  white-space: nowrap;
}

.info-service-item img {
  width: 14px;
  height: 14px;
  vertical-align: middle;
}
</style>