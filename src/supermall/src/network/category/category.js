import { instance } from "../request.js";

function categoryReq() {
  return instance({
    method: "get",
    url: "/category"
  }).then(result => result.data.category);
}

function getSubCategory(maitKey) {
  return instance({
    method: "get",
    url: `/subcategory`,
    params: {
      maitKey
    }
  }).then(result => result.data);
}
export { categoryReq, getSubCategory };
