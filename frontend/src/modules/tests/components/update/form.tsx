import Button from "@/components/shared/Button";
import Select, { Option } from "@/components/shared/Select";
import Input from "@/components/shared/input";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useCreateTestsMutation } from "../../api";
import { schema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  closeModal: () => void;
}

const modes: Option[] = [
  { value: "static", name: "static" },
  { value: "dynamic", name: "dynamic" },
];

export default function UpdateTestForm({ closeModal }: Props) {
  const { mutation } = useCreateTestsMutation();
  const [mode, setMode] = useState<Option>(modes[0]);
  const [file, setFile] = useState<Blob | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submit: SubmitHandler<yup.InferType<typeof schema>> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    data.file && formData.append("file", data.file[0]);
    formData.append("mode", mode?.value as string);
    await mutation.mutateAsync(formData);
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

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files?.[0]);
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="grid gap-4 mt-4">
        <Input
          label="Test name"
          {...register("title")}
          error={errors.title?.message}
        />
        <Select
          label="mode"
          value={mode}
          onChange={function (value: Option) {
            setMode(value);
          }}
          options={modes}
        />
        <Input.Document
          {...register("file", {
            onChange: handleFileChange,
          })}
          removeFile={() => setFile(null)}
          file={file}
          error={errors.file?.message}
        />
        <div className="mt-4 flex justify-end items-center gap-4">
          <Button color="orange" type="submit" loading={mutation.isPending}>
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}
