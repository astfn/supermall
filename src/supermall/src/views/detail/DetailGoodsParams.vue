<template>
  <div class="DetailGoodsParams" v-if="Object.keys(data).length !== 0">
    <div class="ruleData">
      <p>{{ data.rule.key }}</p>
      <ul v-for="item in ruleTable[0]">
        <li v-for="val in item">{{ val }}</li>
      </ul>
    </div>
    <div class="infoData">
      <p>{{ data.info.key }}</p>
      <ul v-for="item in data.info.set">
        <li v-for="val in item">{{ val }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsParamsCPN",
  data() {
    return { ruleTable: [] };
  },
  props: {
    data: { type: Object, default: () => {} }
  },
  components: {},
  watch: {
    data() {
      // console.log(this.data);
      if (Object.keys(this.data).length !== 0) {
        //去掉其它table的第一个元素（描述文字）
        this.data.rule.tables.forEach((value, index) => {
          if (index === 0) {
            this.ruleTable = value;
          } else {
            value.forEach(val => val.splice(0, 1));
          }
        });
        //处理格式后，赋给this.ruleTable
        this.data.rule.tables.forEach((value, index, arr) => {
          if (index > 0) {
            value.forEach((val, key) => {
              val.map(v => {
                arr[0][key].push(v);
              });
            });
          }
        });
      }
      this.ruleTable = this.data.rule.tables;
      // console.log(this.ruleTable);
    }
  }
};
</script>
<style scoped>
.DetailGoodsParams {
  padding: 10px 10px 20px 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: pink; */
  text-align: left;
  border-bottom: 5px solid #ddd;
}
.ruleData,
.infoData {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ruleData > p,
.infoData > p {
  font-size: 17px;
  font-weight: bold;
  padding: 20px 0px 10px 0px;
  color: var(--color-high-text);
}
.ruleData > p {
  padding-top: 10px;
}
.ruleData > ul,
.infoData > ul {
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-top: 2px solid #eee;
}
.ruleData > ul:last-child,
.infoData > ul:last-child {
  border-bottom: 2px solid #eee;
}
.ruleData li {
  flex: 1;
  padding: 8px 5px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ruleData li:nth-of-type(1) {
  font-size: 16px;
  color: var(--color-tint);
}
.ruleData li:nth-of-type(n +) {
  max-width: 50px;
}
.infoData li {
  flex: 1;
  padding: 8px 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 27px;
}
.infoData li:nth-of-type(1) {
  padding-left: 0px;
  justify-content: center;
  max-width: 100px;
  font-size: 16px;
  color: var(--color-tint);
}
</style>
