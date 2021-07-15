<template>
  <div class="DetailCommentInfo" v-if="Object.keys(data).length !== 0">
    <div class="top">
      <span>用户评价</span><sup>({{ data.cRate }})</sup>
      <span>更多＞</span>
    </div>
    <div class="content" v-if="data.cRate">
      <div class="user">
        <div class="userLogo">
          <img :src="data.list[0].user.avatar" />
        </div>
        <span class="u_name">{{ data.list[0].user.uname }}</span>
      </div>
      <div class="desc">
        <p class="p_params">
          <span class="date">{{ data.list[0].created | getDate }}</span
          >{{ data.list[0].style }}
        </p>
        <p class="p_txt">{{ data.list[0].content }}</p>
        <div class="desc_images">
          <div class="imageBox" v-for="img in data.list[0].images">
            <img :src="img" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <p>暂时没有评论🧐</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailCommentInfoCPN",
  data() {
    return {};
  },
  props: {
    data: { type: Object, default: () => {} }
  },
  watch: {
    data() {
      console.log(this.data);
    }
  },
  filters: {
    getDate(time) {
      let date = new Date(time * 1000);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      let dateArr = [year, month, day];
      return `${dateArr.join("-")} `;
    }
  }
};
</script>
<style scoped>
.DetailCommentInfo {
  padding: 10px 10px 20px 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
  border-bottom: 5px solid #ddd;
}
.DetailCommentInfo > div {
  width: 100%;
}
.top {
  position: relative;
  border-bottom: 1px solid #ddd;
}
.top > span {
  display: inline-block;
  padding: 6px 0px;
}
.top > span:nth-of-type(2) {
  position: absolute;
  right: 0px;
}
.content {
  display: flex;
  flex-direction: column;
}
.content > div {
  width: 100%;
}
.user {
  display: flex;
  align-items: center;
  padding: 7px 0px;
}
.userLogo {
  width: 35px;
  height: 35px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.userLogo > img {
  height: 100%;
}
.u_name {
  font-size: 13px;
  margin-left: 5px;
}
.desc {
  display: flex;
  flex-direction: column;
}
.p_params {
  font-size: 12px;
  color: #aaa;
}
.p_txt {
  font-size: 14px;
  padding: 5px 0px;
  text-align: left;
}
.desc_images {
  display: flex;
}
.desc_images > .imageBox {
  border-radius: 3px;
  width: 80px;
  height: 110px;
  margin-right: 3px;
  overflow: hidden;
  background-color: #eee;
  position: relative;
}
.imageBox > img {
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.empty {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
