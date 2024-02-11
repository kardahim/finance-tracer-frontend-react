import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/user";
import myAxios from "../helpers/axios";
import { RootState } from "../stores/store";

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

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }) => {
    const response = await myAxios.post("/auth/signin", data);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: user,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      const { user, token, refreshToken } = action.payload;

      state.id = user.id;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.email = user.email;
      state.token = token;
      state.refreshToken = refreshToken;
      state.role = user.role;
      state.isLogged = true;

      localStorage.setItem("user", JSON.stringify(state));
    });
  },
});

export const selectUser = (state: RootState) => state.auth;
export default authSlice.reducer;
