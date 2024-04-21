import { BooleanChoise, MultipleChoise, SingleChoise } from "@/components/AnswerComponents";
import Button from "@/components/shared/Button";
import Loader from "@/components/shared/Loader";
import TextArea from "@/components/shared/TextArea";
import { ChangeEvent, useMemo, useState } from "react";

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

const loading = false;

const QuestionnaireContent = () => {
  const [answerValue, setAnswerValue] = useState<string[] | string | boolean>();

  const handleAnswerChange = (value: string | string[] | boolean) => {
    setAnswerValue(value);
  };

  console.log(answerValue);

  const AnswerComponent = useMemo(
    () => ({
      single: <SingleChoise options={question.answers} onChange={handleAnswerChange} />,
      input: <TextArea onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleAnswerChange(event.target.value)} />,
      multiple: <MultipleChoise options={question.answers} onChange={handleAnswerChange} />,
      boolean: <BooleanChoise onChange={handleAnswerChange} />,
    }),
    []
  );

  if (loading)
    return (
      <div className="flex justify-center items-center gap-4">
        <Loader />
        <div className="text-2xl text-slate-700">Please wait, we are human too...</div>
      </div>
    );

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between font-bold text-2xl">
        <span className=" text-primary">{description.courseName}</span>
        <span className=" text-slate-700">Topic: {description.topic}</span>
      </div>
      <p className="text-2xl text-slate-800 font-semibold mt-8">{question.title}</p>
      <div className="mt-8">{AnswerComponent[question.type]}</div>
      <Button className="ml-auto block mt-4 px-6">
        <p className="text-xl">Answer</p>
      </Button>
    </>
  );
};

export default QuestionnaireContent;
