import { request } from "./request";

// 商品标题数据
export function getCategory() {
  return request({
    url: "/api/m5/category",
  });
}

// 商品数据
export function getSubcategory(maitKey) {
  return request({
    url: "/api/m5/subcategory",
    params: {
      maitKey,
    },
  });
}

// 推荐商品
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/api/m5/subcategory/detail",
    params: {
      miniWallkey,
      type,
    },
  });
}
