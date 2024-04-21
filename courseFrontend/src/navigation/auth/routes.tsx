import { Route } from "react-router-dom";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

export const AuthRoutes = (
  <>
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
  </>
);
