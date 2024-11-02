import { useFormikContext } from "formik";
import { QuestionCategory } from "../../../data/types";
import { Report } from "../../../types/Report";
import calculateAnswerStatistics from "../../../utils/learningReport/calculateAnswerStatistics";
import { humanFactorInputs } from "../../../data/questionsData";
import FormikField from "../../common/FormikField/FormikField";
import { useTranslation } from "react-i18next";

const HumanFactorSection = () => {
  const { values } = useFormikContext<Report>();
  const { t } = useTranslation();
  const stats = calculateAnswerStatistics(values.answers);

  return (
    <>
      <div className="flex flex-wrap justify-evenly text-center ">
        {Object.values(QuestionCategory).map((category, index) => (
          <div key={category + index} className="stats stats-vertical p-4">
            <div className="stat-title">{category}</div>
            <div className="stat-value">{stats[category]}</div>
          </div>
        ))}
      </div>
      <div className="mockup-window bg-base-300 border-primary">
        <div className="bg-base-200 grid justify-center">
          {humanFactorInputs.map(({ name, placeholder }) => (
            <FormikField
              key={name}
              className="mb-4"
              name={name}
              as="textarea"
              label={t(placeholder)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HumanFactorSection;
