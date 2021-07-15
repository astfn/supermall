<template>
  <div id="Cart">
    <cart-nav-bar-main />
    <div class="CartContent" v-if="$store.state.Cart.shops.length !== 0">
      <scroll ref="scroll">
        <cart-shops
          v-for="shops in $store.state.Cart.shops"
          :shop="shops"
          @select_shop="select_shop"
          @select_goods="select_goods"
        />
      </scroll>
      <cart-bottom-bar @deleteGoods="deleteGoods" />
    </div>
    <cart-empty v-else />
  </div>
</template>
<script>
import CartNavBarMain from "./CartNavBarMain.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import CartShops from "./CartShops.vue";
import CartBottomBar from "./CartBottomBar.vue";
import CartEmpty from "./CartEmpty.vue";
export default {
  name: "CartCPN",
  data() {
    return { mode: "shopping" };
  },
  components: { CartNavBarMain, Scroll, CartShops, CartBottomBar, CartEmpty },
  activated() {
    this.$refs["scroll"] && this.$refs["scroll"].refresh();
  },
  methods: {
    select_shop(boolean) {
      if (!boolean) {
        this.$store.state.Cart.isSelect = false;
      } else {
        let selectShop = this.$store.state.Cart.shops.every(v => v.isSelect);
        selectShop && (this.$store.state.Cart.isSelect = true);
      }
    },
    select_goods(boolean) {
      this.select_shop(boolean);
    },
    deleteGoods() {
      //删除商品，刷新height
      this.$refs["scroll"].refresh();
    }
  }
};
</script>
<style scoped>
#Cart {
  width: 100%;
  height: calc(100% - 49px);
  position: relative;
}
.CartContent {
  width: 100%;
  height: 100%;
}
.Scroll {
  width: 100%;
  height: calc(100% - 30px - 30px);
  background-color: #eee;
}
</style>
