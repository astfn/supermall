<template>
  <div class="BackTop"><img src="~assets/images/common/top.png" /></div>
</template>
<script>
export default {
  name: "BackTopCPN",
  data() {
    return {};
  },
  components: {}
};
</script>
<style scoped>
.BackTop {
  width: 45px;
  position: fixed;
  bottom: 45px;
  right: 5px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.BackTop > img {
  width: 100%;
  object-fit: cover;
}
</style>
