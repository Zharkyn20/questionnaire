import CreateTestModal from "@/modules/tests/components/create";
import TestList from "@/modules/tests/components/list";

function HomePage() {
  return (
    <main>
      <div className="container py-4">
        <section>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-3xl font-medium">
              my <span className="text-primary">questionnaires</span>
            </h2>
            <div className="flex justify-center">
              <CreateTestModal />
            </div>
          </div>
          <TestList />
        </section>
      </div>
    </main>
  );
}

export default HomePage;
