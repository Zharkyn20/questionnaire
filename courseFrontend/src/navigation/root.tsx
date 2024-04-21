import { Outlet } from "react-router-dom";
import { useScrollToTop } from "@/utils/hooks/useScrollToTop";
import Layout from "@/components/Layout";

export default function Root() {
  useScrollToTop();
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}
