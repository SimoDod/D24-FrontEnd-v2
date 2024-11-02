import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { TechBucket } from "../../../types/MaintenanceOption";

export const fetchAllTechBucketsThunk = createAsyncThunk<
  TechBucket[],
  void,
  { rejectValue: string }
>("api/get-all-techBuckets", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/maintenance/allTechBuckets");

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
