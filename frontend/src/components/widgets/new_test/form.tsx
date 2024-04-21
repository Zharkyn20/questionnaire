import Button from "@/components/shared/Button";
import Input from "@/components/shared/input";
import { Bounce, toast } from "react-toastify";

interface Props {
  closeModal: () => void;
}

function CreateTestForm({ closeModal }: Props) {
  const submit = () => {
    toast.success("Test created!", {
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
        <Input.Document />
        <div className="mt-4 flex justify-end items-center gap-4">
          <Button onClick={submit}>Create</Button>
        </div>
      </div>
    </form>
  );
}

export default CreateTestForm;
