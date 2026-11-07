import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./style.css";
import "./studio-layout.css";
import "./classic-player.css";
import "./audio-workbench.css";
import "./desktop-workspace.css";
import "./hardware-studio.css";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
