
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  if (window.location.pathname.startsWith("/hall") && !window.location.hash) {
    window.history.replaceState(
      null,
      "",
      `/#${window.location.pathname}${window.location.search}`,
    );
  }

  createRoot(document.getElementById("root")!).render(<App />);
  
