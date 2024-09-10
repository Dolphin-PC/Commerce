import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
try {
    createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
}
catch (error) {
    document.getElementById("root").innerHTML = `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100vh;
      text-align: center;
    ">
      <h1 style="font-size: 50px">React App 오류</h1>
      
    </div>
  `;
    console.error(error);
}
