<template>
  <div id="Home">
    <nav-bar />
    <tab-control
      ref="before_tabControl"
      @setActive="tab_setActive"
      class="before_tabControl"
      v-show="coverTabControl"
    />
    <scroll
      :probeType="3"
      :pullUpLoad="true"
      ref="scroll"
      @onScroll="onScroll"
      @pullingUp="pullingUp"
    >
      <swiper /><recommend :data="recommends" /><feature />
      <tab-control ref="tabControl" @setActive="tab_setActive" />
      <goods :List="CurrentGoodList" />
    </scroll>
    <back-top @click.native="backtop" v-show="backtopIsShow" />
  </div>
</template>
<script>
import NavBar from "./HomeNavBar.vue";
import Swiper from "./HomeSwiper.vue";
import Recommend from "./HomeRecommend.vue";
import Feature from "./HomeFeature.vue";
import TabControl from "./HomeTabControl.vue";

import { swiperReq } from "network/homeReq/swiperReq.js";
import { goodsReq } from "network/homeReq/goodsReq.js";

import Goods from "components/content/goods/Goods.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import { DeBounce } from "@/common/utils.js";
import { backTop } from "@/common/mixins.js";

export default {
  name: "HomeCPN",
  data() {
    return {
      recommends: [],
      Request: undefined,
      goodsType: ["pop", "new", "sell"],
      CurrentTitleIndex: 0,
      goods: {
        pop: { page: 0, list: [], scrollY: 0 },
        new: { page: 0, list: [], scrollY: 0 },
        sell: { page: 0, list: [], scrollY: 0 }
      },
      tabControlTop: undefined,
      coverTabControl: false,
      DeBounce: undefined,
      positionY: 0
    };
  },
  mixins: [backTop],
  components: {
    NavBar,
    Swiper,
    Recommend,
    Feature,
    TabControl,
    Goods,
    Scroll
  },
  created() {
    //网络请求
    // this.Request=Promise.all([
    //   this.swiperReq(),
    //   this.goodsReq(val, this.goods[val].page);
    // ]);
    let AllRequest = [];
    AllRequest.push(this.swiperReq());
    this.goodsType.forEach(val => {
      AllRequest.push(this.goodsReq(val, this.goods[val].page));
    });
    this.Request = Promise.all(AllRequest);
  },
  mounted() {
    /*请求完毕的事件处理*/
    this.Request.then(result => {
      this.tabControlTop = this.$refs["tabControl"].$el.offsetTop;
      // 赋予tabControl中各个tab的scrollY初始值;
      for (let key in this.goods) {
        this.goods[key].scrollY = -this.tabControlTop;
      }
    });
  },
  methods: {
    /*
      网络请求method
    */
    swiperReq() {
      return swiperReq().then(result => {
        this.recommends = result.recommend.list;
        return result;
      });
    },
    goodsReq(type, page) {
      ++page;
      return goodsReq(type, page).then(result => {
        this.goods[type].list.push(...result.list);
        console.log(result);
        return result;
      });
    },
    tab_setActive(index) {
      //刷新height
      this.$refs["scroll"].refresh();

      //在更新index前，保存即将离开tab的scrollY
      //如果当前滚动的距离（逻辑）小于初始值，则还设置为初始值
      let before_scrollY =
        this.$refs["scroll"].BScroll.y > -this.tabControlTop
          ? -this.tabControlTop
          : this.$refs["scroll"].BScroll.y;
      let before_goodsType = this.goodsType[this.CurrentTitleIndex];
      this.goods[before_goodsType].scrollY = before_scrollY;
      //更新index
      this.CurrentTitleIndex = index;
      //两个tabControl组件保持一致。
      this.$refs["tabControl"].$refs["tabControl"].CurrentI = index;
      this.$refs["before_tabControl"].$refs["tabControl"].CurrentI = index;
      //滚动到目标tab的scrollY
      let goodsType = this.goodsType[this.CurrentTitleIndex];
      let scrollY = this.goods[goodsType].scrollY;
      this.$refs["scroll"].scrollTo(0, scrollY);
    },

    //监听滚动
    onScroll(position) {
      this.coverTabControl =
        Math.abs(position.y) >= this.tabControlTop ? true : false;
      this.backtopIsShow = Math.abs(position.y) >= 1200 ? true : false;
    },
    //上拉加载更多
    pullingUp() {
      let type = this.goodsType[this.CurrentTitleIndex];
      let page = ++this.goods[type].page;
      this.goodsReq(type, page).then(result => {
        this.$refs["scroll"].BScroll.finishPullUp();
        return result;
      });
    }
  },
  computed: {
    //返回当前GoodList
    CurrentGoodList() {
      let type = this.goodsType[this.CurrentTitleIndex];
      let data = this.goods[type].list;
      return data;
    }
  },
  activated() {
    /*
      imageload事件防抖
    */

    this.DeBounce = DeBounce(() => {
      console.log("refresh");
      this.$refs["scroll"].refresh("Home_ImageLoad");
    });
    console.log("进入Home");
    this.$bus.$on("goodsImageLoad", this.DeBounce);

    //回到离开前的位置
    this.$refs["scroll"].scrollTo(0, this.positionY, 4);
    // this.$refs["scroll"].refresh();
  },
  deactivated() {
    console.log("离开Home");
    //移除事件总线监听
    this.$bus.$off("goodsImageLoad", this.DeBounce);
    //保存当前位置
    this.positionY = this.$refs["scroll"].BScroll.y;
  }
};
</script>
<style scoped>
#Home {
  width: 100%;
  height: calc(100% - 49px);
  background-color: var(--color-background);
  position: relative;
}
.before_tabControl {
  position: fixed;
  top: 30px;
  z-index: 1;
}
.Scroll {
  height: calc(100% - 30px);
}
.Goods {
  background-color: #eee;
}
</style>
