<template>
  <div class="GoodsList" v-if="Object.keys(val).length !== 0">
    <div class="top">
      <img v-lazy="imageSrc" @load="goodsImageLoad" />
    </div>
    <div class="content">
      <div class="desc">
        <p>{{ val.title }}</p>
      </div>
      <div class="prop">
        <span class="price">{{ val.price }}</span
        ><span class="star">{{ val.cfav }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListCPN",
  data() {
    return {};
  },
  props: {
    val: { type: Object, default: () => {} }
  },
  components: {},
  methods: {
    goodsImageLoad() {
      this.$bus.$emit("goodsImageLoad");
    }
  },
  computed: {
    imageSrc() {
      return this.$parent.mode === "home" ? this.val.show.img : this.val.image;
    }
  }
};
</script>
<style scoped>
.GoodsList {
  width: 48%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  margin: 4px 0px;
  background-color: var(--color-background);
}
.top,
.content {
  width: 100%;
}
.top > img {
  width: 100%;
}

.desc {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.desc > p {
  width: 95%;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.prop {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.price {
  font-size: 13px;
  color: var(--color-high-text);
}

.star {
  position: relative;
  font-size: 12px;
  margin-left: 20px;
}
.star::before {
  content: "";
  position: absolute;
  top: 0px;
  left: -14px;
  width: 13px;
  height: 13px;
  background: url("~assets/images/home/collect.svg") 0 0/14px 14px;
}
</style>
