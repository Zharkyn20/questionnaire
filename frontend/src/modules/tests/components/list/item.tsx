import IconButton from "@/components/shared/icon_button";
import UpdateTestModal from "../update";

function Item() {
  return (
    <li className="border border-gray-100 p-4 rounded bg-white flex justify-between items-center">
      <div className="flex items-center gap-3">
        <p className="font-medium text-lg">Test name</p>
        <div className="flex items-center gap-1">
          <div className="px-2 py-0.5 rounded-full bg-sky-600 no-select text-xs text-white font-medium">
            smart
          </div>
          {/* <div className="px-3 py-1 rounded-full bg-gray-100 no-select text-xs text-gray-500 font-medium">
            default
          </div> */}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <UpdateTestModal />
        <IconButton.Delete />
      </div>
    </li>
  );
}

export default Item;
