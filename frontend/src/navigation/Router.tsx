import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { CommonRoutes } from "@/navigation/common/routes";
import { AuthRoutes } from "./auth/routes";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "@/modules/auth/store";
import Header from "@/layout/header";
import QuestionnairePage from "./questionnaire/QuestionnairePage";

const PrivateRoutes = () => {
  const userState = useAuthStore();
  return userState.access_token ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

const AuthRoutesElement = () => {
  const userState = useAuthStore();
  return userState.access_token ? <Navigate to="/" /> : <Outlet />;
};

const PublicRoutes = (
  <>
    <Route path="/test/:id" element={<QuestionnairePage />} />
  </>
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {PublicRoutes}
      <Route element={<PrivateRoutes />}>{CommonRoutes}</Route>
      <Route element={<AuthRoutesElement />}>{AuthRoutes}</Route>
    </Route>
  )
);

const Router = () => <RouterProvider router={router} />;

export default Router;
