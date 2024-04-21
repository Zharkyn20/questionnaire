import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./root";
import { CommonRoutes } from "@/navigation/common/routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<Root />}>
        {CommonRoutes}
      </Route>
    </Route>
  )
);

const Router = () => <RouterProvider router={router} />;

export default Router;
