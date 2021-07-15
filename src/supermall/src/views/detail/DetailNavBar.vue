<template>
  <div class="DetailTabControl">
    <nav-bar>
      <template v-slot:left>
        <div class="left" @click="routeBack"><span>＜</span></div>
      </template>
      <template v-slot:center>
        <tab-control
          :titles="titles"
          activeClass="DetailTabControl_Active"
          @setActive="setActive"
          ref="tabControl"
        />
      </template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";

export default {
  name: "DetailTabControlCPN",
  data() {
    return { titles: ["商品", "参数", "评论", "推荐"] };
  },
  components: { TabControl, NavBar },
  methods: {
    routeBack() {
      this.$router.back();
    },
    setActive(index) {
      this.$emit("setActive", index);
    }
  }
};
</script>
<style scoped>
.DetailTabControl {
  width: 100%;
  height: 30px;
  background-color: var(--color-tint);
  box-shadow: 0px 1px 5px #ccc;
}
/* navBar */
.NavBar {
  grid-template-columns: 15% 70% 15%;
}
.left {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #eee;
}
/* tabControl */
.items {
  background-color: var(--color-tint);
}
/*
  在父组件中，不能够直接设置子组件中的【子标签】样式，若要打破这个规则，有两个方式
  1. 把style标签中的scope属性去掉，但是这样有很大的风险，会影响全局样式
  2. 【css深度选择器 >>> 】
        如果是有些像Sass、less之类的预处理器无法正确解析 >>> 。
        这种情况下可以使用 /deep/ 操作符取而代之，这是一个 >>> 的别名
*/
.DetailTabControl {
  font-size: 13.5px;
}
.DetailTabControl >>> .DetailTabControl_Active > span {
  color: var(--color-background);
  border-bottom: 2.3px solid var(--color-background);
  border-radius: 5px;
}
</style>
