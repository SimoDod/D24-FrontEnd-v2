import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { fetchAllSegmentsThunk } from "../../../store/thunks/maintenance/fetchAllSegmentsThunk";
import FormikField from "../../common/FormikField/FormikField";
import { useTranslation } from "react-i18next";
import { fetchAllOfficesThunk } from "../../../store/thunks/maintenance/fetchAllOfficesThunk";
import { useFormikContext } from "formik";
import { MachineFamily, Report } from "../../../types/Report";
import { Office, Segment, TechBucket } from "../../../types/MaintenanceOption";

type Props = {
  segments: Segment[];
  offices: Office[];
};

const GeneralInformationSection = ({ segments, offices }: Props) => {
  const { t } = useTranslation();
  const { values } = useFormikContext<Report>();
  const dispatch = useAppDispatch();

  const [selectedTechBuckets, setSelectedTechBuckets] = useState<TechBucket[]>(
    []
  );

  useEffect(() => {
    const curSelectedSegment = segments.find(
      (segment) => segment.name === values.segment
    );

    if (curSelectedSegment?.selectedTechBuckets) {
      setSelectedTechBuckets(curSelectedSegment.selectedTechBuckets);
    }
  }, [segments, values.segment]);

  useEffect(() => {
    dispatch(fetchAllSegmentsThunk());
    dispatch(fetchAllOfficesThunk());
  }, [dispatch]);

  return (
    <div className="mockup-window grid xl:grid-cols-3 md:grid-cols-2 xxs:grid-cols-1 gap-4 bg-base-200 shadow-xl border-primary rounded-xl p-4 mt-2">
      <FormikField
        name="reportNumber"
        label={t("newReport.reportNumber")}
        disabled
      />
      <FormikField
        name="reviewersEmail"
        label={t("newReport.reviewersEmail")}
      />
      <FormikField name="segment" label={t("newReport.segment")} as="select">
        <option disabled defaultValue="" value="" />
        {Object.values(segments).map(({ name, _id }) => (
          <option key={_id} value={name}>
            {name}
          </option>
        ))}
      </FormikField>
      <FormikField name="office" label={t("newReport.office")} as="select">
        <option disabled defaultValue="" value="" />
        {Object.values(offices).map(({ name, _id }) => (
          <option key={_id} value={name}>
            {name}
          </option>
        ))}
      </FormikField>
      <FormikField
        name="machineNumber"
        label={t("newReport.machineNumber")}
        type="number"
      />
      <FormikField
        name="hoursDelay"
        label={t("newReport.hoursDelay")}
        type="number"
      />
      <FormikField
        name="techBucket"
        label={t("newReport.techBucket")}
        as="select"
      >
        <option disabled defaultValue="" value="" />
        {Object.values(selectedTechBuckets || []).map(({ name, _id }) => (
          <option key={_id} value={name}>
            {name}
          </option>
        ))}
      </FormikField>
      <FormikField
        name="timestampCraftsmanship"
        label={t("newReport.timestampCraftsmanship")}
        type="datetime-local"
      />
      <FormikField
        name="machineFamily"
        label={t("newReport.machineFamily")}
        as="select"
      >
        <option disabled defaultValue="" value="" />
        {Object.values(MachineFamily).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </FormikField>
      <FormikField
        name="description"
        label={t("newReport.description")}
        as="textarea"
      />
    </div>
  );
};

export default GeneralInformationSection;
