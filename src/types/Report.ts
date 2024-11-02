export enum AnswerStatus {
  //TODO to be used as translation
  AGREE = "Agree",
  NEUTRAL = "Neutral",
  DISAGREE = "Disagree",
}

export type Answer = {
  id: number;
  questionNumber: number;
  reportId: number;
  answer: string | number;
  updateNumber: number;
};

export enum ReportStatus {
  NEW = "New",
  SUBMITTED = "Submitted",
  REVIEWED = "Reviewed",
  CLOSED = "Closed",
}

export enum MachineFamily {
  immersionScanner = "Immersion Scanner",
  stepAndScanSystem = "Step-and-Scan System",
  waferStepper = "Wafer Stepper",
  extremeUVSystem = "Extreme UV System",
  directWriteLithography = "Direct Write Lithography",
}

export type ReportPermissions = {
  CanSubmit: boolean;
  CanUnsubmit: boolean;
  CanReview: boolean;
  CanEdit: boolean;
  CanClose: boolean;
  CanDelete: boolean;
  CanEditClose: boolean;
  CanAlwaysDelete: boolean;
};

export type Report = {
  _id: number | string;
  reviewersEmail: string[];
  segment: string;
  office: string;
  machineNumber: string;
  timestampCraftsmanship: string;
  hoursDelay: string;
  techBucket: string;
  machineFamily: string;
  description: string;
  mealTime: boolean;
  continuousWork: boolean;
  experienced: boolean;
  gotTraining: boolean;
  customerInterference: boolean;
  workAlone: boolean;
  background: string;
  myselInfluence: string;
  riskReduceDescription: string;
  teamInfluence: string;
  managerInfluence: string;
  status: ReportStatus;
  archived: boolean;
  permissions: ReportPermissions;
  answers: Answer[];
  reportNumber: string;
  submitterEmail: string;
  filePath: string | null;
  downloadFileURL: string | null;
  filePathSecond: string | null;
  filePathThird: string | null;
  downloadFileUrlSecond: string | null;
  downloadFileUrlThird: string | null;
};
