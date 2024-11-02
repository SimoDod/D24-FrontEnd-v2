import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllTechBucketsThunk } from "../thunks/maintenance/fetchAllTechBucketsThunk";
import { createTechBucketThunk } from "../thunks/maintenance/createTechBucketThunk";
import { updateTechBucketNameThunk } from "../thunks/maintenance/updateTechBucketThunk";
import { deleteTechBucketThunk } from "../thunks/maintenance/deleteTechBucketThunk";
import { TechBucket } from "../../types/MaintenanceOption";

type MaintenanceState = {
  techBuckets: TechBucket[];
  error: string | null | unknown;
  isLoading: boolean;
};

const initialState: MaintenanceState = {
  techBuckets: [],
  error: null,
  isLoading: false,
};

const maintenanceSlice = createSlice({
  name: "techBucket",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // Fetch all tech buckets
    addCase(fetchAllTechBucketsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      fetchAllTechBucketsThunk.fulfilled,
      (state, action: PayloadAction<TechBucket[]>) => {
        state.isLoading = false;
        state.techBuckets = action.payload;
      }
    );
    addCase(
      fetchAllTechBucketsThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Create tech bucket
    addCase(createTechBucketThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      createTechBucketThunk.fulfilled,
      (state, action: PayloadAction<TechBucket>) => {
        state.isLoading = false;
        state.techBuckets = [...state.techBuckets, action.payload];
      }
    );
    addCase(
      createTechBucketThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Update tech bucket
    addCase(updateTechBucketNameThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      updateTechBucketNameThunk.fulfilled,
      (state, action: PayloadAction<TechBucket>) => {
        state.isLoading = false;
        const officeIndex = state.techBuckets.findIndex(
          ({ _id }) => action.payload._id === _id
        );

        state.techBuckets[officeIndex] = action.payload;
      }
    );
    addCase(
      updateTechBucketNameThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Delete office
    addCase(deleteTechBucketThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      deleteTechBucketThunk.fulfilled,
      (state, action: PayloadAction<TechBucket>) => {
        state.isLoading = false;
        state.techBuckets = state.techBuckets.filter(
          ({ _id }) => action.payload._id !== _id
        );
      }
    );
    addCase(
      deleteTechBucketThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default maintenanceSlice.reducer;
