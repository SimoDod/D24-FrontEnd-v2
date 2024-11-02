import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { Report } from "../../../types/Report";

export const fetchReportThunk = createAsyncThunk<
  Report,
  string,
  { rejectValue: string }
>("api/get-report", async (reportNumber, { rejectWithValue }) => {
  try {
    const response = await api.get(`/learning-report/${reportNumber}`);

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
