import {
  ADD_COUNT,
  ADD_CART,
  ADD_CLICK,
  SUB_CLICK,
  ROMM_CLICK,
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
};
