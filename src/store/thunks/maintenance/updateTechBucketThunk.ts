import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { TechBucket } from "../../../types/MaintenanceOption";

export const updateTechBucketNameThunk = createAsyncThunk<
  TechBucket,
  { name: string; id: string },
  { rejectValue: string }
>("api/update-techBucket", async ({ name, id }, { rejectWithValue }) => {
  try {
    const response = await api.put("/maintenance/update-techBucket", {
      name,
      id,
    });

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
