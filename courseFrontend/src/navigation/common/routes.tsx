import { Route } from "react-router-dom";
import ProgramPage from "@/modules/Program/pages/ProgramPage";
import DetailedPage from "@/modules/Program/pages/DetailedPage";

export const CommonRoutes = (
  <>
    <Route path="/" element={<ProgramPage />} />
    <Route path="/detailed/:id" element={<DetailedPage />} />
  </>
);
