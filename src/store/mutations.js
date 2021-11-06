import {
  ADD_COUNT,
  ADD_CART,
  ADD_CLICK,
  SUB_CLICK,
  ROMM_CLICK,
  CLEAR_CLICK,
  ROMM_CHECKED_CLICK,
  ADD_ORDER,
  ROMM_ORDER_CLICK,
  CLEAR_ORDER_CLICK,
} from "./mutaions-types";
export default {
  [ADD_COUNT](state, payload) {
    payload.count++;
  },
  [ADD_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  },
  [ADD_CLICK](state, payload) {
    console.log(payload.count);
    payload.count++;
  },
  [SUB_CLICK](state, payload) {
    payload.count--;
  },
  [ROMM_CLICK](state, payload) {
    state.cartList.splice(payload, 1);
    // console.log(payload);
  },
  [CLEAR_CLICK](state) {
    state.cartList = [];
  },
  [ROMM_CHECKED_CLICK](state, payload) {
    // console.log(payload);
    console.log(state.cartList[payload].checked);
    // state.cartList.forEach(item => {
    // state.cartList;
    if (state.cartList[payload].checked) {
      // console.log(state.cartList[payload]);
      // console.log(payload + "mutaitions");
      state.cartList.splice(payload, 1);
      // state.cartList.slice(payload, 1);
      // state.cartList[payload] = null;
    }
    // });
  },
  [ADD_ORDER](state, payload) {
    state.orderList.push(payload);
  },
  [ROMM_ORDER_CLICK](state, payload) {
    state.orderList.splice(payload, 1);
  },
  [CLEAR_ORDER_CLICK](state) {
    state.orderList = [];
  },
};
