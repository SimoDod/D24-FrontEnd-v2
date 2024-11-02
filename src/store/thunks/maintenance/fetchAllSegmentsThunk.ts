import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { Segment } from "../../../types/MaintenanceOption";

export const fetchAllSegmentsThunk = createAsyncThunk<
  Segment[],
  void,
  { rejectValue: string }
>("api/get-all-segments", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/maintenance/allSegments");
    
    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
