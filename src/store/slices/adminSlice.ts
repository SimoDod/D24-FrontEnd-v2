import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAdminsThunk } from "../thunks/admins/fetchAdminsThunk";
import { User } from "../../types/User";

type AdminsState = {
  admins: User[];
  error: string | null | unknown;
  isLoading: boolean;
};

const initialState: AdminsState = {
  admins: [],
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // Fetch admins
    addCase(fetchAdminsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      fetchAdminsThunk.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.admins = action.payload;
      }
    );
    addCase(
      fetchAdminsThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default authSlice.reducer;
