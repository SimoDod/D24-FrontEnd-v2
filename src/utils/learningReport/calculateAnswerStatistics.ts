import { questionsData } from "../../data/questionsData";
import { QuestionCategory } from "../../data/types";
import { Answer, AnswerStatus } from "../../types/Report";

const calculateAnswerStatistics = (answers: Answer[]) =>
  answers.reduce<Record<QuestionCategory, number>>(
    (acc, answer) => {
      const question = questionsData.find(
        ({ id }) => id === answer.questionNumber
      );

      if (!question) return acc;

      const category = question.questionGroup;

      if (answer.answer === AnswerStatus.AGREE) {
        acc[category] = (acc[category] || 0) + 1;
      }

      if (answer.answer === AnswerStatus.DISAGREE) {
        acc[category] = (acc[category] || 0) - 1;
      }

      return acc;
    },
    {
      [QuestionCategory.LACK_OF_ASSERTIVENESS]: 0,
      [QuestionCategory.FATIGUE]: 0,
      [QuestionCategory.STRESS]: 0,
      [QuestionCategory.LACK_OF_TEAMWORK]: 0,
    }
  );

export default calculateAnswerStatistics;
