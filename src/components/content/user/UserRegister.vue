<template>
  <div class="register">
    <nav-bar class="nav-bar">
      <div slot="center">注 &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp册</div>
    </nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        name="name"
        label="账号"
        placeholder="请输入账号"
        :rules="[
          {
            validator: asyncValidator1,
            message: '用户名必要以字母开头,长度在4-6之间',
          },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          {
            validator: asyncValidator2,
            message: '密码必要以字母开头，长度在6~18之间',
          },
        ]"
      />
      <van-field
        v-model="phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
          { validator: asyncValidator3, message: '请填写正确的手机号码' },
        ]"
      />
      <div style="margin: 16px" class="tj">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
        <div class="speedinessLongin" @click="speedinessClick">快速登陆</div>
        <div class="backhomepage" @click="backClick">返回首页</div>
      </div>
    </van-form>
  </div>
</template>

<script>
// import axios from "axios";
import { users } from "network/request";

import { Toast } from "vant";
import NavBar from "../../common/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      name: "",
      password: "",
      phone: "",
      show: false,
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
    asyncValidator3(val) {
      return new Promise((resolve) => {
        // Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(
            /^(17[8|6|7]|13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
              val
            )
          );
        }, 1000);
      });
    },
    onSubmit(values) {
      users({
        url: "/users",
        method: "post",
        // data: {
        //   values,
        // },
        data: values,
      })
        .then((res) => {
          if (res) {
            Toast.success("注册成功");
            this.$router.push("/longin");
            // console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("submit", values);
    },
    loginClick() {
      console.log(this);
      this.$router.push("/longin");
    },
    speedinessClick() {
      console.log(this);
      this.$router.push("/longin");
    },
    backClick() {
      this.$router.push("/home");
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
  background: url("~assets/img/common/背景.jpg") no-repeat fixed top;
  background-size: 100% 100%;
}

.nav-bar {
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
}

.tj {
  position: relative;
  top: 25px;
}

.speedinessLongin {
  font-size: 10px;
  color: #fff;
  position: absolute;
  right: 20px;
  top: -20px;
}
.backhomepage {
  font-size: 10px;
  color: #fff;
  position: absolute;
  left: 0;
  top: -20px;
}
</style>