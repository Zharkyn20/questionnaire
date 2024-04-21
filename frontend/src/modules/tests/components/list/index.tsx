import { useTestsQuery } from "../../api";
import CreateTestModal from "../create";
import Item from "./item";

function TestList() {
  const { data, isFetching } = useTestsQuery();
  console.log(data);
  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          {!!data?.length && (
            <h3 className="text-xl font-medium text-primary">
              Total: {data?.length}
            </h3>
          )}
        </div>
        <div className="flex justify-center">
          <CreateTestModal />
        </div>
      </div>
      {data?.length ? (
        <div className="border border-gray-200 p-4 rounded-lg mt-4 bg-gray-100/80">
          <ul className="grid gap-2">
            {data?.map(({ id, title, mode }) => (
              <Item key={id} title={title} id={id} mode={mode} />
            ))}
          </ul>
        </div>
      ) : (
        !isFetching && (
          <div className="border border-gray-200 px-4 py-[30vh] rounded-lg mt-4 bg-gray-50">
            <h2 className="text-center text-lg text-gray-500 font-medium">
              No courses yet
            </h2>
          </div>
        )
      )}
    </div>
  );
}

export default TestList;
