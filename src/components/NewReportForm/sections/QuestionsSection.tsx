import { useTranslation } from "react-i18next";
import { binaryQuestions, questionsData } from "../../../data/questionsData";
import { AnswerStatus } from "../../../types/Report";
import useQuestionsSection from "../hooks/useQuestionsSection";
import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";

const QuestionsSection = () => {
  const { t } = useTranslation();
  const {
    checkIfQuestionIsAnswered,
    handleQuestionSelect,
    setFieldValue,
    checkIfAnswerIsSelected,
    values,
  } = useQuestionsSection();

  return (
    <>
      <div className="grid sm:grid-cols-4 gap-4 mb-10">
        {binaryQuestions.map(({ name, text }) => (
          <Fragment key={name}>
            <div className="flex justify-center items-center">{t(text)}:</div>
            <div className="flex justify-center items-center">
              <label
                className={clsx("swap swap-rotate btn btn-circle", {
                  "btn-outline": values[name],
                })}
              >
                <input
                  onChange={({ target }) => setFieldValue(name, target.checked)}
                  checked={!!values[name]}
                  name={name}
                  type="checkbox"
                />
                <div className="swap-on text-xl">{t("commonWords.yes")}</div>
                <div className="swap-off text-xl">{t("commonWords.no")}</div>
              </label>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="overflow-x-auto bg-base-200 shadow-xl">
        <div className="h-120 overflow-y-auto">
          <table className="table table-zebra-zebra">
            <thead>
              <tr>
                <th></th>
                <th>{t("commonWords.name")}</th>
                <th>{t("questionsSection.disagreeNeutralAgree")}</th>
              </tr>
            </thead>
            <tbody>
              {questionsData.map(({ id, question }) => (
                <tr key={id}>
                  <th
                    className={clsx("text-center", {
                      "bg-neutral text-base-100": checkIfQuestionIsAnswered(id),
                    })}
                  >
                    {id}
                  </th>
                  <td>{t(question)}</td>
                  <td className="flex justify-evenly">
                    {Object.values(AnswerStatus).map((answer, index) => (
                      <input
                        key={answer}
                        type="radio"
                        name={`radio-${id}`}
                        className={clsx("radio", {
                          "radio-error": index === 0,
                          "radio-warning": index === 1,
                          "radio-success": index === 2,
                        })}
                        value={answer}
                        checked={checkIfAnswerIsSelected(id, answer)}
                        onChange={({ target }) =>
                          handleQuestionSelect(id, target.value)
                        }
                      />
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default QuestionsSection;
