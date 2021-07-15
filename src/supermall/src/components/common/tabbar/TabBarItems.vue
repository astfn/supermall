<template>
  <div class="TabBarItems" @click="jumpRouter">
    <div class="TabBarItems_image" v-if="!isActive">
      <slot name="image"></slot>
    </div>
    <div class="TabBarItems_active_image" v-else>
      <slot name="active_image"></slot>
    </div>
    <div class="TabBarItems_txt" :style="txtStyle">
      <slot name="txt"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItemsCPN",
  data() {
    return {};
  },
  props: {
    path: { type: String, default: "" },
    activeStyle: { type: String, default: "red" },
    defaultStyle: { type: String, default: "black" }
  },
  methods: {
    jumpRouter() {
      this.$router.replace(this.path).catch(err => err);
    }
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
    txtStyle() {
      return this.isActive
        ? { color: this.activeStyle }
        : { color: this.defaultStyle };
    }
  }
};
</script>
<style scoped>
.TabBarItems {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

img {
  width: 25px;
  height: 25px;
  margin-bottom: -5px;
}
.TabBarItems_txt {
  text-align: center;
  font-size: var(--font-size);
}
</style>
