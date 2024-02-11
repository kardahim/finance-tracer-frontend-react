import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/user";
import myAxios from "../helpers/axios";
import { RootState } from "../stores/store";
import { Register } from "../interfaces/register";

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

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (data: Register) => {
    await myAxios.post("auth/signup", data);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: user,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");

      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginAsync.fulfilled, (state, action) => {
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
      })
      .addCase(loginAsync.rejected, (_, action) => {
        console.error("Login, error", action.error);
      })
      // register
      .addCase(registerAsync.rejected, (_, action) => {
        console.error("Register, error", action.error);
      });
  },
});

export const selectUser = (state: RootState) => state.auth;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
