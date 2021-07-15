<template>
  <div id="Category">
    <nav-bar />
    <category-content
      :titleList="titleList"
      :SubCategoryData="SubCategoryData"
      :FirstSubCategory="FirstSubCategory"
    />
  </div>
</template>
<script>
import { categoryReq, getSubCategory } from "network/category/category.js";
import NavBar from "./CategoryNavBarMain.vue";
import CategoryContent from "./CategoryContent.vue";
export default {
  name: "CategoryCPN",
  data() {
    return {
      categoryData: {},
      SubCategoryData: [],
      titleList: [],
      FirstSubCategory: {}
    };
  },
  components: { NavBar, CategoryContent },
  created() {
    categoryReq()
      .then(data => {
        this.categoryData = data;
        this.titleList = data.list;
        data.list.map(val => {
          getSubCategory(val.maitKey).then(result => {
            if (result.info.title == this.titleList[0].title) {
              this.FirstSubCategory = result;
            }
            this.SubCategoryData.push(result);
          });
        });
        return data;
      })
      .then(data => {
        console.log(this.categoryData);
        console.log(this.SubCategoryData);
        setTimeout(() => {
          console.log(this.FirstSubCategory);
        }, 100);
      });
  }
};
</script>
<style scoped>
#Category {
  width: 100%;
  height: calc(100% - 49px);
}
</style>
