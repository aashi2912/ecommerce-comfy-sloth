import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducers } from "./CartSlice";
import { productReducers } from "./ProductSlice";
import { userReducers } from "./UserSlice";

const rootReducer = combineReducers({
  user: userReducers,
  cart: cartReducers,
  product: productReducers,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
