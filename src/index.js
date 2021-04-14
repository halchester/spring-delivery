import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/query";

import firebase from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBNcNDNkPrbB3iR12HJb9Td19NvjmqzLJ4",
  authDomain: "spring-delivery-92316.firebaseapp.com",
  projectId: "spring-delivery-92316",
  storageBucket: "spring-delivery-92316.appspot.com",
  messagingSenderId: "692595265609",
  appId: "1:692595265609:web:35675f2e767f45d727af98",
  measurementId: "G-D9SS6P1WH9",
};

firebase.initializeApp(firebaseConfig);
// analysis(firebaseConfig);

let firebaseAnalytics;
export async function initFirebaseAnalytics() {
  if (!firebaseAnalytics) {
    await require("firebase/analytics");
    firebaseAnalytics = await firebase.analytics();
  }
  return firebaseAnalytics;
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
