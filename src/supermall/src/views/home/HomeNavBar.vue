<template>
  <div id="HomeNavBar">
    <nav-bar>
      <!-- <template v-slot:left></template> -->
      <template v-slot:center
        ><div class="center"><p>首页</p></div></template
      >
      <!-- <template v-slot:right></template> -->
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "HomeNavBarCPN",
  data() {
    return {};
  },
  components: { NavBar }
};
</script>
<style scoped>
#HomeNavBar {
  width: 100%;
  height: 30px;
  font-size: 17px;
  color: #fff;
  background-color: var(--color-tint);
}
/* .NavBar_center > p {
  background-color: blanchedalmond;
} */
.NavBar_center > .center {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
