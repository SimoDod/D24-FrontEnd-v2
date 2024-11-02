import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllLearningReports } from "../thunks/report/fetchAllLearningReports";
import { fetchReportThunk } from "../thunks/report/fetchReportThunk";
import { postReportThunk } from "../thunks/report/postReportThunk";
import reportInitialValues from "../../utils/initialValues/reportInitialValues";
import { Report } from "../../types/Report";

type ReportState = {
  report: Report;
  allReports: Report[];
  filteredReports: Report[];
  error: string | null | unknown;
  isReportLoading: boolean;
  areAllReportsLoading: boolean;
};

const initialState: ReportState = {
  report: reportInitialValues,
  allReports: [],
  filteredReports: [],
  error: null,
  isReportLoading: false,
  areAllReportsLoading: false,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetReport: (state) => {
      state.report = reportInitialValues;
    },
    searchReportsByCriteria: (
      state,
      {
        payload,
      }: PayloadAction<{ searchValue: string; searchCriteria: string }>
    ) => {
      state.filteredReports = state.allReports;
      state.filteredReports = state.allReports.filter(
        ({ reportNumber, segment, office, status }) =>
          (reportNumber
            .toLowerCase()
            .includes(payload.searchValue.toLowerCase()) ||
            segment.toLowerCase().includes(payload.searchValue.toLowerCase()) ||
            office.toLowerCase().includes(payload.searchValue.toLowerCase())) &&
          status.toLowerCase().includes(payload.searchCriteria.toLowerCase())
      );
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchReportThunk.pending, (state) => {
      state.isReportLoading = true;
      state.error = null;
    });
    addCase(
      fetchReportThunk.fulfilled,
      (state, action: PayloadAction<Report>) => {
        state.isReportLoading = false;
        state.report = action.payload;
      }
    );
    addCase(
      fetchReportThunk.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.isReportLoading = false;
        state.error = action.payload;
      }
    );

    addCase(postReportThunk.pending, (state) => {
      state.isReportLoading = true;
      state.error = null;
    });
    addCase(
      postReportThunk.fulfilled,
      (state, action: PayloadAction<Report>) => {
        state.isReportLoading = false;
        state.report = action.payload;
      }
    );
    addCase(
      postReportThunk.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.isReportLoading = false;
        state.error = action.payload;
      }
    );

    addCase(fetchAllLearningReports.pending, (state) => {
      state.areAllReportsLoading = true;
      state.error = null;
    });
    addCase(
      fetchAllLearningReports.fulfilled,
      (state, action: PayloadAction<Report[]>) => {
        state.areAllReportsLoading = false;
        state.allReports = action.payload;
        state.filteredReports = action.payload;
      }
    );
    addCase(
      fetchAllLearningReports.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.areAllReportsLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { resetReport, searchReportsByCriteria } = reportSlice.actions;
export default reportSlice.reducer;
