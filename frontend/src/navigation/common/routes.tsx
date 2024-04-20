import { Route } from "react-router-dom";
import HomePage from "./home";
import QuestionnairePage from "@/pages/QuestionnairePage";

export const CommonRoutes = (
  <>
    <Route path="/" element={<HomePage />} />
    <Route path="/test/:id" element={<QuestionnairePage />} />
  </>
);
