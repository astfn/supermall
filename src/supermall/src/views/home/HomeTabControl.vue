<template>
  <div class="Home_TabControl">
    <tab-control ref="tabControl" :titles="titles" @setActive="setActive" />
  </div>
</template>
<script>
import TabControl from "components/content/tabcontrol/TabControl.vue";
export default {
  name: "Home_TabControlCPN",
  data() {
    return { titles: ["流行", "新款", "精选"] };
  },
  components: { TabControl },
  methods: {
    setActive(index) {
      this.$emit("setActive", index);
    }
  }
};
</script>
<style scoped>
.Home_TabControl {
  width: 100%;
  height: 30px;
  background-color: var(--color-background);
}
</style>
