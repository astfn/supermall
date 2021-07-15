import { instance } from "network/request.js";
import Swiper from "components/common/swiper/index.js";

let head = "Detail_Swiper";
let preset = {
  wrapper: `.${head}Main`,
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

function detailReq(iid) {
  return instance({
    url: `/detail`,
    method: "get",
    params: { iid }
  })
    .then(result => result.result)
    .then(result => {
      createDom(result);
      new Swiper(preset);
      return result;
    });
}

function createDom(data) {
  let list = data.itemInfo.topImages;

  let wrapper = document.querySelector(preset.wrapper);
  //数据渲染
  let content = document.querySelector(preset.content);
  list.forEach(v => {
    let ImageLink = document.createElement("a");
    let img = document.createElement("img");
    //处理ImageLink
    ImageLink.classList.add(preset.ImageLinks.replace(".", ""));
    // ImageLink.href = v.link;
    //处理Images
    let viewPortWidth = window.getComputedStyle(wrapper).width;
    // content.style.width=
    ImageLink.style.width = viewPortWidth;
    img.style.width = viewPortWidth;
    img.classList.add(preset.images.replace(".", ""));
    img.src = v;
    //结构
    ImageLink.append(img);
    content.append(ImageLink);
  });
  return preset;
}

//Recommend
function getRecommend() {
  return instance({
    url: "/recommend",
    method: "get"
  });
}

// Detail所需要的数据结构

//商品的基本数据
class BaseInfoData {
  constructor(itemInfo, columns, shopInfo_Services) {
    //描述信息
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    //价格相关
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
    //商品销量、收藏、发货时间
    this.columns = columns;
    //支持的服务:包邮、7天无理由…
    this.services = shopInfo_Services;
  }
}
// Detail中的商家相关信息
class ShopInfoData {
  constructor(shopInfo) {
    //商家名称
    this.name = shopInfo.name;
    //商家Logo
    this.logo = shopInfo.shopLogo;
    //商家评分相关
    this.score = shopInfo.score;
    //商品销售量
    this.sells = shopInfo.cSells;
    //粉丝数目
    this.fans = shopInfo.cFans;
    //商品总数
    this.goodsCount = shopInfo.cGoods;
  }
}

export { detailReq, BaseInfoData, ShopInfoData, getRecommend };
