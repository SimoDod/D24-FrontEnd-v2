import { useFormikContext } from "formik";
import { Answer, AnswerStatus, Report } from "../../../types/Report";

const useQuestionsSection = () => {
  const { values, setFieldValue } = useFormikContext<Report>();

  const findAnswerIndexByQuestionId = (id: number) =>
    values.answers.findIndex(({ questionNumber }) => questionNumber === id);

  const handleQuestionSelect = (questionId: number, answer: string) => {
    const existingAnswerIndex = findAnswerIndexByQuestionId(questionId);

    const doAnswerExists = existingAnswerIndex !== -1;
    const updatedAnswer: Answer = {
      id: doAnswerExists ? values.answers[existingAnswerIndex].id : 0,
      questionNumber: questionId,
      reportId: values.id,
      answer,
      updateNumber: 1,
    };

    const updatedAnswers = doAnswerExists
      ? values.answers.map((answer, index) =>
          index === existingAnswerIndex ? updatedAnswer : answer
        )
      : [...values.answers, updatedAnswer];

    setFieldValue("answers", updatedAnswers);
  };

  const checkIfQuestionIsAnswered = (id: number) =>
    findAnswerIndexByQuestionId(id) !== -1;

  const checkIfAnswerIsSelected = (id: number, status: AnswerStatus) =>
    values.answers[findAnswerIndexByQuestionId(id)]?.answer === status;

  return {
    handleQuestionSelect,
    checkIfQuestionIsAnswered,
    checkIfAnswerIsSelected,
    setFieldValue,
    values,
  };
};

export default useQuestionsSection;
