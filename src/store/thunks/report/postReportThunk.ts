/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { Report } from "../../../types/Report";

export const postReportThunk = createAsyncThunk<
  Report,
  Report & { userId?: string },
  { rejectValue: string }
>("api/submit-report", async (valuesWithUpdatedStatus, { rejectWithValue }) => {
  try {
    const reportId = valuesWithUpdatedStatus._id;
    const isUpdate = Boolean(reportId);

    const method = isUpdate ? "put" : "post";
    const url = `/learning-report/${isUpdate ? reportId : "submit"}`;
    const { _id, ...valuesWithoutId } = valuesWithUpdatedStatus;

    const response = await api({
      method,
      url,
      data: isUpdate ? valuesWithUpdatedStatus : valuesWithoutId,
    });

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.details.join(", "));
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
