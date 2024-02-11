import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/user";

const initialUser = JSON.parse(localStorage.getItem("user") || "null");

const user: User = {
  id: initialUser ? initialUser.id : null,
  firstName: initialUser ? initialUser.firstName : null,
  lastName: initialUser ? initialUser.lastName : null,
  email: initialUser ? initialUser.email : null,
  token: initialUser ? initialUser.token : null,
  refreshToken: initialUser ? initialUser.refreshToken : null,
  role: initialUser ? initialUser.role : null,
  isLogged: initialUser ? initialUser.isLogged : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: user,
  reducers: {},
});

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default authSlice.reducer;
