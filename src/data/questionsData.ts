import { Report } from "../types/Report";
import { QuestionCategory } from "./types";

type BinaryQuestion = { text: string; name: keyof Report }[];

export const questionsData = [
  {
    id: 1,
    question: "questions.q1",
    questionGroup: QuestionCategory.LACK_OF_ASSERTIVENESS,
    updateNumber: "0",
  },
  {
    id: 2,
    question: "questions.q2",
    questionGroup: QuestionCategory.FATIGUE,
    updateNumber: "0",
  },
  {
    id: 3,
    question: "questions.q3",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 4,
    question: "questions.q4",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 5,
    question: "questions.q5",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 6,
    question: "questions.q6",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 7,
    question: "questions.q7",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 8,
    question: "questions.q8",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 9,
    question: "questions.q9",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 10,
    question: "questions.q10",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 11,
    question: "questions.q11",
    questionGroup: QuestionCategory.LACK_OF_ASSERTIVENESS,
    updateNumber: "0",
  },
  {
    id: 12,
    question: "questions.q12",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 13,
    question: "questions.q13",
    questionGroup: QuestionCategory.LACK_OF_ASSERTIVENESS,
    updateNumber: "0",
  },
  {
    id: 14,
    question: "questions.q14",
    questionGroup: QuestionCategory.FATIGUE,
    updateNumber: "0",
  },
  {
    id: 15,
    question: "questions.q15",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 16,
    question: "questions.q16",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 17,
    question: "questions.q17",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 18,
    question: "questions.q18",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 19,
    question: "questions.q19",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 20,
    question: "questions.q20",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 21,
    question: "questions.q21",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 22,
    question: "questions.q22",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 23,
    question: "questions.q23",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 24,
    question: "questions.q24",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 25,
    question: "questions.q25",
    questionGroup: QuestionCategory.LACK_OF_ASSERTIVENESS,
    updateNumber: "0",
  },
  {
    id: 26,
    question: "questions.q26",
    questionGroup: QuestionCategory.FATIGUE,
    updateNumber: "0",
  },
  {
    id: 27,
    question: "questions.q27",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 28,
    question: "questions.q28",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 29,
    question: "questions.q29",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 30,
    question: "questions.q30",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 31,
    question: "questions.q31",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 32,
    question: "questions.q32",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 33,
    question: "questions.q33",
    questionGroup: QuestionCategory.STRESS,
    updateNumber: "0",
  },
  {
    id: 34,
    question: "questions.q34",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
  {
    id: 35,
    question: "questions.q35",
    questionGroup: QuestionCategory.LACK_OF_ASSERTIVENESS,
    updateNumber: "0",
  },
  {
    id: 36,
    question: "questions.q36",
    questionGroup: QuestionCategory.LACK_OF_TEAMWORK,
    updateNumber: "0",
  },
];

export const binaryQuestions: BinaryQuestion = [
  { text: "questionsSection.breakDuringShift", name: "mealTime" },
  { text: "questionsSection.nonStopWork", name: "continuousWork" },
  { text: "questionsSection.longTermEmployee", name: "experienced" },
  { text: "questionsSection.completedTraining", name: "gotTraining" },
  {
    text: "questionsSection.externalDistraction",
    name: "customerInterference",
  },
  { text: "questionsSection.worksIndependently", name: "workAlone" },
];

export const humanFactorInputs = [
  { placeholder: "humanFactorSection.background", name: "background" },
  { placeholder: "humanFactorSection.myselInfluence", name: "myselInfluence" },
  {
    placeholder: "humanFactorSection.riskReduceDescription",
    name: "riskReduceDescription",
  },
  { placeholder: "humanFactorSection.teamInfluence", name: "teamInfluence" },
  {
    placeholder: "humanFactorSection.managerInfluence",
    name: "managerInfluence",
  },
];
