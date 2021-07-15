import {
  DIFFSHOP,
  SIMILARGOODS,
  DIFFGOODS,
  CHANGE_MODE,
  DELETE_ALL,
  DELETE_GOODS
} from "./mutations-types.js";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //商品是否为相同店家
      let isSimilarShop = context.state.Cart.shops.find(
        v => v.name === payload.shopName
      );
      if (isSimilarShop) {
        console.log("相同店家");
        //是否存在相同属性的商品
        let isSimilarGoods = isSimilarShop.goods.find(v => {
          return v.style === payload.style && v.size === payload.size;
        });
        if (isSimilarGoods) {
          context.commit(SIMILARGOODS, { isSimilarGoods, payload });
        } else {
          context.commit(DIFFGOODS, { isSimilarShop, payload });
        }
      } else {
        context.commit(DIFFSHOP, payload);
      }
      console.log(context.state.Cart);
      resolve("成功添加购物车");
    });
  },
  deleteCart(context, payload) {
    return new Promise((resolve, reject) => {
      if (context.getters.mode_IsAdmin) {
        if (context.state.Cart.isSelect) {
          //deleteAll
          context.commit(CHANGE_MODE);
          context.commit(DELETE_ALL);
          resolve("已清空购物车");
        } else {
          context.commit(DELETE_GOODS);
          resolve("删除成功");
        }
      } else {
        //结算
        resolve("前往结算");
      }
    });
  }
};
