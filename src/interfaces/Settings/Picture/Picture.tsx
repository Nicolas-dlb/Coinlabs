/* eslint-disable no-unused-vars */
import React from "react";
import "./Picture.scss";
import { selectProfilPicture } from "utils/utils";

type PictureProps = {
  setPicture: (picture: string) => void;
};

function Picture({ setPicture }: PictureProps) {
  return (
    <div className="settings_picture">
      <h3>Profil picture</h3>
      <div className="settings_picture_container">
        <div className="settings_picture_input">
          <button
            type="button"
            tabIndex={0}
            onKeyDown={() => document.getElementById("picture-input")!.click()}
            onClick={() => document.getElementById("picture-input")!.click()}
            className="set_profil_picture"
          >
            Select file
          </button>
          <input
            id="picture-input"
            type="file"
            accept="image/*"
            onChange={(e) =>
              selectProfilPicture(e, setPicture, "set_picture_message")
            }
            style={{ display: "none" }}
          />
        </div>
        <div id="set_picture_message" className="settings_picture_message">
          <p>Any file selected</p>
        </div>
      </div>
    </div>
  );
}

export default Picture;
