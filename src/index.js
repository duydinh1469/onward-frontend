import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { refreshService } from "services/api/authenticateAPI";
import { setCookie } from "utils/cookieUtils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (error) => {
      if (error?.cause?.status === 401) {
        try {
          const res = await refreshService();
          setCookie("token", res.data.accessToken, 1);
          queryClient.refetchQueries({
            queryKey: ["user", "auth"],
            exact: true,
          });
        } catch (error) {
          queryClient.setQueryData(["user", "auth"], {
            data: { email: null, role: ["ANONYMOUS"] },
            status: 401,
            statusText: "Unauthorized",
          });
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: async (error) => {
      if (error?.cause?.status === 401) {
        try {
          const res = await refreshService();
          setCookie("token", res.data.accessToken);
          queryClient.refetchQueries({
            queryKey: ["user", "auth"],
            exact: true,
          });
        } catch (error) {
          queryClient.setQueryData(["user", "auth"], {
            data: { email: null, role: ["ANONYMOUS"] },
            status: 401,
            statusText: "Unauthorized",
          });
        }
      }
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // style={{ top: "5rem" }}
      />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
