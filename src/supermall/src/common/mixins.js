import BackTop from "components/common/backtop/BackTop.vue";

let backTop = {
  data() {
    return { backtopIsShow: false };
  },
  components: { BackTop },
  methods: {
    backtop() {
      this.$refs["scroll"].scrollTo(0, 0, 300);
    }
  }
};

export { backTop };
