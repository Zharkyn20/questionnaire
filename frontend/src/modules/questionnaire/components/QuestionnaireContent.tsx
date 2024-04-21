import { BooleanChoise, MultipleChoise, SingleChoise } from "@/components/AnswerComponents";
import Button from "@/components/shared/Button";
import Loader from "@/components/shared/Loader";
import TextArea from "@/components/shared/TextArea";
import { ChangeEvent, useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTokenFromUrl } from "../utils/getTokenFromUrl";
import { checkAnswer, getQuestion } from "../api/api";
import { CheckAnswerParams } from "../api/types";
import FinishIllustration from "@/assets/Appreciation-bro.svg";

type Question = { title: string } & ({ type: "single" | "multiple"; answers: string[] } | { type: "input" | "boolean"; answers: undefined });

const question: Question = {
  title: "How many oceans?",
  type: "single",
  answers: ["4", "5", "6", "7"],
};

const description = {
  courseName: "It School",
  topic: "Geography",
};

type AnswerType = string[] | string | boolean;

const QuestionnaireContent = () => {
  const token = getTokenFromUrl();

  const { data: questionData, isLoading: isQuestionLoading } = useQuery({ queryKey: ["question", token], queryFn: () => getQuestion({ token }) });
  const { mutateAsync, data: checkAnswerData } = useMutation({ mutationKey: ["checkAnswer"], mutationFn: checkAnswer });
  console.log(questionData, checkAnswerData);
  const [answerValue, setAnswerValue] = useState<AnswerType>();

  const testIsFinished = questionData !== undefined && "message" in questionData;

  const handleAnswerChange = (value: AnswerType) => {
    setAnswerValue(value);
  };

  const handleAnswerClick = () => {
    if (questionData && !testIsFinished) {
      const requestParams: CheckAnswerParams = { question_id: questionData.id };
      if (questionData.type === "input") requestParams.input_answer = answerValue as string;
      if (questionData.type === "single") requestParams.answer = answerValue as string;
      if (questionData.type === "boolean") requestParams.bool_answer = answerValue as boolean;

      mutateAsync(requestParams);
    }
  };

  console.log(answerValue);

  const AnswerComponent = useMemo(
    () => ({
      //@ts-expect-error: TODO: fix me later
      single: <SingleChoise options={questionData?.answers} onChange={handleAnswerChange} />,
      input: <TextArea onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleAnswerChange(event.target.value)} />,
      multiple: <MultipleChoise options={question.answers} onChange={handleAnswerChange} />,
      boolean: <BooleanChoise onChange={handleAnswerChange} />,
    }),
    [questionData]
  );

  if (testIsFinished) {
    return (
      <div className="flex justify-center items-center gap-4 text-slate-700 flex-col">
        <span className="w-[256px] h-[256px]">
          <FinishIllustration />
        </span>
        <h3 className="text-3xl ">Test is finished.</h3>
        <p className="text-2xl ">Thank you!</p>
      </div>
    );
  }

  if (isQuestionLoading)
    return (
      <div className="flex justify-center items-center gap-4">
        <Loader />
        <div className="text-2xl text-slate-700">Please wait, we are humans too...</div>
      </div>
    );

  if (!questionData) {
    return (
      <div className="flex justify-center items-center gap-4">
        <div className="text-2xl text-slate-700">Sorry, our service currently is not working</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between font-bold text-2xl">
        <span className=" text-primary">{description.courseName}</span>
        <span className=" text-slate-700">Topic: {description.topic}</span>
      </div>
      <p className="text-2xl text-slate-800 font-semibold mt-8">{questionData.question}</p>
      <div className="mt-8">{AnswerComponent[questionData?.type]}</div>
      <Button className="ml-auto block mt-4 px-6" onClick={handleAnswerClick}>
        <p className="text-xl">Answer</p>
      </Button>
    </>
  );
};

export default QuestionnaireContent;
