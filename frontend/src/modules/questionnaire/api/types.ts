export type getQuestionParams = {
  token: string;
};

export type createLinkParams = {
  user_id: number;
  course_id: number;
  subtopic_id: number;
  question_amount: number;
};

export type CheckAnswerParams = {
  question_id: number;
  answer?: string;
  bool_answer?: boolean;
  input_answer?: string;
};