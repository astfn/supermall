<template>
  <div class="DetailRecommend" v-if="Object.keys(data).length !== 0">
    <p class="title">其他商品</p>
    <goods :List="data.list" mode="detail" />
  </div>
</template>
<script>
import Goods from "components/content/goods/Goods.vue";
export default {
  name: "DetailRecommendCPN",
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: { Goods }
};
</script>
<style scoped>
.DetailRecommend {
  padding: 10px 10px 5px 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100px; */
}
.title {
  font-size: 17px;
  background-color: var(--color-high-text);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 30px;
}
.Goods {
  padding: 5px;
  background-color: #eee;
  text-align: left;
}
</style>
