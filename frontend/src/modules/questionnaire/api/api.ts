import { BASE_URL } from "@/consts";
import axios, { AxiosResponse } from "axios";
import { CheckAnswerParams, getQuestionParams } from "./types";

type GetQuestionResponse = {
  id: number;
  subtopic_id: number;
  question: string;
  answers: string[];
  input_answer: string;
  bool_answer: string;
  answered: boolean;
  number: number;
  amount_fails: number;
  type: "single" | "multiple" | "input" | "boolean";
  answer: string;
  time: number;
};

type TestFinishedResponse = {
  message: string;
};

export const getQuestion = async (params: getQuestionParams) => {
  return (
    await axios<unknown, AxiosResponse<GetQuestionResponse | TestFinishedResponse>>({
      method: "get",
      baseURL: BASE_URL,
      url: "question/get/",
      params,
    })
  ).data;
};

export const checkAnswer = async (params: CheckAnswerParams) => {
  return await axios({ method: "post", baseURL: BASE_URL, url: "question/check/", params });
};
