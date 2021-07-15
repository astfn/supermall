import { instance } from "network/request.js";

function goodsReq(type, page) {
  return instance({
    method: "get",
    url: "home/data",
    params: {
      type,
      page
    }
  }).then(result => result.data); 
}

export { goodsReq };
