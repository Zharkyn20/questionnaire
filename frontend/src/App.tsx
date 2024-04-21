import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import Router from "./navigation/Router";
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
