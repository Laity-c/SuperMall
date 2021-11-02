import { login } from "./request";
export function getShopGoods(userid) {
  return login({
    url: "/commodity",
    method: "get",
    params: {
      userid,
    },
  });
}
