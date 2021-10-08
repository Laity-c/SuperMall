import { request } from "./request";

// 商品标题数据
export function getCategory() {
  return request({
    url: "/api/hy66/category",
  });
}

// 商品数据
export function getSubcategory(maitKey) {
  return request({
    url: "/api/hy66/subcategory",
    params: {
      maitKey,
    },
  });
}

// 推荐商品
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/api/hy66/subcategory/detail",
    params: {
      miniWallkey,
      type,
    },
  });
}
