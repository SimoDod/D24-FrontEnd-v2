import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUserThunk } from "../thunks/auth/fetchUserThunk";
import { loginThunk } from "../thunks/auth/loginThunk";
import { registerThunk } from "../thunks/auth/registerThunk";
import { fetchAllLearningReports } from "../thunks/report/fetchAllLearningReports";
import { postReportThunk } from "../thunks/report/postReportThunk";
import { fetchReportThunk } from "../thunks/report/fetchReportThunk";
import { fetchAllOfficesThunk } from "../thunks/maintenance/fetchAllOfficesThunk";
import { fetchAllSegmentsThunk } from "../thunks/maintenance/fetchAllSegmentsThunk";
import { fetchAllTechBucketsThunk } from "../thunks/maintenance/fetchAllTechBucketsThunk";
import { createOfficeThunk } from "../thunks/maintenance/createOfficeThunk";
import { updateOfficeNameThunk } from "../thunks/maintenance/updateOfficeNameThunk";
import { deleteOfficeThunk } from "../thunks/maintenance/deleteOfficeThunk";

type NotificationState = {
  message: string;
};

const initialState: NotificationState = {
  message: "",
};

//TODO translate

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = "";
    },
  },
  extraReducers: ({ addMatcher }) => {
    addMatcher(
      isAnyOf(
        fetchUserThunk.rejected,
        loginThunk.rejected,
        registerThunk.rejected,
        postReportThunk.rejected,
        fetchReportThunk.rejected,
        fetchAllLearningReports.rejected,
        fetchAllOfficesThunk.rejected,
        fetchAllSegmentsThunk.rejected,
        fetchAllTechBucketsThunk.rejected,
        createOfficeThunk.rejected,
        updateOfficeNameThunk.rejected,
        deleteOfficeThunk.rejected
      ),
      (state, action) => {
        state.message = action.payload || "An unknown error occurred";
      }
    );
  },
});

export const { clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
