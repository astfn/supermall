<template>
  <div class="DetailGoodsInfo" v-if="Object.keys(data).length !== 0">
    <div class="desc">
      <hr />
      <p class="p_desc">{{ data.desc }}</p>
      <hr />
      <p class="p_key">{{ data.detailImage[0].key }}</p>
    </div>
    <div class="images">
      <img
        v-for="(val, key) in data.detailImage[0].list"
        v-lazy="val"
        @load="GoodsInfoimageLoad(key)"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsInfoCPN",
  data() {
    return {};
  },
  props: {
    data: { type: Object, default: () => {} }
  },
  components: {},
  methods: {
    GoodsInfoimageLoad(key) {
      this.$emit("GoodsInfoimageLoad");
    }
  }
};
</script>
<style scoped>
.DetailGoodsInfo {
  padding: 10px 10px 20px 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: pink; */
  text-align: left;
  border-bottom: 5px solid #ddd;
}
.desc,
.images {
  width: 100%;
  position: relative;
}
.desc > hr {
  width: 55%;
  position: absolute;
}
.desc > hr::before {
  content: "";
  width: 5px;
  height: 5px;
  position: absolute;
  background-color: black;
  border-radius: 50%;
}
.desc hr:nth-of-type(1)::before {
  top: -1px;
  left: -1px;
}
.desc hr:nth-of-type(2) {
  right: 0px;
}
.desc hr:nth-of-type(2)::before {
  bottom: -1px;
  right: -1px;
}
.p_desc {
  font-size: 14px;
  text-align: left;
  text-indent: 2em;
  line-height: 1.7em;
  padding: 15px 5px;
}
.p_key {
  font-weight: bold;
  padding: 20px 5px;
}
.images > img {
  width: 100%;
}
</style>
