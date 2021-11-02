<template>
  <div class="user-info">
    <div class="user-img" @click="imgClick">
      <img v-if="avatarUrl" :src="avatarUrl" alt="" />
      <slot name="user-icon" v-else>
        <svg
          t="1619340779388"
          class="icon privateImage-svg left"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2130"
          width="60"
          height="60"
        >
          <path
            d="M617.216 696.192v-94.08C650.24 578.56 670.464 512 670.464 512c0-31.36 31.36-41.472 31.36-41.472 43.136-41.472 0-115.2 0-115.2V222.08C662.528 100.608 513.408 84.864 513.408 84.864s-150.016 15.616-189.44 137.088V355.2s-43.392 73.856 0 115.2c0 0 31.488 10.112 31.488 41.472 0 0 20.352 66.56 53.632 90.112v94.08S20.48 813.568 32.256 939.008h959.488c11.776-125.312-374.528-242.816-374.528-242.816z"
            p-id="2131"
            fill="#dbdbdb"
          ></path>
        </svg>
      </slot>
    </div>
    <div class="user-login">
      <div class="login">
        <span v-if="name">{{ name }}</span>
        <slot name="login" v-else>
          <span @click="login">登陆</span>/<span @click="register">注册</span>
        </slot>
      </div>
      <div>
        <svg
          t="1619340431309"
          class="icon icon-mobile"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1307"
          width="20"
          height="20"
        >
          <path
            d="M724.350707 63.353535H297.787475C253.310707 63.353535 217.212121 99.555556 217.212121 143.928889v736.245656c0 44.476768 36.20202 80.575354 80.575354 80.575354h426.563232c44.476768 0 80.575354-36.20202 80.575354-80.575354V143.928889c0-44.476768-36.098586-80.575354-80.575354-80.575354zM297.787475 104.727273h426.563232c21.617778 0 39.201616 17.583838 39.201616 39.201616V179.717172H258.585859v-35.788283C258.585859 122.311111 276.169697 104.727273 297.787475 104.727273zM258.585859 221.090909h505.069899v527.72202H258.585859V221.090909z m465.764848 698.285253H297.787475c-21.617778 0-39.201616-17.583838-39.201616-39.201617v-89.987878h505.069899v89.987878c-0.103434 21.617778-17.687273 39.201616-39.305051 39.201617z m0 0"
            p-id="1308"
            fill="#ffffff"
          ></path>
        </svg>
        <span v-if="phone">{{ phone }}</span>
        <slot name="phone" v-else>暂无绑定手机号码</slot>
      </div>
    </div>
    <div class="parenthesis" @click="isShow = !isShow">
      <slot>
        <svg
          t="1619341923729"
          class="arrow-svg right"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2990"
          width="20"
          height="20"
        >
          <path
            d="M699.733333 448L456.533333 202.666667c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l245.333334 245.333333c10.666667 10.666667 17.066667 25.6 17.066666 40.533333s-6.4 29.866667-17.066666 40.533334L409.6 817.066667c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333L699.733333 618.666667c23.466667-23.466667 36.266667-53.333333 36.266667-85.333334s-12.8-61.866667-36.266667-85.333333z"
            p-id="2991"
            fill="#ffffff"
          ></path>
        </svg>
      </slot>
    </div>
    <transition name="fade">
      <div v-show="isShow" class="exit" @click="exitClick">退出登陆</div>
    </transition>
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
      class="upload"
    >
      <div class="tx">上传头像</div>
      <!-- <van-form @submit="onSubmit"> -->
      <!-- <van-field name="uploader" label="头像上传"> -->
      <!-- <template #input> -->
      <van-uploader
        v-model="uploader"
        multiple
        :max-count="1"
        :after-read="PicOnReady"
      />
      <!-- </template> -->
      <!-- </van-field> -->
      <!-- <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div> -->
      <!-- </van-form> -->
    </van-popup>
  </div>
</template>

<script>
import { login } from "network/request";

import { Notify } from "vant";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      phone: "",
      isShow: false,
      show: false,
      avatarUrl: "",
      uploader: [],
    };
  },
  created() {
    const { name, phone, avatar_url, id } = JSON.parse(
      localStorage.getItem("username")
    );
    this.name = name;
    this.phone = phone;
    this.avatarUrl = avatar_url;
    // console.log(this.avatarUrl);
    if (!this.avatarUrl) {
      // console.log(11);
      login({
        url: `/users/${id}/avatarurl`,
        method: "get",
      })
        .then((res) => {
          if (res) {
            console.log(res);
            this.avatarUrl = res[0].avatar_url;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  activated() {
    const { name, phone, avatar_url } = JSON.parse(
      localStorage.getItem("username")
    );
    this.name = name;
    this.phone = phone;
    this.avatarUrl = avatar_url;
    this.isShow = false;
    console.log(this.name, this.phone);
  },
  methods: {
    ...mapActions(["clear"]),
    login() {
      this.$router.push("/longin");
    },
    register() {
      this.$router.push("/register");
    },
    exitClick() {
      localStorage.removeItem("userToken");
      this.$router.push("/longin");
      this.clear();
    },
    imgClick() {
      this.show = !this.show;
    },
    PicOnReady(file) {
      // after-read	 文件读取完成后的回调函数
      var formdata = new FormData();
      formdata.append("avatar", file.file); //传递的文件数据
      // console.log(formdata);
      const token = localStorage.getItem("userToken");
      login({
        url: "upload/avatar",
        method: "post",
        data: formdata,
        headers: {
          "content-type": "multipart/form-data",
          authorization: token,
        },
      }).then((res) => {
        //如果传入的响应状态码为200，则成功将文件发送给后台
        if (res) {
          Notify({ type: "success", message: res });
          // console.log(res);
        } else {
          console.log(res.data.msg); //这块是请求失败后台给返回的相应的数据
        }
      });
    },
    /* onSubmit(values) {
      const token = localStorage.getItem("userToken");
      console.log("submit", values.uploader);
      const avatar = values.uploader[0];
      const value = {
        avatar,
        token,
      };
      // console.log(value);
      // this.PicOnReady();
    }, */
  },
};
</script>

<style scoped>
.user-info {
  background-color: var(--color-navbar);
  padding: 15px;
  display: flex;
  align-items: center;
}
.user-img {
  margin-right: 15px;
  width: 60px;
  height: 60px;
  text-align: center;
  /* background-color: #fff; */
}
.user-img img {
  width: 100%;
  height: 100%;
}

.user-login {
  flex: 1;
  position: relative;
  padding: 10px;
  /* background-color: pink; */
  color: #fff;
}

.login {
  margin-bottom: 8px;
}

.icon-mobile {
  position: absolute;
  left: -9px;
  bottom: 10px;
}
.parenthesis {
  width: 20px;
}

.exit {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 45px;
  width: 100%;
  height: 50px;
  color: #fff;
  background-color: red;
  text-align: center;
  line-height: 50px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.upload {
  padding-top: 80px;
  text-align: center;
}

.upload .tx {
  position: absolute;
  left: -20px;
  top: 20px;
  /* color: red; */
  width: 200px;
  height: 20px;
  /* background-color: pink; */
  /* text-align: center; */
}
</style>