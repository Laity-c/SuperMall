import BackTop from "components/content/backTop/BackTop.vue";

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      saveY: 0, //控制返回顶部按钮的显示与隐藏
    };
  },
  methods: {
    // 返回顶部点击
    backTopClick() {
      this.$refs.Scroll.scrollTo(0, 0);
    },
  },
};
