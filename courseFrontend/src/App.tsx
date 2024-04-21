import { ToastContainer } from "react-toastify";
import Router from "./navigation/Router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/query_client";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
