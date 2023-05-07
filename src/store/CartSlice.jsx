import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cid: null,
  items: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    LOAD_CART: (state, action) => {
      const { items, cid } = action.payload;
      return { cid, items };
    },
    ADD_ITEM: (state, action) => {
      const { cartItem } = action.payload;
      let items = [...state.items, cartItem];
      return { ...state, items };
    },
    INCREASE_QUANTITY: (state, action) => {
      const { pid, color, stock } = action.payload;
      let item = state.items.find((e) => e.pid === pid && e.color === color);
      if (!item || item.quantity === stock - 1) return { ...state };
      return {
        cid: state.cid,
        items: state.items.map((i) =>
          i.pid === pid && i.color === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    },
    DECREASE_QUANTITY: (state, action) => {
      const { pid, color } = action.payload;
      let item = state.items.find((e) => e.pid === pid && e.color === color);
      if (!item || item.quantity === 1) return { ...state };
      return {
        cid: state.cid,
        items: state.items.map((i) =>
          i.pid === pid && i.color === color
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ),
      };
    },
    CLEAR_CART: (state, action) => {
      return { ...state, items: [] };
    },
    DELETE_CART: () => {
      return { items: [], cid: null };
    },
    REMOVE_ITEM: (state, action) => {
      const { pid, color } = action.payload;
      return {
        cid: state.cid,
        items: state.items.filter(
          (elem) => elem.pid !== pid && elem.color !== color
        ),
      };
    },
  },
});

export const { actions: cartActions, reducer: cartReducers } = CartSlice;
