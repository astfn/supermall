import Vue from "vue";
import Toast from "./Toast.vue";

const obj = {};
obj.install = () => {
  //创建组件构造器
  let constructor = Vue.extend(Toast);
  //new出组件对象
  let toast = new constructor();
  //挂载Dom,toast.$el
  toast.$mount(document.createElement("div"));
  //将$el追加到界面
  document.body.append(toast.$el);
  //vue原型链设置接口
  Vue.prototype.$toast = toast;
};
export default obj;
