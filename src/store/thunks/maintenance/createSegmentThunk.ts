import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { Segment } from "../../../types/MaintenanceOption";

export const createSegmentThunk = createAsyncThunk<
  Segment,
  { selectedTechBuckets: string[]; name: string },
  { rejectValue: string }
>(
  "api/create-segment",
  async ({ selectedTechBuckets, name }, { rejectWithValue }) => {
    try {
      const response = await api.post("/maintenance/create-segment", {
        selectedTechBuckets,
        name,
      });

      return response?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue(i18n.t("apiError.unknownError"));
    }
  }
);
