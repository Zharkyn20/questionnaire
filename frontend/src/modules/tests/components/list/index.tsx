import { useTestsQuery } from "../../api";
import Item from "./item";

function TestList() {
  const { data } = useTestsQuery();
  console.log(data);
  return (
    <div className="border border-gray-200 p-4 rounded-lg mt-4 bg-gray-100/80">
      <ul className="grid gap-2">
        {data?.map(({ id, title, mode }) => (
          <Item key={id} title={title} id={id} mode={mode} />
        ))}
      </ul>
    </div>
  );
}

export default TestList;
