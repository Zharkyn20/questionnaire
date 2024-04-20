import { Outlet } from "react-router-dom";
import { useScrollToTop } from "@/utils/hooks/useScrollToTop";

export default function Root() {
  useScrollToTop();
  return (
    <>
      <Outlet />
    </>
  );
}
