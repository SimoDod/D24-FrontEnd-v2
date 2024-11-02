import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { Office } from "../../../types/MaintenanceOption";

export const fetchAllOfficesThunk = createAsyncThunk<
  Office[],
  void,
  { rejectValue: string }
>("api/get-all-offices", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/maintenance/allOffices");

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
