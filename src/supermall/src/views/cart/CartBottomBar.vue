<template>
  <div class="CartBottomBar">
    <div class="left">
      <div class="SelectAll" @click="selectAll">
        <strong :class="{ active: $store.state.Cart.isSelect }"></strong>
      </div>
      <span>全选</span>
    </div>
    <div class="center">
      <span class="num_txt">合计:</span>
      <span class="num">{{ getPriceSum }}</span>
    </div>
    <div class="right" @click="CheckOut">
      <span v-show="$store.getters.mode_IsAdmin">删除商品({{ GoodsSum }})</span>
      <span v-show="!$store.getters.mode_IsAdmin">去结算({{ GoodsSum }})</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "CartBottomBarCPN",
  data() {
    return { PriceSum: 999999 };
  },

  methods: {
    CheckOut() {
      // if (this.$store.getters.mode_IsAdmin) {
      //   if (this.$store.state.Cart.isSelect) {
      //     //deleteAll
      //     // this.$store.state.Cart.shops = [];
      //     // this.$store.state.Cart.mode = "shopping";
      //     // this.$store.state.Cart.isSelect = false;
      //   } else {
      //     // this.$store.state.Cart.shops.forEach((shop, index, shops) => {
      //     //   if (shop.isSelect) {
      //     //     shops.splice(index, 1);
      //     //   } else {
      //     //     shop.goods.forEach((goods, i, goodsArr) => {
      //     //       goods.isSelect && goodsArr.splice(i, 1);
      //     //     });
      //     //   }
      //     // });
      //   }
      // } else {
      //   //结算
      //   console.log("前往结算");
      // }
      this.$store
        .dispatch("deleteCart")
        .then(result => this.$toast.show(result))
        .then(_ => {
          this.$emit("deleteGoods");
        });
    },
    selectAll() {
      this.$store.state.Cart.isSelect = !this.$store.state.Cart.isSelect;
      this.changeIsSelect(this.$store.state.Cart.isSelect);
    },
    changeIsSelect(isSelectAll) {
      let changeArr = this.$store.state.Cart.shops.filter(v => {
        return isSelectAll ? !v.isSelect : v.isSelect;
      });
      changeArr.forEach(shop => {
        shop.isSelect = isSelectAll ? true : false;
        shop.goods.forEach(v => (v.isSelect = shop.isSelect));
      });
    },
    getSomeSum(prop) {
      let sum = 0;
      this.$store.state.Cart.shops.forEach(shop => {
        shop.goods.forEach(goods => {
          if (prop === "num") {
            goods.isSelect && (sum += goods[prop]);
          }
          if (prop === "price") {
            goods.isSelect && (sum += goods[prop] * goods["num"]);
          }
        });
      });
      return sum;
    }
  },
  computed: {
    GoodsSum() {
      return this.getSomeSum("num");
    },
    getPriceSum() {
      this.PriceSum = this.getSomeSum("price");
      // console.log(this.PriceSum);
      return `￥${(this.PriceSum / 100).toFixed(2)}`;
    }
  }
};
</script>
<style scoped>
.CartBottomBar {
  display: flex;
  width: 100%;
  height: 35px;
  background-color: #dfe6e9;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;
}
.CartBottomBar > div {
  margin-top: -3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
div.left {
  min-width: 25%;
  max-width: 30%;
  width: 29%;
  font-size: 14px;
}
.right {
  min-width: 32%;
  background-color: red;
  color: white;
  border-top-left-radius: 8px;
}
div.center {
  flex: 1;
  justify-content: flex-start;
}
.center > span {
  margin-left: 3px;
}
.num_txt {
  font-size: 14px;
}
.SelectAll {
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.SelectAll > strong {
  width: 17px;
  height: 17px;
  border: 1px solid #fff;
  border-radius: 50%;
  position: relative;
}

.active {
  background-color: var(--color-tint);
}
.active::before {
  content: "✔";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 10px;
  text-align: center;
  z-index: 999;
  color: white;
}
</style>
