<template>
  <div class="Recommend" v-if="data.length !== 0">
    <a v-for="item in data" :href="item.link">
      <div class="RecommendItems">
        <div class="imgbox"><img :src="item.image" :alt="item.title" /></div>
        <p>{{ item.title }}</p>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: "RecommendCPN",
  data() {
    return {};
  },
  props: { data: { type: Array, default: () => [] } },
  components: {}
};
</script>
<style scoped>
.Recommend {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  background-color: var(--color-background);
}
a {
  flex: 1;
  display: block;
  height: 100%;
}
.RecommendItems {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.imgbox {
  width: 100%;
  height: 65%;
}
.imgbox > img {
  height: 100%;
  border-radius: 50%;
}
.RecommendItems > p {
  text-align: center;
  font-size: 13px;
  margin-top: 5px;
}
</style>
