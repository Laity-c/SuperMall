<template>
  <div class="list-item">
    <div class="item-selector">
      <check-buton :isChecked="product.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="info-title">{{ product.title }}</div>
      <div class="info-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ product.price }}</div>
        <div class="item-count right">
          <button
            class="subtract"
            :disabled="product.count <= 1"
            @click="subClcik"
            v-show="isShow"
          >
            -
          </button>
          <div class="gs" @click="isShow = !isShow" :class="{ gspadd: isShow }">
            x{{ product.count }}
          </div>
          <button class="add" @click="addClick" v-show="isShow">+</button>
        </div>
      </div>
      <div class="romm" @click="rommClick">x</div>
    </div>
  </div>
</template>

<script>
import checkButon from "components/content/checkbutton/checkButton";
import { mapActions } from "vuex";
import { Toast } from "vant";

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
  methods: {
    ...mapActions({
      xromm: "romm",
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

    rommClick() {
      this.xromm(this.itemIndex).then((res) => {
        Toast.success({
          message: res,
          duration: 1000,
        });
      });
      // this.$store.dispatch("romm", this.itemIndex);
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
  width: 70%;
  padding: 5px 10px;
}
.info-title,
.info-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info-title {
  height: 20px;
  font-size: 17px;
  color: #000;
}
.info-desc {
  font-size: 15px;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 20px;
  font-size: 17px;
}

.item-price {
  color: #ff4500;
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
  top: 2px;
  right: 9px;
  color: red;
}
</style>