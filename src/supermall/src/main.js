import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//toast组件
import Toast from "components/common/toast/index.js";
Vue.use(Toast);
//事件总线
Vue.prototype.$bus = new Vue();
//fastclick
import FastClick from "fastclick";
FastClick.attach(document.body);
//lazyLoad
import VueLazyLoad from "vue-lazyload";
Vue.use(VueLazyLoad, {
  preLoad: 1, //预加载高度比例	default:1.3
  loading: require("./assets/images/common/placeholder.png") //加载过程中的图片
});
new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
