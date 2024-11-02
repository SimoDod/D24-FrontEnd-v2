import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { Office } from "../../../types/MaintenanceOption";

export const updateOfficeNameThunk = createAsyncThunk<
  Office,
  { name: string; id: string },
  { rejectValue: string }
>("api/update-office", async ({ name, id }, { rejectWithValue }) => {
  try {
    const response = await api.put("/maintenance/update-office", { name, id });

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
