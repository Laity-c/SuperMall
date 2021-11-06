<template>
  <div class="list-item">
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="info-title">{{ product.title }}</div>
      <div class="info-title-price"><span>￥</span>{{ price }}</div>
      <div class="info-bottom">
        <!-- <div class="createAt">购买时间:{{ product.createAt.slice(0, 10) }}</div> -->
        <div class="item-price left"><span>实付款</span>￥{{ price }}</div>
        <div class="roomm_botton" @click="rommClick(product.id)">删除订单</div>
      </div>

      <div class="romm">交易成功</div>
    </div>
  </div>
</template>

<script>
import checkButon from "components/content/checkbutton/checkButton";
import { mapActions } from "vuex";
import { Notify } from "vant";

import { login } from "network/request";

export default {
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    itemIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    checkButon,
  },
  computed: {
    price() {
      const price = this.product.price * 1;
      return price.toFixed(2);
    },
  },
  methods: {
    ...mapActions({
      xrommOrder: "rommOrder",
    }),
    checkClick() {
      this.product.checked = !this.product.checked;
    },
    addClick() {
      // this.$store.commit("addClick");
      this.$store.dispatch("add", this.product.iid);
    },
    subClcik() {
      console.log(this.product);
      this.$store.dispatch("sub", this.product.iid);
    },

    rommClick(orderid) {
      const { id } = JSON.parse(localStorage.getItem("username"));
      const token = localStorage.getItem("userToken");
      const value = { orderid, id, token };
      this.xrommOrder(this.itemIndex).then((res) => {
        Notify({ type: "success", message: res });
        // console.log(res);
        if (res) {
          login({
            url: "/orderform/remove",
            method: "post",
            data: value,
            //加请求中加入headers后，那么data中的数据在后台中无法获取到
            // headers: {
            //   "content-type": "multipart/form-data",
            //   authorization: token,
            // },
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.list-item {
  position: relative;
  display: flex;
  padding: 5px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.list-item div {
  flex: 1;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.list-item .item-info {
  width: 80%;
  padding: 5px 10px;
}
.info-title,
.info-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info-title {
  width: 70%;
  height: 20px;
  font-size: 16px;
  color: #000;
}

.info-title-price {
  position: absolute;
  right: 10px;
  top: 32px;
  color: #000;
}

.info-title-price span {
  font-size: 12px;
}

.info-desc {
  font-size: 15px;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 20px;
  font-size: 14px;
}

.item-price {
  /* float: right; */
  position: absolute;
  top: 60px;
  right: 10px;
  color: #000;
  font-size: 14px;
}

.item-price span {
  font-size: 12px;
}

.item-count {
  display: flex;
  /* width: 60px; */
  margin-right: 10px;
  text-align: center;
}

.add,
.subtract {
  padding: 6px;
  width: 20px;
  height: 20px;
  line-height: 7px;
  background-color: #fff;
  border: 1px solid #ccc;
}

.gs {
  height: 20px;
  display: inline-block;
  border: 1px solid #ccc;
}
.gspadd {
  padding: 0 10px;
}

.romm {
  position: absolute;
  top: 5px;
  right: 9px;
  color: red;
  font-size: 12px;
}

.roomm_botton {
  position: absolute;
  right: 10px;
  top: 82px;
  width: 70px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  border-radius: 13px;
  color: #000;
  border: 1px solid #ccc;
  background-color: #fff;
  text-align: center;
}

.createAt {
  color: #f1c40f;
}
</style>