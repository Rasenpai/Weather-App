import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Weather from "../src/Weather";
import "remixicon/fonts/remixicon.css";
import "boxicons";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Weather />
  </StrictMode>
);
