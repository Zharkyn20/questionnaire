import { ChildrenProp } from "@/types";
import Footer from "./widgets/Footer";
import Header from "./widgets/Header";

type LayoutProps = ChildrenProp;

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className=" min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
