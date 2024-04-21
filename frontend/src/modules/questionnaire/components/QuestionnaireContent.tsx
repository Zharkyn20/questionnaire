import { BooleanChoise, MultipleChoise, SingleChoise } from "@/components/AnswerComponents";
import Button from "@/components/shared/Button";
import Loader from "@/components/shared/Loader";
import TextArea from "@/components/shared/TextArea";
import { ChangeEvent, useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTokenFromUrl } from "../utils/getTokenFromUrl";
import { checkAnswer, getQuestion } from "../api/api";
import { CheckAnswerParams, CheckAnswerResponse } from "../api/types";
import FinishIllustration from "@/assets/Appreciation-bro.svg";
import classNames from "classnames";

const description = {
  courseName: "It School",
  topic: "Geography",
};

type AnswerType = string[] | string | boolean;

const QuestionnaireContent = () => {
  const token = getTokenFromUrl();

  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isFetching: isQuestionFetching,
    refetch,
  } = useQuery({ queryKey: ["question", token], queryFn: () => getQuestion({ token }) });
  const { mutateAsync, data: checkAnswerData } = useMutation({ mutationKey: ["checkAnswer"], mutationFn: checkAnswer });

  const [answerValue, setAnswerValue] = useState<AnswerType>();
  const [answerResponse, setAnswerResponse] = useState<CheckAnswerResponse>();

  const testIsFinished = questionData  && "message" in questionData;

  const handleAnswerChange = (value: AnswerType) => {
    setAnswerValue(value);
  };

  const handleAnswerClick = async () => {
    if (questionData && !testIsFinished) {
      const requestParams: CheckAnswerParams = { question_id: questionData.id };
      if (questionData.type === "input") requestParams.input_answer = answerValue as string;
      if (questionData.type === "single") requestParams.answer = answerValue as string;
      if (questionData.type === "boolean") requestParams.bool_answer = answerValue as boolean;

      const answerResponse = await mutateAsync(requestParams);

      setAnswerResponse(answerResponse);
    }
  };

  const nextQuestion = () => {
    setAnswerResponse(undefined);
    refetch();
  };

  const AnswerComponent = useMemo(
    () => ({
      //@ts-expect-error: TODO: fix me later
      single: <SingleChoise options={questionData?.variants} onChange={handleAnswerChange} />,
      input: <TextArea onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleAnswerChange(event.target.value)} />,
      //@ts-expect-error: TODO: fix me later
      multiple: <MultipleChoise options={questionData?.answers} onChange={handleAnswerChange} />,
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
        <h3 className="text-3xl font-bold">Test is finished.</h3>
        <p className="text-2xl ">Thank you!</p>
      </div>
    );
  }

  if (isQuestionLoading || isQuestionFetching)
    return (
      <div className="flex justify-center items-center gap-4">
        <Loader />
        <div className="text-2xl text-slate-700">Please wait, we are humans too...</div>
      </div>
    );

  if (!questionData) {
    return (
      <div className="flex justify-center items-center gap-4">
        <div className="text-2xl text-slate-700">Sorry, this page isn't available</div>
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
      {answerResponse ? (
        <>
          <div
            className={classNames(
              "rounded-xl py-2 px-4 mx-auto w-max text-2xl text-center mt-4 text-white",
              answerResponse.answer === "fail" ? "bg-red-500" : "bg-green-500"
            )}
          >
            {answerResponse.answer}
          </div>
          <Button className="ml-auto block mt-4 px-6" onClick={nextQuestion}>
            <p className="text-xl">{"Next"}</p>
          </Button>
        </>
      ) : (
        <>
          <div className="mt-8">{AnswerComponent[questionData?.type]}</div>
          <Button className="ml-auto block mt-4 px-6" onClick={handleAnswerClick}>
            <p className="text-xl">{"Answer"}</p>
          </Button>
        </>
      )}
    </>
  );
};

export default QuestionnaireContent;
