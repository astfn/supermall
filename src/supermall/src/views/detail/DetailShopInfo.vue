<template>
  <div class="DetailShopInfo" v-if="Object.keys(data).length !== 0">
    <div class="ShopInfo_top">
      <div class="shop_logo"><img :src="data.logo" /></div>
      <span class="shop_name">{{ data.name }}</span>
    </div>
    <div class="ShopInfo_middle">
      <div class="middle_left">
        <div class="left_sells">
          <p>{{ data.sells }}</p>
          <p>总销量</p>
        </div>
        <div class="left_goodsCount">
          <p>{{ data.goodsCount }}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="middle_center"></div>
      <div class="middle_right">
        <table>
          <tr v-for="item in data.score">
            <td>{{ item.name }}</td>
            <td :class="{ high: item.isBetter, low: !item.isBetter }">
              {{ item.score }}
            </td>
            <td>
              <span :class="{ high: item.isBetter, low: !item.isBetter }">{{
                item.isBetter ? "高" : "低"
              }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="ShopInfo_bottom">
      <p>进店逛逛</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailShopInfoCPN",
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {}
};
</script>
<style scoped>
.DetailShopInfo {
  width: 100%;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  padding: 10px 10px 13px 10px;
  text-align: left;
  border-bottom: 5px solid #ddd;
}
.ShopInfo_top {
  width: 100%;
  display: flex;
  align-items: center;
}
.shop_logo {
  margin-right: 8px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.shop_logo > img {
  height: 100%;
}
.ShopInfo_middle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.middle_left {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.middle_center {
  width: 5px;
  border-radius: 50%;
  background-color: #ddd;
}
.middle_right {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.middle_right > table {
  font-size: 13px;
}
.middle_right > table td {
  padding: 3px;
}
td.low {
  color: #1abc9c;
}
td.high {
  color: red;
}
span.low,
span.high {
  border-radius: 3px;
  padding: 2px 2px;
}
span.low {
  color: rgba(255, 255, 255, 0.8);
  background-color: #1abc9c;
}
span.high {
  color: rgba(255, 255, 255, 0.8);
  background-color: red;
}
.ShopInfo_bottom {
  width: 100%;
  min-height: 45px;
  position: relative;
}
.ShopInfo_bottom > p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 70%;
  height: 65%;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  background-color: var(--color-high-text);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
