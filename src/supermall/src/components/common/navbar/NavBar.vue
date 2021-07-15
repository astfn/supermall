<template>
  <div class="NavBar">
    <div class="NavBar_left">
      <slot name="left"></slot>
    </div>
    <div class="NavBar_center">
      <slot name="center"></slot>
    </div>
    <div class="NavBar_right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBarCPN",
  data() {
    return {};
  },
  components: {}
};
</script>
<style scoped>
.NavBar {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 20% 60% 20%;
}
</style>
