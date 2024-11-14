import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/index";

interface UserState {
  user: User | null;
  status: string;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
  token: localStorage.getItem("token") || null,
};


export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: { username: string; password: string; organization: string; region?: string }) => {
    const response = await axios.post("http://localhost:3000/api/register", userData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);


export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { username: string; password: string }): Promise<User> => {
    const response = await axios.post("http://localhost:3000/api/login", credentials);
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default userSlice.reducer;
