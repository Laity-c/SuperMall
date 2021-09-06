import { request } from "./request";

export function getHomeMultidata() {
  return request({
    url: "/api/m5/home/multidata",
  });
}

// 请求推荐商品数据
export function getHomeGoods(type, page) {
  return request({
    url: "/api/m5/home/data",
    params: {
      type,
      page,
    },
  });
}
