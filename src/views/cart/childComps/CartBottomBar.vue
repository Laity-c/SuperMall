<template>
  <div class="bottom-bar">
    <div class="check-buton">
      <check-buton :isChecked="isSelectAll" @click.native="checkClick" />
    </div>
    <span>全选</span>
    <div class="total">
      合计：<span>{{ totalPrice }}</span>
    </div>
    <div class="calculate" @click="calcClick">结算({{ totalLength }})</div>
    <van-overlay v-show="show" @click="show = !show">
      <div class="wrapper">
        <h2 class="title">
          请在<strong>{{ counter }}</strong
          >秒内完成支付
        </h2>
        <div class="block">
          <img src="~assets/img/common/支付码.png" alt="" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import checkButon from "components/content/checkbutton/checkButton";
import { mapGetters } from "vuex";
import { Toast } from "vant";

export default {
  data() {
    return {
      show: false,
      counter: 30,
    };
  },
  components: {
    checkButon,
  },
  computed: {
    ...mapGetters(["getcartList"]),
    totalPrice() {
      return (
        "￥" +
        this.getcartList
          .filter((item) => item.checked)
          .reduce((previous, item) => {
            return previous + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    totalLength() {
      // 遍历数组中的所有元素，过滤出item.checked为true的属性。就能得到有多少个了
      return this.getcartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // 判断数组中checked值为false的。如果有在对返回结果做一个取反 因为找到一个值为false的，find会返回true我们就需要取反
      return !this.getcartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      //通过全选按钮是否选中来决定Item是否全选或全不先
      if (this.isSelectAll) {
        //   如果全选按钮为选中状态，那么当我们点击全选按钮里，所有Item的checked应该为fals，就是不选中
        this.getcartList.forEach((item) => (item.checked = false));
      } else {
        //   如果全选按钮为不选中状态，那么当我们点击全选按钮里，所有Item的checked应该为true，就是为选中
        this.getcartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (this.getcartList.find((item) => item.checked)) {
        //倒计时
        let zf = setInterval(() => {
          this.counter -= 1;
          if (this.counter == 0) {
            this.show = false;
            clearInterval(zf);
            this.counter = 30;
            // Toast("支付不成功");
          } else if (this.show === false) {
            clearInterval(zf);
            this.counter = 30;
          }
        }, 1000);

        // this.getcartList.find((item) => {
        //   if (item.checked) {
        //     console.log(item.iid);
        //   }
        //   console.log(item.checked);
        //   // return item.checked;
        // });
        this.show = true;
        // Toast.success("购买成功");
        // Toast("kkk");
      } else {
        // Toast.success("未选中任何商品");
        Toast("未选中任何商品");
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 40px;
  position: relative;
  /* top: 0; */
  background-color: #eeeeee;
  display: flex;
  align-items: center;
}
.check-buton {
  margin: 0 10px;
}
.check-buton {
  width: 22px;
}

.total {
  padding-left: 35px;
  flex: 1;
}
.total span {
  color: #e58e26;
}
.calculate {
  width: 100px;
  height: 75%;

  margin-right: 10px;
  text-align: center;
  line-height: 32px;
  border-radius: 20px;
  color: #fff;
  font-size: 15px;

  background: linear-gradient(to right, #fa983a, #e58e26);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.title {
  position: absolute;
  top: 30%;
  color: #fff;
}

.title strong {
  color: red;
}

.block {
  width: 200px;
  height: 200px;
  /* background-color: #fff; */
}

.block img {
  width: 100%;
  height: 100%;
}
</style>