import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../views/home/Home");
const Cart = () => import("../views/cart/Cart");
const Category = () => import("../views/category/Category");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail");

Vue.use(VueRouter);

// 防止路径重复引发报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/",
    redirect: "/Home",
  },
  {
    path: "/home",
    component: Home,
  },
  ,
  {
    path: "/cart",
    component: Cart,
  },
  ,
  {
    path: "/category",
    component: Category,
  },
  ,
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/detail/:iid",
    component: Detail,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
