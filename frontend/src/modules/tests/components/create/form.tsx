import Button from "@/components/shared/Button";
import Select, { Option } from "@/components/shared/Select";
import Input from "@/components/shared/input";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

interface Props {
  closeModal: () => void;
}

const modes: Option[] = [
  { id: 1, name: "default" },
  { id: 2, name: "smart" },
];

function CreateTestForm({ closeModal }: Props) {
  const [mode, setMode] = useState<Option>(modes[0]);
  const submit = () => {
    toast.success("Test created", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    closeModal();
  };
  return (
    <form>
      <div className="grid gap-4 mt-4">
        <Input label="Test name" />
        <Select
          label="mode"
          value={mode}
          onChange={function (value: Option) {
            setMode(value);
          }}
          options={modes}
        />
        <Input.Document />
        <div className="mt-4 flex justify-end items-center gap-4">
          <Button onClick={submit}>Create</Button>
        </div>
      </div>
    </form>
  );
}

export default CreateTestForm;
