import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n";
import "./index.css";

const baseHtmlClasses = ["scroll-smooth"];
const baseBodyClasses = [
  "m-0",
  "min-w-[320px]",
  "antialiased",
];

document.documentElement.classList.add(...baseHtmlClasses);
document.documentElement.style.colorScheme = "dark";
document.body.classList.add(...baseBodyClasses);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
