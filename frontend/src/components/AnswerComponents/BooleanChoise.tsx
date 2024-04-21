import { useState } from "react";
import Button from "../shared/Button";
import { BaseChoiseProps } from "./types";

type BooleanChoiseProps = Omit<BaseChoiseProps, "options">;

const BooleanChoise = ({ onChange }: BooleanChoiseProps) => {
  const [selectedOption, setSelectedOption] = useState<boolean | undefined>();

  const handleClick = (value: boolean) => {
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div className="grid grid-cols-2 w-full gap-4 min-10">
      <Button  selected={!!selectedOption} onClick={() => handleClick(true)}>
        True
      </Button>
      <Button selected={selectedOption === false} onClick={() => handleClick(false)}>
        False
      </Button>
    </div>
  );
};

export default BooleanChoise;
