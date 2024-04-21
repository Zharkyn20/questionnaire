import { useState } from "react";
import Button from "../shared/Button";
import { BaseChoiseProps } from "./types";

type SingleChoiseProps = BaseChoiseProps;

const SingleChoise = ({ options, onChange }: SingleChoiseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const handleClick = (value: string) => {
    setSelectedOption(value);
    onChange(value);
  };
  return (
    <div className="grid sm:grid-cols-2 w-full gap-4">
      {options?.map((option) => (
        <Button
          variant={option === selectedOption ? "contained" : "outlined"}
          key={option}
          onClick={() => handleClick(option)}
        >
          <p className="text-2xl">{option}</p>
        </Button>
      ))}
    </div>
  );
};

export default SingleChoise;
