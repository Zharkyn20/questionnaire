import Button from "@/components/shared/Button";
import Input from "@/components/shared/input";

interface Props {
  closeModal: () => void;
}

function CreateTestForm({ closeModal }: Props) {
  return (
    <form>
      <div className="grid gap-4 mt-4">
        <Input label="Test name" />
        <Input.Document />
        <div className="mt-4 flex justify-end items-center gap-4">
          <Button onClick={closeModal}>Create</Button>
        </div>
      </div>
    </form>
  );
}

export default CreateTestForm;
