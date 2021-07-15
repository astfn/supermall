import Vue from "vue";
import VueX from "vuex";

import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
Vue.use(VueX);

export default new VueX.Store({
  state: {
    Cart: { mode: "shopping", isSelect: false, shops: [] }
  },
  /*
    {
      mode:"admin|shopping",
      isSelect:false,
      shops:[
        { 
          isSelect: false,
          name: payload.shopName,
          logo: payload.shopLogo,
          goods:[obj……,{isSelect: false}]
        }……
      ]

    }
  
  */
  mutations,
  actions,
  getters,
  modules: {}
});
