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
    <!-- <van-password-input
      :value="value"
      info="密码为 6 位数字"
      :error-info="errorInfo"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    /> -->
    <van-number-keyboard
      v-model="value"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
    <!-- <van-overlay v-show="show" @click="show = !show">
      <div class="wrapper">
        <h2 class="title">
          请在<strong>{{ counter }}</strong
          >秒内完成支付
        </h2>
        <div class="block">
          <img src="~assets/img/common/支付码.png" alt="" />
        </div>
      </div>
    </van-overlay> -->
  </div>
</template>

<script>
import checkButon from "components/content/checkbutton/checkButton";
import { mapGetters, mapActions } from "vuex";
import { Toast } from "vant";
import { login } from "network/request";

export default {
  data() {
    return {
      //这个是上面控制弹出遮罩层的属性
      // show: false,
      counter: 30,
      value: "",
      paymentcode: "",
      showKeyboard: false,
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
  watch: {
    value(value) {
      console.log(value);
      if (value.length === 6) {
        this.paymentcode = value;
        this.calcClick();
        console.log(this.paymentcode);
        this.value = "";
      }
    },
  },
  methods: {
    ...mapActions(["rommchecked", "clear", "addOrder"]),
    onInput(value) {
      Toast(value);
    },
    onDelete() {
      Toast("删除");
    },
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
        this.showKeyboard = true;
        //倒计时
        // let zf = setInterval(() => {
        //   this.counter -= 1;
        //   if (this.counter == 0) {
        //     this.show = false;
        //     clearInterval(zf);
        //     this.counter = 30;
        //     // Toast("支付不成功");
        //   } else if (this.show === false) {
        //     clearInterval(zf);
        //     this.counter = 30;
        //   }
        // }, 1000);
        const { paymentcode } = JSON.parse(localStorage.getItem("username"));
        console.log(paymentcode);
        if (this.paymentcode === paymentcode) {
          this.getcartList.forEach((item, index) => {
            if (item.checked) {
              //1.把数据保存到下面这些属性中
              console.log(item);
              //获取商品参数
              let shopid, shoptitle, shopprice, shopdesc, shopimage;
              //获取用户Id
              shopimage = item.image;
              shoptitle = item.title;
              shopdesc = item.desc;
              shopprice = item.price;
              shopid = item.iid;
              const { id } = JSON.parse(localStorage.getItem("username"));
              // //获取token数据
              const token = localStorage.getItem("userToken");
              // // console.log(shopid, shoptitle, shopcount);
              const values = {
                id,
                token,
                shopid,
                shoptitle,
                shopprice,
                shopimage,
                shopdesc,
              };

              const selectAll = this.getcartList.every((value) => {
                return value.checked;
              });
              if (selectAll) {
                this.clear();
                console.log(1);
              } else {
                if (item.checked) {
                  this.rommchecked(index);
                }
                // console.log(item.checked);
              }

              console.log(values);
              const product = {};
              product.image = shopimage;
              product.title = shoptitle;
              product.desc = shopdesc;
              product.price = shopprice;
              product.iid = shopid;
              this.addOrder(product).then((res) => {
                // 保存商品数据至数据库;
                console.log(res);
                login({
                  url: "/orderform",
                  method: "post",
                  data: values,
                });
              });

              // 把结算成功的商品从购物车表中移除
              const value = { id };
              console.log(shopid, value);
              login({
                url: "/commodity/romove/" + shopid,
                method: "post",
                data: value,
              });
            }
            // console.log(item.checked);
            // return item.checked;
          });
          // this.show = true;
          Toast.success("购买成功");
          // Toast("kkk");
        } else {
          console.log(111);
          if (this.paymentcode) {
            Toast("支付密码错误");
          }
        }
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

.xsmm {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
}
</style>