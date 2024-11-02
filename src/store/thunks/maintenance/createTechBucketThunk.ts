import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { TechBucket } from "../../../types/MaintenanceOption";

export const createTechBucketThunk = createAsyncThunk<
  TechBucket,
  string,
  { rejectValue: string }
>("api/create-techBucket", async (name, { rejectWithValue }) => {
  try {
    const response = await api.post("/maintenance/create-techBucket", {
      name,
    });

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
