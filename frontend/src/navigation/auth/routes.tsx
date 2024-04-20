import { Route } from "react-router-dom";
import SignInPage from "./signin";
import SignUpPage from "./signup";

export const AuthRoutes = (
  <>
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
  </>
);
