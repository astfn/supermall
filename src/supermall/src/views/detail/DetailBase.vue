<template>
  <div class="Detail_Base" v-if="Object.keys(data).length !== 0">
    <div class="descBox">
      <p>{{ data.title }}</p>
    </div>
    <div class="priceBox">
      <span class="newPrice">{{ data.newPrice }}</span
      ><span class="oldPrice">{{ data.oldPrice }}</span
      ><span class="discountDesc" v-if="data.discountDesc !== ''">{{
        data.discountDesc
      }}</span>
    </div>
    <div class="otherBox">
      <span v-for="val in data.columns">
        {{ val }}
      </span>
    </div>
    <div class="servicesBox">
      <div v-for="val in data.services" class="serveItems">
        <img :src="val.icon" />
        <span>{{ val.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Detail_BaseCPN",
  data() {
    return {};
  },
  props: {
    data: { type: Object, default: () => {} }
  },
  components: {}
};
</script>
<style scoped>
.Detail_Base {
  width: 100%;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  padding: 10px 10px 13px 10px;
  text-align: left;
  border-bottom: 5px solid #ddd;
}
.descBox {
  width: 100%;
}
.descBox > p {
  font-size: 16px;
  font-weight: bold;
}
.priceBox {
  width: 100%;
  margin-top: 10px;
  position: relative;
}
.newPrice {
  font-size: 20px;
  font-weight: bold;
  color: var(--color-high-text);
}
.oldPrice {
  margin-left: 4px;
  font-size: 12px;
  text-decoration: line-through;
  color: var(--color-text);
}
.discountDesc {
  margin-left: 1px;
  padding: 1px 3px;
  position: relative;
  top: -7px;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  background-color: var(--color-tint);
  border-radius: 13%;
}

.otherBox {
  margin-top: 12px;
  font-size: 14px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 3px solid #eee;
}
.servicesBox {
  margin-top: 13px;
  min-height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
}
.serveItems {
  display: flex;
  flex-direction: row;
}
.serveItems > img {
  width: 12px;
  object-fit: scale-down;
  align-self: flex-start;
}
</style>
