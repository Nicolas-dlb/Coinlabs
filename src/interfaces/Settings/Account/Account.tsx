import "./Account.scss";
import React from "react";
import {
  selectProfilPic,
  selectUserEmail,
  selectUserName,
} from "redux/reducers/userSlice";
import { useSelector } from "react-redux";
import { auth } from "firebaseConfig";

function Account() {
  const profilPic = useSelector(selectProfilPic);
  const username = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);
  return (
    <div className="settings_account">
      <h3 className="account">Account</h3>
      <div className="user_card">
        <div className="user_card_img">
          <img
            src={
              profilPic ||
              "https://www.vhv.rs/dpng/d/164-1645859_selfie-clipart-groucho-glass-good-profile-hd-png.png"
            }
            alt=""
          />
          <div className="point" />
        </div>
        <div className="user_card_info">
          <h3>{username}</h3>
          <h5>{email}</h5>
          <div className="change_user">
            <p>Not you?</p>
            <span
              className="change"
              tabIndex={0}
              role="button"
              onKeyDown={() => {
                auth.signOut();
              }}
              onClick={() => {
                auth.signOut();
              }}
            >
              Change User
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
