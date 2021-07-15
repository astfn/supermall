<template>
  <div
    class="SelectGoodParams"
    :class="{ show: isShow }"
    v-if="Object.keys(data).length != 0"
  >
    <div class="close"><span @click="close">×</span></div>

    <scroll ref="scroll">
      <div class="top">
        <div class="showImg">
          <img v-lazy="showData.topImg" @load="refresh" />
        </div>
        <span class="price">{{ showData.price }}</span>
      </div>
      <div class="params">
        <div class="goodsStyle">
          <span class="styleKey">{{ data.styleKey }}</span>
          <div class="hr"></div>
          <div class="Styles">
            <span
              class="Style_item"
              v-for="(val, key) in data.goodsTypes"
              @click="setStyleCI(val, key)"
              :class="{ active: key === CurrentData.styleCI }"
              >{{ val.type }}</span
            >
          </div>
        </div>
        <div class="goodsSize">
          <span class="sizeKey">{{ data.sizeKey }}</span>
          <div class="hr"></div>
          <div class="Sizes" v-if="CurrentData.styleCI !== -1">
            <span
              class="Size_item"
              v-for="(val, key) in data.goodsTypes[CurrentData.styleCI].goods"
              @click="setSizeCI(val, key)"
              :class="{ active: key === CurrentData.sizeCI }"
              >{{ val.size }}</span
            >
          </div>
        </div>
        <div class="bottom">
          <div class="hr"></div>
          <div class="bottom_content">
            <span>购买数量</span>
            <div class="Counter">
              <i class="addBtn" @click="add">+</i
              ><span class="sum">{{ sum }}</span
              ><i class="subBtn" @click="sub">-</i>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="confirm" @click="confirm">
      <p class="confirmBtn">
        {{ mode === "cart" ? "加入购物车" : "立即购买" }}
      </p>
    </div>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "SelectGoodParamsCPN",
  data() {
    return {
      showData: {},
      isShow: false,
      sum: 1,
      CurrentData: {
        styleCI: -1,
        sizeCI: -1,
        style: undefined,
        size: undefined,
        CurrentPrice: 99999
      },
      selectGoods: {}
    };
  },
  props: {
    mode: { type: String, default: "cart" },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: { Scroll },
  methods: {
    setStyleCI(val, index) {
      this.CurrentData.styleCI = index;
      let goods = val.goods[0];
      //重置size
      this.CurrentData.sizeCI = -1;
      this.CurrentData.size = undefined;
      //重置展示信息
      this.showData.topImg = goods.img;
      this.showData.price = this.data.basePrice;
      //重置当前选中的信息
      this.CurrentData.CurrentPrice = this.data.basePrice;
      this.CurrentData.style = goods.style;
      this.sum = 1;
      // console.log(goods);
      this.refresh();
    },
    setSizeCI(val, index) {
      //修改展示信息
      this.showData.price = `￥${(val.nowprice / 100).toFixed(2) * 1}`;
      this.sum = 1;
      //更改当前信息
      this.CurrentData.sizeCI = index;
      this.CurrentData.CurrentPrice = val.nowprice;
      this.CurrentData.size = val.size;
    },
    refresh() {
      this.$refs["scroll"].refresh();
    },
    add() {
      this.sum++;
    },
    sub() {
      this.sum = this.sum > 1 ? this.sum - 1 : this.sum;
    },
    confirm() {
      if (this.CurrentData.styleCI !== -1 && this.CurrentData.sizeCI !== -1) {
        if (this.mode === "cart") {
          this.selectGoods = {
            //店家相关
            shopName: this.data.ShopInfoData.name,
            shopLogo: this.data.ShopInfoData.logo,
            //商品相关
            image: this.showData.topImg,
            price: this.CurrentData.CurrentPrice,
            desc: this.data.BaseInfoData.desc,
            style: this.CurrentData.style,
            size: this.CurrentData.size,
            num: this.sum,
            isSelect: false
          };
          this.$store.dispatch("addCart", this.selectGoods).then(result => {
            this.$toast.show(result);
          });
        } else {
          this.$toast.show("立即购买");
        }
      } else {
        this.$toast.show("请选择类型及尺寸");
      }
    },
    close() {
      this.isShow = false;
      console.log(this.isShow);
    }
  },
  watch: {
    data() {
      this.showData.topImg = this.data.showImg;
      this.showData.price = this.data.basePrice;
      console.log(this.data);
    }
  }
};
</script>
<style scoped>
.SelectGoodParams {
  position: absolute;
  bottom: 49px;
  left: 0px;
  width: 100%;
  height: 320px;
  background-color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  box-shadow: 0px -2px 5px #aaa;
  transition: all 0.3s;
  transform-origin: bottom center;
  transform: scale(0);
  display: flex;
  flex-direction: column;
  overflow: scroll;
  z-index: 1;
}
.close {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 2;
}
.close > span {
  font-size: 20px;
  text-align: center;
  padding: 0px 8px;
}
.Scroll {
  /* height: calc(100% - 35px); */
  height: calc(100%);
  padding: 8px 5px;
}
.show {
  transform: scale(1);
}
.top {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 0px 10px 0px;
}
.showImg {
  width: 80px;
  height: 110px;
  overflow: hidden;
  border-radius: 6px;
  background-color: #eee;
}
.showImg > img {
  height: 100%;
  margin: 0 auto;
}
.price {
  font-weight: bold;
  color: var(--color-high-text);
  align-self: flex-start;
  margin: 7px 0px 0px 7px;
  font-size: 20px;
}
.params {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.goodsSize,
.goodsStyle {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.goodsSize > .sizeKey,
.goodsStyle > .styleKey {
  align-self: flex-start;
}
.hr {
  width: 100%;
  height: 1px;
  box-shadow: 0px 1px #ccc;
  margin: 5px 0px 8px 0px;
}
.Styles,
.Sizes {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.Style_item,
.Size_item {
  display: inline-block;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid #ddd;
  background-color: #eee;
  padding: 2px 5px;
  border-radius: 6px;
  margin: 5px;
}
.active {
  color: red;
  background-color: rgba(255, 128, 151, 0.1);
  border: 1px solid var(--color-tint);
}
.confirm {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
  position: absolute;
  bottom: 0px;
}
.confirmBtn {
  width: 80%;
  height: 25px;
  line-height: 25px;
  font-size: 17px;
  font-weight: bold;
  background-color: rgba(234, 32, 39, 0.9);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
}
.bottom {
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.bottom_content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Counter {
  height: 25px;
}
.addBtn,
.subBtn {
  display: inline-block;
  width: 25px;
  height: 100%;
  line-height: 25px;
  text-align: center;
  border-radius: 1px;
  color: #fff;
  background-color: #ddd;
}
.sum {
  display: inline-block;
  width: 32px;
  height: 100%;
  background-color: #ccc;
  margin: 0px 1px;
  border-radius: 2px;
}
</style>
