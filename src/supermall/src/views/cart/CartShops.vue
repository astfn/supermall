<template>
  <div class="CartShops" v-if="Object.keys(shop).length !== 0">
    <div class="ShopTop">
      <div
        class="ShopBtn"
        @click="select"
        :class="{
          select_shop_s: !$store.getters.mode_IsAdmin && shop.isSelect,
          select_shop_d: $store.getters.mode_IsAdmin && shop.isSelect
        }"
      >
        <strong></strong>
      </div>
      <div class="ShopData">
        <img class="shopLogo" :src="shop.logo" /><span class="shopName">{{
          shop.name
        }}</span>
      </div>
    </div>
    <cart-goods
      v-for="goods in shop.goods"
      :data="goods"
      @select_goods="select_goods"
    />
  </div>
</template>
<script>
import CartGoods from "./CartGoods.vue";
export default {
  name: "CartShopsCPN",
  data() {
    return {};
  },
  props: { shop: { type: Object, default: () => {} } },
  components: { CartGoods },
  methods: {
    select() {
      this.shop.isSelect = !this.shop.isSelect;
      if (this.shop.isSelect) {
        let notSelectGoods = this.shop.goods.filter(v => !v.isSelect);
        notSelectGoods.forEach(v => (v.isSelect = true));
      } else {
        let selectGoods = this.shop.goods.filter(v => v.isSelect);
        selectGoods.forEach(v => (v.isSelect = false));
      }
      this.$emit("select_shop", this.shop.isSelect);
    },
    select_goods(boolean) {
      if (!boolean) {
        this.shop.isSelect = false;
      } else {
        let selectShop = this.shop.goods.every(v => v.isSelect);
        selectShop && (this.shop.isSelect = true);
      }
      this.$emit("select_goods", boolean);
    }
  }
};
</script>
<style scoped>
.CartShops {
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  border-radius: 3px;
  margin: 8px 5px 0px 5px;
  overflow: hidden;
}
.ShopTop {
  padding-top: 8px;
  width: 100%;
  display: flex;
}
.ShopBtn {
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ShopBtn > strong {
  width: 15px;
  height: 15px;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: relative;
}
.ShopData {
  flex: 1;
  display: flex;
  align-items: center;
}
.shopLogo {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 8px;
}
.shopName {
  font-size: 13px;
}

.select_shop_d > strong::after,
.select_shop_s > strong::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  border-radius: 50%;
}
.select_shop_d > strong::after {
  background-color: #e17055;
}
.select_shop_s > strong::after {
  background-color: red;
}
</style>
