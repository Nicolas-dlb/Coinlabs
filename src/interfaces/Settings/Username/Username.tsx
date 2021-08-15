import React from "react";
import "./Username.scss";

type UsernameProps = {
  onClick: () => void;
};

function Username({ onClick }: UsernameProps) {
  return (
    <div className="settings_username">
      <h3>Username</h3>

      <div className="settings_username_input">
        <div className="input">
          <p>@</p>
          <input
            placeholder="Enter username"
            type="text"
            id="change_username"
            className="username_element"
            spellCheck="false"
            autoComplete="off"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onClick();
              }
            }}
          />
        </div>
        <button className="btn_settings" type="button" onClick={onClick}>
          Update
        </button>
      </div>
    </div>
  );
}

export default Username;
