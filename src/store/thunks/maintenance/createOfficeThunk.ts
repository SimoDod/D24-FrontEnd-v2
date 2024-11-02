import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { Office } from "../../../types/MaintenanceOption";

export const createOfficeThunk = createAsyncThunk<
  Office,
  string,
  { rejectValue: string }
>("api/create-office", async (name, { rejectWithValue }) => {
  try {
    const response = await api.post("/maintenance/create-office", { name });

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
