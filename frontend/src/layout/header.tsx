import Logout from "./logout";

function Header() {
  return (
    <header>
      <div className="container py-4 shadow">
        <div className="flex gap-4 justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-medium">
            my <span className="text-primary">questionnaires</span>
          </h2>
          <Logout />
        </div>
      </div>
    </header>
  );
}

export default Header;
