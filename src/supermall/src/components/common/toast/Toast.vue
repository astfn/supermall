<template>
  <div class="Toast" :class="{ show: isShow }">
    <span class="text">{{ message }}</span>
  </div>
</template>
<script>
export default {
  name: "CPN",
  data() {
    return { message: "massage", isShow: false };
  },
  methods: {
    show(message) {
      this.message = message;
      this.isShow = true;
      this.$el.addEventListener("animationend", () => {
        this.isShow = false;
      });
    }
  }
};
</script>
<style scoped>
.Toast {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: -100;
  border-radius: 10px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.8);
}
.text {
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 10px;
  color: rgba(255, 255, 255, 0.9);
}
.show {
  animation: showBox 2s;
}
@keyframes showBox {
  from {
    z-index: 1;
  }
  50% {
    opacity: 1;
    z-index: 1;
  }
  to {
    opacity: 0;
    z-index: -100;
  }
}
</style>
