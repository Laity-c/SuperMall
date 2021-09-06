<template>
  <div class="user-wallet">
    <div class="money">
      <div>0.00<span>元</span></div>
      <div>我的余额</div>
    </div>
    <div class="discount">
      <div>0<span>张</span></div>
      <div>优惠券</div>
    </div>
    <div class="integral">
      <div>0<span>积分</span></div>
      <div>我的积分</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.user-wallet {
  text-align: center;
  padding: 18px;
  display: flex;
}
.user-wallet div {
  flex: 1;
  font-size: 14px;
}
.money div:nth-child(1),
.discount div:nth-child(1),
.integral div:nth-child(1) {
  margin-bottom: 5px;
  font-size: 24px;
  color: #ff7d3e;
  font-weight: 700;
}
.money div:nth-child(1) span,
.discount div:nth-child(1) span,
.integral div:nth-child(1) span {
  font-size: 14px;
  color: #666;
  font-weight: 400;
}
</style>