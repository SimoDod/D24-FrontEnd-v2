import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/auth/loginThunk";
import { registerThunk } from "../thunks/auth/registerThunk";
import { fetchUserThunk } from "../thunks/auth/fetchUserThunk";
import { User } from "../../types/User";

type AuthState = {
  token: string | null;
  user: User | null;
  error: string | null | unknown;
  isLoading: boolean;
};

const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // Login
    addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    addCase(loginThunk.rejected, (state, action: PayloadAction<unknown>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Register
    addCase(registerThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(registerThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    addCase(registerThunk.rejected, (state, action: PayloadAction<unknown>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Fetch user data
    addCase(fetchUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(fetchUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    addCase(
      fetchUserThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default authSlice.reducer;
