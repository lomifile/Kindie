import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import App from "./App";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
      <App />
    </ThemeSwitcherProvider>
  </React.StrictMode>
);
