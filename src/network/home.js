import { request } from "./request";

export function getHomeMultidata() {
  return request({
    url: "/api/hy66/home/multidata",
  });
}

// 请求推荐商品数据
export function getHomeGoods(type, page) {
  return request({
    url: "/api/hy66/home/data",
    params: {
      type,
      page,
    },
  });
}
