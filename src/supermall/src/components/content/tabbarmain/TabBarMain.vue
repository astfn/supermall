<template>
  <div class="TabBarMain">
    <tab-bar>
      <template v-slot:TabBar>
        <tab-bar-items path="/home" activeStyle="var(--color-high-text)">
          <template v-slot:image
            ><img src="~assets/images/tabbar/home.svg"
          /></template>
          <template v-slot:active_image
            ><img src="~assets/images/tabbar/home_active.svg"
          /></template>
          <template v-slot:txt><p>首页</p> </template>
        </tab-bar-items>
        <tab-bar-items path="/category" activeStyle="var(--color-high-text)">
          <template v-slot:image
            ><img src="~assets/images/tabbar/category.svg"
          /></template>
          <template v-slot:active_image
            ><img src="~assets/images/tabbar/category_active.svg"
          /></template>
          <template v-slot:txt><p>分类</p> </template>
        </tab-bar-items>
        <tab-bar-items path="/cart" activeStyle="var(--color-high-text)">
          <template v-slot:image
            ><img src="~assets/images/tabbar/cart.svg"
          /></template>
          <template v-slot:active_image
            ><img src="~assets/images/tabbar/cart_active.svg"
          /></template>
          <template v-slot:txt><p>购物车</p> </template>
        </tab-bar-items>
        <tab-bar-items path="/profile" activeStyle="var(--color-high-text)">
          <template v-slot:image
            ><img src="~assets/images/tabbar/profile.svg"
          /></template>
          <template v-slot:active_image
            ><img src="~assets/images/tabbar/profile_active.svg"
          /></template>
          <template v-slot:txt><p>我的</p> </template>
        </tab-bar-items>
      </template>
    </tab-bar>
  </div>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItems from "components/common/tabbar/TabBarItems.vue";

export default {
  name: "TabBarMainCPN",

  data() {
    return {};
  },
  components: { TabBar, TabBarItems }
};
</script>

<style scoped>
.TabBarMain {
  width: 100%;
  height: 49px;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  left: 0px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0px 3px 5px black;
}
</style>
