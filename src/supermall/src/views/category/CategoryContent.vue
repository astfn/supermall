<template>
  <div
    class="CategoryContent"
    v-if="titleList.length !== 0 && SubCategoryData.length !== 0"
  >
    <div class="left">
      <scroll>
        <ul class="title_ul">
          <li
            class="title_li"
            v-for="(item, index) in titleList"
            @click="setActive(index)"
          >
            <span :class="{ active: CurrenI === index }">{{ item.title }}</span>
          </li>
        </ul>
      </scroll>
    </div>
    <div class="right">
      <scroll ref="scroll">
        <article class="list_in_title">
          <a
            class="items"
            v-if="Object.keys(CurrenSubCategoryData).length !== 0"
            v-for="(items, index) in CurrenSubCategoryData.list"
            :key="index"
            :href="items.link"
          >
            <div class="image">
              <img :src="items.image" @load="imageLoad" />
              <p>{{ items.title }}</p>
            </div>
          </a>
        </article>
      </scroll>
    </div>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "CategoryContentCPN",
  data() {
    return { CurrenI: 0, CurrenSubCategoryData: {} };
  },
  props: {
    titleList: {
      type: Array,
      default: () => []
    },
    SubCategoryData: {
      type: Array,
      default: () => []
    },
    FirstSubCategory: {
      type: Object,
      default: () => {}
    }
  },
  components: { Scroll },
  methods: {
    setActive(index) {
      this.CurrenI = index;
      this.CurrenSubCategoryData = this.SubCategoryData.find(
        v => v.info.title == this.titleList[this.CurrenI].title
      );
      this.$refs["scroll"].scrollTo(0, 0, 100);
    },
    imageLoad() {
      this.$refs["scroll"].refresh();
    }
  },
  watch: {
    FirstSubCategory() {
      this.CurrenSubCategoryData = this.FirstSubCategory;
    }
  }
};
</script>
<style scoped>
.CategoryContent {
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
}
.left {
  width: 22%;
  margin-right: 3px;
  box-shadow: 1.5px 0px 5px #eee;
  background-color: var(--color-background);
}
.right {
  flex: 1;
  background-color: var(--color-background);
  padding-bottom: 12px;
}
.Scroll {
  width: 100%;
  height: 100%;
}
.title_ul {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title_ul > li {
  font-size: 14px;
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title_ul > li span {
  display: inline-block;
  width: 90%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  border-right: 2px solid var(--color-tint);
  border-radius: 6px;
  box-shadow: 0px -7px 7px #fff, -7px 0px 7px #ffff, 7px 0px 10px #ccc,
    0px 3px 10px #ccc;
}
.list_in_title {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.items {
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  font-size: 14px;
}
.image {
  width: 90%;
}
.image > img {
  width: 100%;
  padding: 0px 4px;
}
</style>
