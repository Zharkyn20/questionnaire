import IconButton from "@/components/shared/icon_button";
import UpdateTestModal from "../update";
import { Course } from "../../api";
import classNames from "classnames";

function Item({ title, mode }: Course) {
  return (
    <li className="border border-gray-100 p-4 rounded bg-white flex justify-between items-center">
      <div className="flex items-center gap-3">
        <p className="font-medium text-lg">{title}</p>
        <div className="flex items-center gap-1">
          <div
            className={classNames(
              "px-2 py-0.5 rounded-full bg-sky-600 no-select text-xs text-white font-medium",
              mode === "static" && "bg-sky-600",
              mode === "dynamic" && "bg-lime-600"
            )}
          >
            {mode}
          </div>
        </div>
      </div>
      <div className="hidden items-center gap-2">
        <UpdateTestModal />
        <IconButton.Delete />
      </div>
    </li>
  );
}

export default Item;
