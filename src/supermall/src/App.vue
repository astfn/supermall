<template>
  <div id="app">
    <keep-alive exclude="DetailCPN"><router-view /></keep-alive>
    <tab-bar-main />
  </div>
</template>

<script>
import TabBarMain from "components/content/tabbarmain/TabBarMain.vue";
export default {
  name: "App",
  components: { TabBarMain }
};
</script>

<style>
@import "~assets/css/base.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
