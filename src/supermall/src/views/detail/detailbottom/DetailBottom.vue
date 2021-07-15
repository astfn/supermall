<template>
  <div class="DetailBottom">
    <div class="left">
      <div class="service">
        <i></i>
        <span>客服</span>
      </div>
      <div class="shop">
        <i></i>
        <span>店铺</span>
      </div>
      <div class="start">
        <i></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="cart" @click="isShowSelectGood('select_cart')">
        <span>加入购物车</span>
      </div>
      <div class="buy" @click="isShowSelectGood('select_buy')">
        <span>立即购买</span>
      </div>
    </div>
    <select-good-params mode="cart" ref="select_cart" :data="data" />
    <select-good-params mode="buy" ref="select_buy" :data="data" />
  </div>
</template>
<script>
import SelectGoodParams from "./SelectGoodParams.vue";
export default {
  name: "DetailBottomCPN",
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: { SelectGoodParams },
  methods: {
    isShowSelectGood(mode) {
      this.$refs[mode].isShow = !this.$refs[mode].isShow;
      let otherMode = mode === "select_cart" ? "select_buy" : "select_cart";
      if (this.$refs[mode].isShow) {
        this.$refs[otherMode].isShow = false;
      }
    }
  }
};
</script>
<style scoped>
.DetailBottom {
  width: 100%;
  height: 49px;
  background-color: var(--color-background);
  display: flex;
  box-shadow: 0px 0px 5px #ccc;
  position: relative;
}
.left {
  border-top-left-radius: 8px;
}
.right {
  border-top-right-radius: 8px;
}
.left,
.right {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left > div,
.right > div {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.left > div {
  height: 85%;
}
.left {
  font-size: 13px;
}
.right {
  font-size: 14px;
}
.cart {
  border-top-left-radius: 8px;
  color: black;
  background-color: #f9ca24;
}
.buy {
  border-top-right-radius: 8px;
  color: white;
  background-color: var(--color-tint);
}
.left i {
  display: block;
  width: 22px;
  height: 22px;
  background: url(~assets/images/detail/detail_bottom.png) 0 0/100%;
}
.service > i {
  background-position: 0 98px;
}
.shop > i {
  background-position: 0 -98px;
}
</style>
