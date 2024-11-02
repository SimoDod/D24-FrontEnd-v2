import { Formik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import reportInitialValues from "../../utils/initialValues/reportInitialValues";
import { useTranslation } from "react-i18next";
import GeneralInformationSection from "./sections/GeneralInformationSection";
import Modal from "../common/Modal/Modal";
import QuestionsSection from "./sections/QuestionsSection";
import HumanFactorSection from "./sections/HumanFactorSection";
import NewReportFormButtons from "./NewReportFormButtons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { routePaths } from "../../routerConfig";
import { resetReport } from "../../store/slices/reportSlice";
import { fetchReportThunk } from "../../store/thunks/report/fetchReportThunk";

type Props = {
  onClose: () => void;
  reportNumber?: string;
};

const NewReportForm = ({ onClose, reportNumber }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { segments, isLoading: segmentsLoading } = useAppSelector(
    (state) => state.segment
  );
  const { offices, isLoading: officesLoading } = useAppSelector(
    (state) => state.office
  );
  const { report, isReportLoading: reportLoading } = useAppSelector(
    (state) => state.report
  );
  const navigate = useNavigate();
  const isFormLoading = segmentsLoading || officesLoading || reportLoading;

  useEffect(() => {
    dispatch(resetReport());

    const fetchReport = async () => {
      if (reportNumber && reportNumber !== routePaths.dashboard.new) {
        const { meta } = await dispatch(fetchReportThunk(reportNumber));

        if (meta.requestStatus === "rejected") {
          navigate(routePaths.notFound.path);
        }
      }
    };
    fetchReport();
  }, [dispatch, navigate, reportNumber]);

  return (
    <Modal
      onClose={onClose}
      title={
        <div className="p-0 m-0">
          {t("newReport.section.generalInfo")}
          {<span className="text-red-500">*</span>}
        </div>
      }
    >
      <div className="flex justify-center items-center w-full">
        <Formik
          initialValues={report ? report : reportInitialValues}
          enableReinitialize
          onSubmit={() => {}}
        >
          {({ values }) => (
            <Form>
              <div className="sticky top-2 z-10 flex justify-center">
                {isFormLoading ? (
                  <progress className="progress w-56" />
                ) : (
                  <div className="h-2" />
                )}
              </div>
              <GeneralInformationSection
                offices={offices}
                segments={segments}
              />
              <div className="divider divider-primary mt-20 mb-10">
                {t("newReport.section.questions")}
              </div>
              <QuestionsSection />
              <div className="divider divider-primary mt-20 mb-10">
                {t("newReport.section.humanFactor")}
              </div>
              <HumanFactorSection />
              <div className="sticky bottom-0">
                <NewReportFormButtons
                  reportStatus={report.status}
                  values={values}
                  isLoading={isFormLoading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default NewReportForm;
