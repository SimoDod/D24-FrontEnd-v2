import { useTranslation } from "react-i18next";
import { Report, ReportStatus } from "../../types/Report";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { postReportThunk } from "../../store/thunks/report/postReportThunk";
import { routePaths } from "../../routerConfig";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "../../hooks/useNotification";

const isReport = (payload?: Report | string): payload is Report =>
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
  const navigate = useNavigate();
  const { reportNumber } = useParams();
  const openNotification = useNotification();

  const handleFormSubmit = async (status?: ReportStatus) => {
    const newData = {
      ...values,
      status: !status ? reportStatus : status,
      userId,
    };

    const { meta, payload } = await dispatch(postReportThunk(newData));

    if (
      meta.requestStatus === "fulfilled" &&
      reportNumber === routePaths.dashboard.new
    ) {
      if (isReport(payload)) {
        navigate(routePaths.dashboard.reportPath + payload.reportNumber);
        openNotification(
          "success",
          `Report with number ${payload.reportNumber} successfully created.`
        );
      }
    }
  };

  return (
    <div className="flex bg-base-200 gap-4 justify-end mt-8 p-2 rounded-xl border shadow-lg">
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
  );
};

export default NewReportFormButtons;
