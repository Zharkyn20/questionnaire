import CreateTestModal from "@/components/widgets/new_test";

function HomePage() {
  return (
    <main>
      <div className="container">
        <div className="h-screen flex justify-center items-center">
          <CreateTestModal />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
