import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllSegmentsThunk } from "../thunks/maintenance/fetchAllSegmentsThunk";
import { updateSegmentThunk } from "../thunks/maintenance/updateSegmentThunk";
import { createSegmentThunk } from "../thunks/maintenance/createSegmentThunk";
import { deleteSegmentThunk } from "../thunks/maintenance/deleteSegmentThunk";
import { Segment } from "../../types/MaintenanceOption";

type MaintenanceState = {
  segments: Segment[];
  error: string | null | unknown;
  isLoading: boolean;
};

const initialState: MaintenanceState = {
  segments: [],
  error: null,
  isLoading: false,
};

const maintenanceSlice = createSlice({
  name: "segment",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // Fetch all segments
    addCase(fetchAllSegmentsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      fetchAllSegmentsThunk.fulfilled,
      (state, action: PayloadAction<Segment[]>) => {
        state.isLoading = false;
        state.segments = action.payload;
      }
    );
    addCase(
      fetchAllSegmentsThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Create segment
    addCase(createSegmentThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      createSegmentThunk.fulfilled,
      (state, action: PayloadAction<Segment>) => {
        state.isLoading = false;
        state.segments = [...state.segments, action.payload];
      }
    );
    addCase(
      createSegmentThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Update segment tech buckets
    addCase(updateSegmentThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      updateSegmentThunk.fulfilled,
      (state, action: PayloadAction<Segment>) => {
        state.isLoading = false;
        const segmentIndex = state.segments.findIndex(
          ({ _id }) => action.payload._id === _id
        );

        state.segments[segmentIndex] = action.payload;
      }
    );
    addCase(
      updateSegmentThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Delete office
    addCase(deleteSegmentThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    addCase(
      deleteSegmentThunk.fulfilled,
      (state, action: PayloadAction<Segment>) => {
        state.isLoading = false;
        state.segments = state.segments.filter(
          ({ _id }) => action.payload._id !== _id
        );
      }
    );
    addCase(
      deleteSegmentThunk.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default maintenanceSlice.reducer;
