import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
// MUI theme
import { darkTheme } from "./styles/theme.jsx";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
// App
import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
// AWS Amplify
import awsConfig from "./aws-exports";
import Amplify from "aws-amplify";
import { AmplifyProvider } from "@aws-amplify/ui-react";
Amplify.configure(awsConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <AmplifyProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AmplifyProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
