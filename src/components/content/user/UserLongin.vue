<template>
  <div class="register">
    <nav-bar class="nav-bar">
      <div slot="center">登 &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp陆</div>
      <!-- <div slot="center">用户登陆</div> -->
    </nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="name"
        label="账号"
        placeholder="账号"
        :rules="[
          {
            validator: asyncValidator1,
            message: '账号必要以字母开头,长度在4-6之间',
          },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          {
            validator: asyncValidator2,
            message: '密码必要以字母开头，长度在6~18之间',
          },
        ]"
      />
      <div style="margin: 16px" class="tj">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
        <div class="speediness" @click="speedinessClick">快速注册</div>
      </div>
    </van-form>
  </div>
</template>

<script>
// import axios from "axios";
import { login } from "network/request";

import { Toast } from "vant";
import { Notify } from "vant";

import NavBar from "../../common/navbar/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    asyncValidator1(val) {
      return new Promise((resolve) => {
        // Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          // resolve(/^[a-zA-Z][a-zA-Z0-9_]{3,6}$/.test(val));
          resolve(/^[\u4e00-\u9fa5a-zA-Z0-9]{2,6}$/.test(val));
        }, 1000);
      });
    },
    asyncValidator2(val) {
      return new Promise((resolve) => {
        // Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(/^[a-zA-Z]\w{5,17}$/.test(val));
        }, 1000);
      });
    },
    onSubmit(values) {
      Toast.loading({
        message: "登陆中...",
        forbidClick: true,
      });
      login({
        url: "/login",
        method: "post",
        data: values,
      })
        .then((res) => {
          if (res) {
            setTimeout(() => {
              Notify({ type: "success", message: "登陆成功" });
              // Toast.success("登陆成功");
              const { id, name, phone, token, avatar_url } = res;
              window.localStorage.setItem("userToken", token);
              const user = { id, name, phone, avatar_url };
              window.localStorage.setItem("username", JSON.stringify(user));
              this.$router.push("/profile");

              // console.log(res);
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("submit", values);
    },
    speedinessClick() {
      // console.log(localStorage.getItem("username"));

      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
/deep/ .van-form {
  margin-top: 25%;
}

/deep/ .van-field__label {
  color: #fff;
}

/deep/ .van-button {
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #fff;
}

.van-cell {
  color: #fff;
  background-color: rgba(0, 0, 0, 0);
}
.register {
  height: 100vh;
  width: 100%;
  background-color: red;
  /* background: url("~assets/img/common/背景.jpg") no-repeat fixed top; */
  background: url("~assets/img/common/背景.jpg") no-repeat fixed top;
  background-size: 100% 100%;
}

.nav-bar {
  text-align: center;
  /* background-color: #70a1ff; */
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
}

.tj {
  position: relative;
  top: 25px;
}

.speediness {
  font-size: 10px;
  /* color: #cccccc; */
  color: #fff;
  position: absolute;
  right: 20px;
  top: -20px;
}
</style>