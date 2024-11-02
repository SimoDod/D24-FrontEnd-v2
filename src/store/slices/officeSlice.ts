import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllOfficesThunk } from "../thunks/maintenance/fetchAllOfficesThunk";
import { createOfficeThunk } from "../thunks/maintenance/createOfficeThunk";
import { updateOfficeNameThunk } from "../thunks/maintenance/updateOfficeNameThunk";
import { deleteOfficeThunk } from "../thunks/maintenance/deleteOfficeThunk";
import { Office } from "../../types/MaintenanceOption";

type MaintenanceState = {
  offices: Office[];
  error: string | null | unknown;
  isLoading: boolean;
};

const initialState: MaintenanceState = {
  offices: [],
  error: null,
  isLoading: false,
};

const maintenanceSlice = createSlice({
  name: "office",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // Fetch all offices
    addCase(fetchAllOfficesThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      fetchAllOfficesThunk.fulfilled,
      (state, action: PayloadAction<Office[]>) => {
        state.isLoading = false;
        state.offices = action.payload;
      }
    );
    addCase(
      fetchAllOfficesThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Create office
    addCase(createOfficeThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      createOfficeThunk.fulfilled,
      (state, action: PayloadAction<Office>) => {
        state.isLoading = false;
        state.offices = [...state.offices, action.payload];
      }
    );
    addCase(
      createOfficeThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Update office
    addCase(updateOfficeNameThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      updateOfficeNameThunk.fulfilled,
      (state, action: PayloadAction<Office>) => {
        state.isLoading = false;
        const officeIndex = state.offices.findIndex(
          ({ _id }) => action.payload._id === _id
        );

        state.offices[officeIndex] = action.payload;
      }
    );
    addCase(
      updateOfficeNameThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Delete office
    addCase(deleteOfficeThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      deleteOfficeThunk.fulfilled,
      (state, action: PayloadAction<Office>) => {
        state.isLoading = false;
        state.offices = state.offices.filter(
          ({ _id }) => action.payload._id !== _id
        );
      }
    );
    addCase(
      deleteOfficeThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default maintenanceSlice.reducer;
