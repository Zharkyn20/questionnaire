import Item from "./item";

function TestList() {
  return (
    <div className="border border-gray-200 p-4 rounded-lg mt-4 bg-gray-100/80">
      <ul className="grid gap-2">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </ul>
    </div>
  );
}

export default TestList;
