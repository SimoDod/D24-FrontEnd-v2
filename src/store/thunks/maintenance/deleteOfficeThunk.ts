import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { Office } from "../../../types/MaintenanceOption";

export const deleteOfficeThunk = createAsyncThunk<
  Office,
  string,
  { rejectValue: string }
>("api/delete-office", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete("/maintenance/delete-office/" + id);

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
