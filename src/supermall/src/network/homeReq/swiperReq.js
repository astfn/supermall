import { instance } from "network/request.js";
import Swiper from "components/common/swiper/index.js";

let head = "Home_Swiper";
let preset = {
  wrapper: `.${head}`,
  content: `.${head}_content`,
  iconsBox: `.${head}_iconsBox`,
  iconsClass: `${head}_icons`,
  icons_A_Class: `${head}_active`,
  ImageLinks: `.${head}_ImageLinks`,
  images: `.${head}_images`,
  transitionT: ".5s",
  interval: "2000",
  percent: 0.2
};

function swiperReq() {
  return instance({
    url: "/home/multidata",
    method: "get"
  })
    .then(result => result.data)
    .then(data => {
      createDom(data);
      return data;
    })
    .then(data => {
      new Swiper(preset);
      return data;
    })
    .catch(err => console.log(err));
}

function createDom(data) {
  let list = data.banner.list;
  let wrapper = document.querySelector(preset.wrapper);

  //数据渲染
  let content = document.querySelector(preset.content);
  list.forEach(v => {
    let ImageLink = document.createElement("a");
    let img = document.createElement("img");
    //处理ImageLink
    ImageLink.classList.add(preset.ImageLinks.replace(".", ""));
    ImageLink.href = v.link;
    //处理Images
    let viewPortWidth = window.getComputedStyle(wrapper).width;
    ImageLink.style.width = viewPortWidth;
    img.style.width = viewPortWidth;
    img.classList.add(preset.images.replace(".", ""));
    img.src = v.image;
    //结构
    ImageLink.append(img);
    content.append(ImageLink);
  });
  return preset;
}

export { swiperReq, createDom };
