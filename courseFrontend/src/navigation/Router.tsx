import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./root";
import { CommonRoutes } from "@/navigation/common/routes";
import { AuthRoutes } from "./auth/routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {AuthRoutes}
      <Route path="" element={<Root />}>
        {CommonRoutes}
      </Route>
    </Route>
  )
);

const Router = () => <RouterProvider router={router} />;

export default Router;
