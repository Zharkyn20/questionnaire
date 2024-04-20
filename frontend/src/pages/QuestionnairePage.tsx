import MultipleChoise from "@/components/AnswerComponents/MultipleChoise";
import SingleChoise from "@/components/AnswerComponents/SingleChoise";
import Button from "@/components/shared/Button";
import TextArea from "@/components/shared/TextArea";
import {  useMemo, useState } from "react";

type Question = { title: string } & ({ type: "single" | "multiple" | "boolean"; answers: string[] } | { type: "input"; answers: undefined });

const question: Question = {
  title: "How many oceans?",
  type: "single",
  answers: ["4", "5", "6", "7"],
};

const description = {
  courseName: "It School",
  topic: "Geography",
};

const QuestionnairePage = () => {
  const [answerValue, setAnswerValue] = useState<string[] | string | boolean>();

  const handleAnswerChange = (value: string | string[] | boolean) => {
    setAnswerValue(value);
  };

  const AnswerComponent = useMemo(
    () => ({
      single: <SingleChoise options={question.answers} onChange={handleAnswerChange} />,
      input: <TextArea />,
      multiple: <MultipleChoise options={question.answers} onChange={handleAnswerChange} />,
      boolean: <div />,
    }),
    []
  );

  return (
    <div className="w-100 min-h-[100vh] bg-gray-100 flex justify-center items-center bg-gradient-to-br from-[#833ab4a2] via-[#ff6d6dc0] to-white">
      <div className="p-12 rounded-xl min-w-[70%] bg-white bg-opacity-60 shadow-lg">
        <div className="flex justify-between font-bold text-2xl">
          <span className=" text-primary">{description.courseName}</span>
          <span className=" text-slate-700">Topic: {description.topic}</span>
        </div>
        <p className="text-2xl text-slate-800 font-semibold mt-8">{question.title}</p>
        <div className="mt-8">{AnswerComponent[question.type]}</div>
        <Button className="ml-auto block mt-4 px-6">
          <p className="text-xl">Answer</p>
        </Button>
      </div>
    </div>
  );
};

export default QuestionnairePage;
