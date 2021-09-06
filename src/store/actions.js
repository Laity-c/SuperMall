import {
  ADD_COUNT,
  ADD_CART,
  ADD_CLICK,
  SUB_CLICK,
  ROMM_CLICK,
} from "./mutaions-types";
export default {
  addCarte(context, payload) {
    return new Promise((resolve, reject) => {
      // 判断是否同一个商品
      let olProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );

      // 如果是同一个商品，我们就让商品中的count属性加一
      // 如果不是同一个商品，我们就把这个商品追加到cartList数组中
      if (olProduct) {
        context.commit(ADD_COUNT, olProduct);
        resolve("商品数量加一");
      } else {
        payload.count = 1;
        context.commit(ADD_CART, payload);
        resolve("添加成功");
      }
    });
  },
  add(context, payload) {
    let product = context.state.cartList.find(item => item.iid === payload);
    context.commit(ADD_CLICK, product);
  },
  sub(context, payload) {
    let product = context.state.cartList.find(item => item.iid === payload);
    context.commit(SUB_CLICK, product);
  },
  romm(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit(ROMM_CLICK, payload);
      resolve("商品删除成功");
    });
  },
};
