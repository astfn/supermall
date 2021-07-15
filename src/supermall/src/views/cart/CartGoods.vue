<template>
  <div class="CartGoods" v-if="Object.keys(data).length !== 0">
    <div
      class="GoodsBtn"
      :class="{
        select_goods_s: !$store.getters.mode_IsAdmin && data.isSelect,
        select_goods_d: $store.getters.mode_IsAdmin && data.isSelect
      }"
      @click="select"
    >
      <strong></strong>
    </div>

    <div class="left">
      <img :src="data.image" />
    </div>
    <div class="right">
      <div class="desc">
        <p>{{ data.desc }}</p>
      </div>
      <div class="params">
        <span>{{ data.size + " " + data.style }} </span>
      </div>
      <div class="p_and_n">
        <span>{{ data.price | showPrice }}</span>
        <div class="Counter">
          <i class="addBtn" @click="add">+</i
          ><span class="sum">{{ data.num }}</span
          ><i class="subBtn" @click="sub">-</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CartGoodsCPN",
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    add() {
      this.data.num++;
    },
    sub() {
      this.data.num = this.data.num > 1 ? this.data.num - 1 : this.data.num;
    },
    select() {
      this.data.isSelect = !this.data.isSelect;
      this.$emit("select_goods", this.data.isSelect);
    }
  },
  filters: {
    showPrice(price) {
      return `￥${(price / 100).toFixed(2)}`;
    }
  }
};
</script>
<style scoped>
.CartGoods {
  width: 100%;
  display: flex;
  margin: 12px auto;
}

.GoodsBtn {
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.GoodsBtn > strong {
  width: 12px;
  height: 12px;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: relative;
}
.left {
  width: 90px;
  height: 100px;
  overflow: hidden;
  background-color: #eee;
}
.left > img {
  height: 100%;
}
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 5px;

  /* background-color: #eee; */
}
.right > div {
  flex: 1;
}
.desc > p {
  width: 100%;
  font-size: 13px;
  line-height: 1.5em;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: left;
}
.params {
  align-self: flex-start;
}
.params > span {
  font-size: 13px;
  padding: 1px 5px;
  text-align: center;
  border-radius: 3px;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  background-color: #eee;
  color: rgba(0, 0, 0, 0.5);
}
/* .params span:nth-of-type(1) {
}
.params span:nth-of-type(1) {
} */
.p_and_n {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.p_and_n > span {
  font-size: 18px;
  font-weight: bold;
  color: var(--color-high-text);
}
.Counter {
  height: 25px;
  display: flex;
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
.select_goods_d > strong::after,
.select_goods_s > strong::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  border-radius: 50%;
}
.select_goods_d > strong::after {
  background-color: #e17055;
}
.select_goods_s > strong::after {
  background-color: red;
}
</style>
