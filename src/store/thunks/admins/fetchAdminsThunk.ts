import { createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "../../../localization/i18n";
import { AxiosError } from "axios";
import { api } from "../../../api/api";
import { User } from "../../../types/User";

export const fetchAdminsThunk = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("api/get-all-admins", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/admins");
    if (!Array.isArray(response.data)) {
      return rejectWithValue(i18n.t("apiError.unknownError"));
    }

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
