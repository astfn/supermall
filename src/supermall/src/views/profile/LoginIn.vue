<template>
  <div id="LoginIn">
    <div class="top">
      <div class="circular">
        <img src="~assets/images/tabbar/profile.svg" />
      </div>
    </div>

    <div class="middle">
      <form>
        <label>账号: <input type="text" @input="setUserName" /> </label>
        <label>密码: <input type="password" @input="setUserPwd" /> </label>
        <button type="button" @click="Login">登录</button>
      </form>
    </div>
    <div class="bottom">
      <p>Login In</p>
      <div class="icons">
        <div class="icon" @click="QQ_API">
          <img src="~assets/images/profile/QQ.svg" />
        </div>
        <div class="icon" @click="WX_API">
          <img src="~assets/images/profile/weixin.svg" />
        </div>
        <div class="icon" @click="ZFB_API">
          <img src="~assets/images/profile/zhifupingtai-zhifubao.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginInCPN",
  data() {
    return { userName: "", userPwd: "" };
  },
  components: {},
  methods: {
    Login() {
      this.userName === "" && this.$toast.show("请填写账号");
      this.userPwd === "" && this.$toast.show("请填写密码");
      if (this.userName && this.userPwd) this.$toast.show("未开放登录接口");

      console.log(this.userName, this.userPwd);
    },
    setUserName(e) {
      this.userName = e.srcElement.value;
      console.log(this.userName);
    },
    setUserPwd(e) {
      this.userPwd = e.srcElement.value;
      console.log(this.userPwd);
    },
    QQ_API() {
      this.$toast.show("未开放登录接口");
    },
    WX_API() {
      this.$toast.show("未开放登录接口");
    },
    ZFB_API() {
      this.$toast.show("未开放登录接口");
    }
  }
};
</script>
<style scoped>
#LoginIn {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #ffcdcd;
  /* background-color: var(--color-shallow-text); */
}
.top {
  width: 100%;
  height: 33%;
  position: relative;
  overflow: hidden;
}
.circular {
  width: 150%;
  height: 150%;
  background-color: pink;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translateX(-50%);
}
.circular > img {
  width: 90px;
  border-radius: 50%;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px dotted #eee;
  padding: 8px;
}
.middle {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* background-color: pink; */
  border-radius: 10px;
  margin: 5px 0px 5px 0px;
}
form {
  margin-left: -27px;
  width: 100%;
  height: 43%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: -60px;
  /* background-color: var(--color-tint); */
  /* color: white; */
}
form > button {
  margin-left: 27px;
  border: none;
  padding: 3px 8px;
  border-radius: 3px;
  /* background-color: #ecf0f1; */
}
label {
  font-size: 16px;
}
label > input {
  height: 25px;
  width: 70%;
  border-radius: 4px;
  border: none;
}
.bottom {
  height: 18%;
  display: flex;
  flex-direction: column;
  background-color: pink;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
}
.bottom > p {
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  letter-spacing: 0.2rem;
}
.icons {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top-left-radius: 30%;
  border-top-right-radius: 30%;
  overflow: hidden;
  background-color: var(--color-tint);
}
.icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
}
.icon > img {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.icon:nth-of-type(1) {
  transform: scale(0.85);
}
.icon:nth-of-type(3) {
  transform: scale(1.3);
}
</style>
