<template>
  <div class="CategoryNavBarMain">
    <nav-bar>
      <template v-slot:center>
        <label>🔍<input type="search"/></label>
      </template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "CPN",
  data() {
    return {};
  },
  components: { NavBar }
};
</script>
<style scoped>
.CategoryNavBarMain {
  width: 100%;
  height: 30px;
  background-color: var(--color-tint);
}
.CategoryNavBarMain >>> .NavBar_center {
  display: flex;
  overflow: hidden;
}
.NavBar_center label {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.NavBar_center label > input {
  width: 80%;
  height: 75%;
  margin-left: 2px;
  font-size: 12px;
  border: none;
  border-radius: 5px;
}
</style>
