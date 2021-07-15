<template>
  <div class="CartNavBarMain">
    <nav-bar>
      <template v-slot:center>
        <span>购物车</span>
        <span class="goodsTypeSum">({{ goodsTypeSum }})</span>
      </template>
      <template v-slot:right>
        <span class="Admin" :class="{ active: isAdmin }" @click="changeMode"
          >管理</span
        >
      </template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { CHANGE_MODE } from "@/store/mutations-types";

export default {
  name: "CartNavBarMainCPN",
  data() {
    return {};
  },
  components: { NavBar },
  computed: {
    goodsTypeSum() {
      return this.$store.state.Cart.shops.reduce((pre, val) => {
        return (pre += val.goods.length);
      }, 0);
    },
    isAdmin() {
      return this.$store.getters.mode_IsAdmin;
    }
  },
  methods: {
    changeMode() {
      this.$store.commit(CHANGE_MODE);
    }
  }
};
</script>
<style scoped>
.CartNavBarMain {
  width: 100%;
  height: 30px;
  background-color: var(--color-tint);
}
.CartNavBarMain >>> .NavBar_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.CartNavBarMain >>> .NavBar_right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.CartNavBarMain >>> .NavBar_right > span {
  letter-spacing: 1px;
}
.active {
  color: #fff;
  text-shadow: 1px 0px 3px #aaa;
}
</style>
