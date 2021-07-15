<template>
  <div class="TabControl" v-if="titles.length !== 0">
    <div
      class="items"
      v-for="(item, index) in titles"
      @click="setActive(index)"
      :class="{ [activeClass]: CurrentI === index }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControlCPN",
  data() {
    return { CurrentI: 0 };
  },
  props: {
    titles: {
      type: Array,
      default: () => []
    },
    activeClass: {
      type: String,
      default: "TabControl_Active"
    }
  },
  methods: {
    setActive(index) {
      this.CurrentI = index;
      this.$emit("setActive", index);
    }
  }
};
</script>
<style scoped>
.TabControl {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.items {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.items > span {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.TabControl_Active > span {
  color: var(--color-high-text);
  border-bottom: 2.3px solid var(--color-high-text);
}
</style>
