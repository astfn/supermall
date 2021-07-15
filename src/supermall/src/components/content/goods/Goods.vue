<template>
  <div class="Goods" v-if="List.length !== 0">
    <goods-list
      v-for="item in List"
      :val="item"
      @click.native="goDetail(item)"
    />
  </div>
</template>
<script>
import GoodsList from "./GoodsList.vue";
export default {
  name: "GoodsCPN",
  data() {
    return {};
  },
  props: {
    List: { type: Array, default: () => [] },
    mode: { type: String, default: "home" }
  },
  components: { GoodsList },
  methods: {
    goDetail(val) {
      if (this.mode === "home") {
        this.$router.push({
          path: `/detail/${val.iid}`
          // query: { data: "ashun" }
        });
      } else if (this.mode === "detail") {
        this.$router.push({
          path: `/detail/${val.shop_id}`
          // query: { data: "ashun" }
        });
      }
    }
  }
};
</script>
<style scoped>
.Goods {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
