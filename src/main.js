import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";

import {
  Form,
  Field,
  Button,
  RadioGroup,
  Radio,
  Overlay,
  Notify,
  Popup,
  Uploader,
  AddressEdit,
  Grid,
  GridItem,
  Search,
  Empty,
  PasswordInput,
  NumberKeyboard,
} from "vant";

Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Overlay);
Vue.use(Notify);
Vue.use(Popup);
Vue.use(Uploader);
Vue.use(AddressEdit);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Search);
Vue.use(Empty);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.config.productionTip = false;

//解决移动端300ms延迟
FastClick.attach(document.body);

// window.addEventListener("touchmove", fn, { passive: false });

//使用图片懒加载
Vue.use(VueLazyLoad, {
  //占位图
  loading: require("./assets/img/common/peng.png"),
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
