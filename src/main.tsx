import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// -----------------------------------------------------------
// import { App } from "./0_setup/App";  // with Stage, no light, no shadows enabled
// import { App } from "./1_setup/App"; // shadows enabled, with lights without Stage
// -----------------------------------------------------------
// import { App } from "./2_setup/App";
// -----------------------------------------------------------
// import { App } from "./3_initial_setup_and_loading_model/App";
// import { App } from "./4_nodes_property_of_model/App";
// import { App } from "./5_centering_and_positioning/App";
// import { App } from "./6_portal/App";
// import { App } from "./7_fireflies/App";
import { App } from "./8_shader_material_helper/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
