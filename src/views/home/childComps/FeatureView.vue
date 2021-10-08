<template>
  <div class="feature">
    <!-- <a href="https://act.mogujie.com/zzlx67"> -->
    <a href="javascript:;">
      <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="featureLoad" />
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    featureLoad() {
      this.$emit("featureLoad");
    },
  },
};
</script>

<style scoped>
.feature a img {
  width: 100%;
}
</style>