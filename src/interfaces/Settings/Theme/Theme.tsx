import React, { useState } from "react";
import "./Theme.scss";

function Theme() {
  const [activeTheme, setActiveTheme] = useState("Dark");
  return (
    <div className="settings_theme">
      <h3>Theme</h3>
      <div className="settings_theme_container">
        <button
          onClick={() => setActiveTheme("Dark")}
          type="button"
          className={
            activeTheme === "Dark" ? "btn-theme btn_theme_active" : "btn-theme"
          }
        >
          Dark
        </button>
        <button
          onClick={() => setActiveTheme("Grey")}
          type="button"
          className={
            activeTheme === "Grey" ? "btn-theme btn_theme_active" : "btn-theme"
          }
        >
          Grey
        </button>
      </div>
    </div>
  );
}

export default Theme;
