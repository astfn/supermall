<template>
  <div class="TabBar">
    <slot name="TabBar"> </slot>
  </div>
</template>
<script>
import TabBarItems from "components/common/tabbar/TabBarItems.vue";
export default {
  name: "TabBarCPN",
  data() {
    return {};
  },
  components: { TabBarItems }
};
</script>
<style scoped>
.TabBar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}
</style>
