export default {
  getcartList(state) {
    return state.cartList;
  },
  cartListLength(state) {
    return state.cartList.length;
  },
  getorderList(state) {
    return state.orderList;
  },
  getorderListLength(state) {
    return state.orderList.length;
  },
};
