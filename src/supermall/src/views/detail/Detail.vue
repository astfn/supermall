<template>
  <div class="Detail">
    <detail-nav-bar @setActive="setActive" ref="navbar" />
    <scroll :probeType="3" ref="scroll" @onScroll="onScroll">
      <detail-swiper :topBcImg="topBcImg" @topImageLoad="topImageLoad" />
      <detail-base :data="BaseInfoData" />
      <detail-shop-info :data="ShopInfoData" />
      <detail-goods-info
        :data="goodsInfo"
        @GoodsInfoimageLoad="GoodsInfoimageLoad"
      />
      <detail-goods-params :data="goodsParams" ref="Goodparams" />
      <detail-comment-info :data="commentInfo" ref="Comment" />
      <detail-recommend :data="recommendData" ref="Recommend" />
      <!-- <h2>{{ $route.params.iid }}</h2> -->
    </scroll>
    <back-top @click.native="backtop" v-if="backtopIsShow" />
    <detail-bottom :data="shoppingParams" />
  </div>
</template>
<script>
import DetailNavBar from "./DetailNavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import DetailShopInfo from "./DetailShopInfo.vue";
import DetailGoodsInfo from "./DetailGoodsInfo.vue";
import DetailGoodsParams from "./DetailGoodsParams.vue";
import DetailCommentInfo from "./DetailCommentInfo.vue";
import DetailRecommend from "./DetailRecommend.vue";
import DetailBottom from "./detailbottom/DetailBottom.vue";

import {
  detailReq,
  BaseInfoData,
  ShopInfoData,
  getRecommend
} from "network/detailReq/detailReq.js";

import DetailSwiper from "./DetailSwiper.vue";
import DetailBase from "./DetailBase.vue";

import { DeBounce } from "@/common/utils.js";
import { backTop } from "@/common/mixins.js";

export default {
  name: "DetailCPN",
  data() {
    return {
      iid: undefined,
      detaiData: {},
      topBcImg: "",
      BaseInfoData: {},
      ShopInfoData: {},
      goodsInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommendData: {},
      DeBounceRefresh: undefined,
      CPNSoffsetTop: [0],
      goodsTypes: [],
      shoppingParams: {}
    };
  },
  mixins: [backTop],

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBase,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentInfo,
    DetailRecommend,
    DetailBottom
  },
  created() {
    this.iid = this.$route.params.iid;
    detailReq(this.iid).then(result => {
      this.detaiData = result;
      //顶部背景图片
      this.topBcImg = result.itemInfo.topImages[0];
      //收集数据结构
      this.BaseInfoData = new BaseInfoData(
        result.itemInfo,
        result.columns,
        result.shopInfo.services
      );
      //店家信息
      this.ShopInfoData = new ShopInfoData(result.shopInfo);
      // console.log(result);
      //详情图片，描述信息
      this.goodsInfo = result.detailInfo;
      //尺码参数
      this.goodsParams = result.itemParams;
      //卖家评论
      this.commentInfo = result.rate;
      /*
          shoppingSelect数据收集、操作
      */
      //收集样式分类
      let goodsTypes = [];
      result.skuInfo.props[0].list.map(v => {
        goodsTypes.push(v.name);
      });
      goodsTypes.map(val => {
        let similar = result.skuInfo.skus.filter(v => v.style === val);
        this.goodsTypes.push({
          type: val,
          goods: similar
        });
      });
      this.shoppingParams = {
        iid: this.iid,
        showImg: this.topBcImg,
        basePrice: this.BaseInfoData.newPrice,
        goodsTypes: this.goodsTypes,
        sizeKey: result.skuInfo.sizeKey,
        styleKey: result.skuInfo.styleKey,
        ShopInfoData: this.ShopInfoData,
        BaseInfoData: this.BaseInfoData
      };
      // console.log(this.shoppingParams);
      return result;
    });
    getRecommend().then(result => {
      this.recommendData = result.data;
      return result.data;
    });
  },
  mounted() {
    //赋予防抖函数
    this.DeBounceRefresh = DeBounce(() => {
      this.$refs["scroll"].refresh();
      //获取各个子组件的高度
      let cpns = ["Goodparams", "Comment", "Recommend"];
      cpns.map((val, index) => {
        //由于布局的缘故，所以获取top时候要加上顶部tabcontrol的高度
        this.CPNSoffsetTop[index + 1] = -this.$refs[val].$el.offsetTop + 30;
      });
    });
    //每次重新mounted，都重新监听事件总线的"goodsImageLoad"
    this.$bus.$on("goodsImageLoad", this.DeBounceRefresh);
  },
  destroyed() {
    //每次销毁（离开Detail组件时），都要移除对"goodsImageLoad"的监听
    this.$bus.$off("goodsImageLoad", this.DeBounceRefresh);
  },
  methods: {
    //refresh
    topImageLoad() {
      this.$refs["scroll"].refresh();
    },
    GoodsInfoimageLoad() {
      this.DeBounceRefresh();
    },
    setActive(index) {
      // console.log(this.CPNSoffsetTop[index]);
      this.$refs["scroll"].scrollTo(0, this.CPNSoffsetTop[index], 200);
    },
    onScroll(position) {
      this.backtopIsShow = Math.abs(position.y) >= 1200 ? true : false;
      this.CPNSoffsetTop.map((val, key) => {
        if (key < this.CPNSoffsetTop.length - 1) {
          position.y <= this.CPNSoffsetTop[key] &&
            position.y >= this.CPNSoffsetTop[key + 1] &&
            (this.$refs["navbar"].$refs["tabControl"].CurrentI = key);
        } else {
          position.y <= this.CPNSoffsetTop[key] &&
            (this.$refs["navbar"].$refs["tabControl"].CurrentI = key);
        }
      });
    }
  }
};
</script>
<style scoped>
.Detail {
  position: absolute;
  width: 100%;
  height: calc(100%);
  background-color: var(--color-background);
  z-index: 1;
}
.Scroll {
  height: calc(100vh - 30px - 49px);
}
</style>
