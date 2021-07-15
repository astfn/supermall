<template>
  <div class="Detail_SwiperMax">
    <img :src="topBcImg" class="TopBCImage" @load="topImageLoad" />
    <div class="Detail_SwiperMain">
      <div class="Detail_Swiper_content"></div>
      <div class="Detail_Swiper_iconsBox"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailSwiperCPN",
  data() {
    return {};
  },
  props: {
    topBcImg: { type: String, default: "" }
  },
  components: {},
  methods: {
    topImageLoad() {
      this.$emit("topImageLoad");
    }
  }
};
</script>
<style scoped>
.Detail_SwiperMax {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.TopBCImage {
  width: 100%;
  filter: blur(4px);
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;
}
.Detail_SwiperMain {
  width: 90%;
  position: relative;
  /* overflow: hidden; */
  top: 0px;
  left: 0px;
  margin: 0 auto;
  max-height: 390px;
}
.Detail_Swiper_content {
  display: flex;
}
.Detail_Swiper_iconsBox {
  width: 65%;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
}
.Detail_SwiperMain >>> .Detail_Swiper_icons {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #fff;
}
.Detail_SwiperMain >>> .Detail_Swiper_active {
  background-color: red;
}
/* .Detail_SwiperMain >>> .Detail_Swiper_ImageLinks {
} */
.Detail_SwiperMain >>> .Detail_Swiper_images {
  padding: 5px 8px;

  border-radius: 20px;
}
</style>
