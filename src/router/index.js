import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../views/home/Home");
const Cart = () => import("../views/cart/Cart");
const Category = () => import("../views/category/Category");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail");
const Longin = () => import("../components/content/user/UserLongin");
const Register = () => import("../components/content/user/UserRegister");
const Address = () => import("../components/content/user/Address");
const Integral = () => import("../components/content/user/Integral");

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
  {
    path: "/longin",
    component: Longin,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/address",
    component: Address,
  },
  {
    path: "/integral",
    component: Integral,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

//路由守卫
router.beforeEach((to, from, next) => {
  const isToken = window.localStorage.getItem("userToken");
  if (to.path == "/longin" || to.path == "/register") {
    next();
  } else {
    isToken ? next() : next("/longin");
  }
});
export default router;
