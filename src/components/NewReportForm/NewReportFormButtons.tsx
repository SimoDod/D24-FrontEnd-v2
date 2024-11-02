import { useTranslation } from "react-i18next";
import { Report, ReportStatus } from "../../types/Report";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { postReportThunk } from "../../store/thunks/report/postReportThunk";
import { routePaths } from "../../routerConfig";
import { useNavigate, useParams } from "react-router-dom";

const isReport = (payload: Report | string): payload is Report =>
  typeof payload === "object" && payload !== null && "reportNumber" in payload;

type Props = {
  reportStatus: ReportStatus;
  values: Report;
  isLoading?: boolean;
};

const NewReportFormButtons = ({
  reportStatus,
  values,
  isLoading = false,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?._id);
  const reportError = useAppSelector((state) => state.report.error);
  const navigate = useNavigate();
  const { reportNumber } = useParams();

  const handleFormSubmit = async (status?: ReportStatus) => {
    const newData = {
      ...values,
      status: !status ? reportStatus : status,
      userId,
    };

    if (reportNumber === routePaths.dashboard.new) {
      const { meta, payload } = await dispatch(postReportThunk(newData));

      if (meta.requestStatus === "fulfilled" && payload) {
        if (isReport(payload)) {
          navigate(routePaths.dashboard.reportPath + payload.reportNumber);
        }
      }
    } else {
      dispatch(postReportThunk(newData));
    }
  };

  return (
    <div className="flex bg-base-200 gap-4 justify-between items-center mt-8 p-2 rounded-xl border shadow-lg">
      <p className="max-w-64 2xl:max-w-96 text-error">{reportError as string}</p>
      <div className="flex flex-wrap gap-4 justify-end">
        {ReportStatus.CLOSED !== reportStatus && (
          <button
            className="btn btn-success"
            type="button"
            onClick={() => handleFormSubmit()}
            disabled={isLoading}
          >
            {t("buttons.save")}
          </button>
        )}
        {ReportStatus.NEW === reportStatus && (
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => handleFormSubmit(ReportStatus.SUBMITTED)}
            disabled={isLoading}
          >
            {t("buttons.submit")}
          </button>
        )}
        {ReportStatus.SUBMITTED === reportStatus && (
          <>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => handleFormSubmit(ReportStatus.NEW)}
              disabled={isLoading}
            >
              {t("buttons.unSubmit")}
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => handleFormSubmit(ReportStatus.REVIEWED)}
              disabled={isLoading}
            >
              {t("buttons.review")}
            </button>
          </>
        )}
        {ReportStatus.REVIEWED === reportStatus && (
          <>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => handleFormSubmit(ReportStatus.SUBMITTED)}
              disabled={isLoading}
            >
              {t("buttons.unReview")}
            </button>
            <button
              className="btn btn-error"
              type="button"
              onClick={() => handleFormSubmit(ReportStatus.CLOSED)}
              disabled={isLoading}
            >
              {t("buttons.close")}
            </button>
          </>
        )}
        {reportStatus !== ReportStatus.NEW && (
          <button
            className="btn btn-error"
            type="button"
            onClick={() => handleFormSubmit()}
            disabled={isLoading}
          >
            {t("buttons.delete")}
          </button>
        )}
      </div>
    </div>
  );
};

export default NewReportFormButtons;
