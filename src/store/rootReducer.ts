import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import notification from "./slices/notificationSlice";
import loader from "./slices/loaderSlice";
import report from "./slices/reportSlice";
import admin from "./slices/adminSlice";
import office from "./slices/officeSlice";
import segment from "./slices/segmentSlice";
import techBucket from "./slices/techBucketSlice";

const rootReducer = combineReducers({
  auth,
  notification,
  loader,
  report,
  admin,
  office,
  segment,
  techBucket,
});

export default rootReducer;
