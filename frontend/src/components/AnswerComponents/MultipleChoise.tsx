import { useState } from "react";
import Button from "../shared/Button";
import { BaseChoiseProps } from "./types";

type MultipleChoiseProps = BaseChoiseProps;

const MultipleChoise = ({ options, onChange }: MultipleChoiseProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleClick = (value: string) => {
    const newValue = selectedOptions.includes(value) ? selectedOptions.filter((el) => el !== value) : [...selectedOptions, value];
    setSelectedOptions(newValue);
    onChange(newValue);
  };

  return (
    <div className="grid md:grid-cols-2 w-full gap-4">
      {options?.map((option) => (
        <Button selected={selectedOptions.includes(option)} onClick={() => handleClick(option)}>
          <p className="text-2xl">{option}</p>
        </Button>
      ))}
    </div>
  );
};

export default MultipleChoise;
