<template>
  <div class="profile">
    <!-- 导航栏 -->
    <nav-bar class="profile-nav">
      <div slot="center">个人页面</div>
    </nav-bar>
    <!-- 个人信息 -->
    <user-info></user-info>
    <user-wallet></user-wallet>
    <!-- 工具 -->
    <user-list-view></user-list-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import UserInfo from "./childComps/UserInfo";
import UserWallet from "./childComps/UserWallet";
import UserListView from "./childComps/UserListView";
export default {
  components: {
    NavBar,
    UserInfo,
    UserWallet,
    UserListView,
  },
};
</script>

<style scoped>
.profile .profile-nav {
  text-align: center;
  color: #fff;
  background-color: var(--color-navbar);
}
</style>