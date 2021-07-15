<template>
  <div id="Profile">
    <login-in v-if="!isLogin" />
  </div>
</template>
<script>
import LoginIn from "./LoginIn.vue";
export default {
  name: "ProfileCPN",
  data() {
    return { isLogin: false };
  },
  components: { LoginIn }
};
</script>
<style scoped>
#Profile {
  width: 100%;
  height: calc(100% - 49px);
}
</style>
