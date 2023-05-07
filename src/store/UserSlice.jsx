import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  name: null,
  email: null,
  isEmailVerified: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      const { uid, name, email, isEmailVerified, isLoggedIn } = action.payload;
      return { uid, name, email, isEmailVerified, isLoggedIn };
    },
    REMOVE_USER: (state, action) => {
      return {
        uid: null,
        name: null,
        email: null,
        isEmailVerified: false,
        isLoggedIn: false,
      };
    },
  },
});

export const { actions: userActions, reducer: userReducers } = userSlice;
