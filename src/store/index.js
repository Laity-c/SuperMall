import Vuex from "vuex";
import Vue from "vue";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

// 注册插件
Vue.use(Vuex);

const state = {
  cartList: [],
  orderList: [],
};

//声明实例
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

//挂载到vue实例
export default store;
