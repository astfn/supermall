<template>
  <div class="Scroll">
    <div class="scroll_wrapper" ref="wrapper">
      <div class="scroll_content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import BetterScroll from "better-scroll";
export default {
  name: "CPN",
  data() {
    return { BScroll: undefined };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  components: { BetterScroll },
  mounted() {
    this.newBScroll();
    this.BScroll.on("scroll", position => {
      this.$emit("onScroll", position);
    });
    this.pullUpLoad && this.pullingUp();
  },
  methods: {
    newBScroll() {
      this.BScroll = new BetterScroll(this.$refs["wrapper"], {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
    },
    pullingUp() {
      this.BScroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    },
    finishPullUp() {
      this.BScroll.finishPullUp();
    },
    scrollTo(x, y, time = 4) {
      this.BScroll.scrollTo(x, y, time);
    },
    refresh(message) {
      this.BScroll.refresh();
      message && console.log(message);
    }
  }
};
</script>
<style scoped>
.Scroll {
  width: 100%;
}
.scroll_wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scroll_content {
  width: 100%;
}
</style>
