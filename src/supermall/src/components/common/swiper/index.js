export default class Swiper {
  constructor(preset) {
    this.preset = preset;
    /*
      获取preset
    */
    //dom
    this.wrapper = document.querySelector(preset.wrapper);
    this.content = document.querySelector(preset.content);
    this.iconsBox = document.querySelector(preset.iconsBox);
    this.ImageLinks = document.querySelectorAll(preset.ImageLinks);
    this.images = document.querySelectorAll(preset.images);
    this.iconsClass = preset.iconsClass;
    this.icons_A_Class = preset.icons_A_Class;
    this.icons = undefined;
    //其它数据
    this.transitionT = preset.transitionT;
    this.interval = preset.interval;
    this.percent = preset.percent;

    /*
      操作需要
    */
    this.imageW = parseFloat(this.ImageLinks[0].style.width);
    this.timer = undefined;
    this.CurrentI = 1;

    this.oldX = undefined;
    this.newX = undefined;
    this.X = undefined;
    this.Move = undefined;
    this.run();
  }
  run() {
    this.CreateIcons();
    this.CloneNode();
    this.autoSwiper();
    this.handControll();
  }
  CreateIcons() {
    this.images.forEach(_ => {
      let iocn = document.createElement("div");
      iocn.classList.add(this.iconsClass);
      this.iconsBox.append(iocn);
    });
    this.icons = this.iconsBox.querySelectorAll(`.${this.iconsClass}`);
    this.icons[0].classList.add(this.icons_A_Class);
  }
  IconsActive() {
    this.icons.forEach(v => {
      v.classList.remove(this.icons_A_Class);
    });
    if (this.CurrentI === 0) {
      this.icons[this.icons.length - 1].classList.add(this.icons_A_Class);
    } else if (this.CurrentI >= this.images.length - 1) {
      this.icons[0].classList.add(this.icons_A_Class);
    } else {
      this.icons[this.CurrentI - 1].classList.add(this.icons_A_Class);
    }
  }
  CloneNode() {
    let firstDom = this.ImageLinks[this.ImageLinks.length - 1].cloneNode(true);
    let lastDom = this.ImageLinks[0].cloneNode(true);
    this.content.prepend(firstDom);
    this.content.append(lastDom);

    this.translateX(-this.imageW);
    //由于ImageLinks、images都发生了改变，所以需要重新赋值
    this.ImageLinks = document.querySelectorAll(this.preset.ImageLinks);
    this.images = document.querySelectorAll(this.preset.images);
  }
  autoSwiper() {
    //赋予过度效果
    this.content.style.transition = this.transitionT;
    this.timer = setInterval(() => {
      this.leftSlip();
    }, this.interval);
  }
  /*
    左滑动操作
  */
  leftSlip() {
    this.CurrentI++;

    if (this.CurrentI === this.ImageLinks.length) {
      this.switchFirst().then(_ => {
        this.CurrentI++;
        this.IconsActive();

        this.changeTransition(this.transitionT);
        this.translateX(-this.imageW * this.CurrentI);
        this.autoSwiper();
      });
    } else {
      this.IconsActive();
      this.translateX(-this.imageW * this.CurrentI);
    }
  }
  /*
    切换最后一个或第一个dom
  */
  switchFirst() {
    return new Promise((resolve, reject) => {
      clearInterval(this.timer);
      this.CurrentI = 1;
      this.changeTransition("none");
      this.translateX(-this.imageW * this.CurrentI);

      // 频繁改变过度时间，会发现没有效果，js代码执行比过渡时间改变要快，即便使用promise还是无效。。这里使用宏任务对状态的改变进行延时
      setTimeout(() => {
        resolve("fulfilled");
      });
    });
  }
  switchLast() {
    return new Promise((resolve, reject) => {
      clearInterval(this.timer);
      this.CurrentI = this.images.length - 2;
      this.changeTransition("none");
      this.translateX(-this.imageW * this.CurrentI);

      // 频繁改变过度时间，会发现没有效果，js代码执行比过渡时间改变要快，即便使用promise还是无效。。这里使用宏任务对状态的改变进行延时
      setTimeout(() => {
        resolve("fulfilled");
      });
    });
  }
  translateX(x) {
    this.content.style.transform = `translateX(${x}px)`;
  }
  changeTransition(value) {
    this.content.style.transition = value;
  }
  /*
    手动
  */
  handControll() {
    this.handEvent();
    this.wrapper.addEventListener("touchstart", e => {
      this.CurrentI == this.images.length - 1 && this.switchFirst();
      this.CurrentI == 0 && this.switchLast();

      this.changeTransition("none");
      this.oldX = e.touches[0].pageX;

      clearInterval(this.timer);
      this.wrapper.addEventListener("touchmove", this.Move);
    });
    this.wrapper.addEventListener("touchend", () => {
      this.wrapper.removeEventListener("touchmove", this.Move);
      this.changeTransition(this.transitionT);

      this.Correct(this.X);
      this.autoSwiper();
    });
  }
  /*
  
    记录手动的事件（需要移除的）
  */
  handEvent() {
    this.Move = e => {
      this.newX = e.touches[0].pageX;
      this.X = this.newX - this.oldX;
      let oldTranslate = -this.CurrentI * this.imageW;
      this.translateX(oldTranslate + this.X);
    };
  }
  /*
    矫正
  */
  Correct(value) {
    let ruler = this.imageW * this.percent;
    if (value > 0) {
      if (Math.abs(value) >= ruler) this.CurrentI--;
    } else if (value < 0) {
      if (Math.abs(value) >= ruler) this.CurrentI++;
    } else {
      return;
    }
    this.translateX(-this.imageW * this.CurrentI);
    console.log(this.CurrentI);
    this.IconsActive();
  }
}
