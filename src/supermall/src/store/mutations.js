import {
  DIFFSHOP,
  SIMILARGOODS,
  DIFFGOODS,
  CHANGE_MODE,
  DELETE_ALL,
  DELETE_GOODS
} from "./mutations-types.js";

export default {
  /*添加商品相关
   */
  [DIFFSHOP](state, payload) {
    console.log("不同店家");

    state.Cart.shops.push({
      isSelect: false,
      name: payload.shopName,
      logo: payload.shopLogo,
      goods: [payload]
    });
  },
  [SIMILARGOODS](state, data) {
    data.isSimilarGoods.num += data.payload.num;
    console.log("相同商品");
  },
  [DIFFGOODS](state, data) {
    data.isSimilarShop.goods.push(data.payload);
    console.log("不同商品");
  },
  /*更改模式
   */
  [CHANGE_MODE](state, data) {
    state.Cart.mode = state.Cart.mode == "admin" ? "shopping" : "admin";
  },
  /*删除商品相关
   */
  [DELETE_ALL](state, data) {
    //deleteAll,清空、mode、isSelect初始化
    state.Cart.shops = [];
    //为了能让dev-tools监听到，所以要commit，就要放在外面的action中
    // state.Cart.mode = "shopping";
    state.Cart.isSelect = false;
  },
  [DELETE_GOODS](state, data) {
    state.Cart.shops.forEach((shop, index, shops) => {
      if (shop.isSelect) {
        shops.splice(index, 1);
      } else {
        shop.goods.forEach((goods, i, goodsArr) => {
          goods.isSelect && goodsArr.splice(i, 1);
        });
      }
    });
  }
};
