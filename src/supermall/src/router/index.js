import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("views/home/Home.vue");
const Category = () => import("views/category/Category.vue");
const Cart = () => import("views/cart/Cart.vue");
const Profile = () => import("views/profile/Profile.vue");
const Detail = () => import("views/detail/Detail.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/detail/:iid",
    component: Detail
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  }
];
export default new VueRouter({
  // linkActiveClass:"",
  // mode: "history", //项目发布到github上，若使用history，则会去掉‘#’,但是github的服务器没有相关的配置，所以要注释掉
  routes
});
