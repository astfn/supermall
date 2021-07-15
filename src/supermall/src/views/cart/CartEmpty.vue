<template>
  <div class="CartEmpty">
    <span>购物车什么都没有，快去逛逛吧~</span>
    <h2 @click="goHome">去逛逛</h2>
  </div>
</template>
<script>
export default {
  name: "CartEmptyCPN",
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.replace({ path: "/home" });
    }
  }
};
</script>
<style scoped>
.CartEmpty {
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eee;
}
h2 {
  color: #ff7979;
}
span {
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
}
</style>
