import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { Segment } from "../../../types/MaintenanceOption";

export const deleteSegmentThunk = createAsyncThunk<
  Segment,
  string,
  { rejectValue: string }
>("api/delete-segment", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete("/maintenance/delete-segment/" + id);

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
