<template>
  <div class="Home_Swiper">
    <div class="Home_Swiper_content"></div>
    <div class="Home_Swiper_iconsBox"></div>
  </div>
</template>
<script>
export default {
  name: "HomeSwiperCPN",
  data() {
    return {};
  },
  props: {},
  components: {}
};
</script>
<style scoped>
.Home_Swiper {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.Home_Swiper_content {
  width: 100%;
  display: flex;
}
.Home_Swiper_iconsBox {
  width: 70%;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.Home_Swiper >>> .Home_Swiper_icons {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #fff;
}
.Home_Swiper >>> .Home_Swiper_active {
  background-color: red;
}
</style>
