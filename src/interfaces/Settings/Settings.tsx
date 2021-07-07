/* eslint-disable no-unused-vars */
import { auth, db } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserName,
  setProfilPic,
  setUserEmail,
  setUsername,
} from "redux/reducers/userSlice";
import "./Settings.scss";
import $ from "jquery";
import { selectProfilPicture } from "utils/utils";
import { selectWallets, setWallets } from "redux/reducers/walletsSlice";
import * as admin from "firebase-admin";
import Account from "./Account/Account";
import Picture from "./Picture/Picture";
import Username from "./Username/Username";
import Email from "./Email/Email";
import Founds from "./Founds/Founds";
import Theme from "./Theme/Theme";

function Settings() {
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);

  const userEmail = useSelector(selectUserEmail);

  const [userName, setUserName] = useState(username);

  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (username) {
      setUserName(username);
      $("#change_username").val(username);
    }
  }, [username]);

  const changeUsername = () => {
    const value: any = $("#change_username").val();

    db.collection("users").doc(auth.currentUser?.uid).set(
      {
        username: value,
      },
      { merge: true }
    );
    dispatch(setUsername(value));
    setUserName(value);
    $("#change_username").val();
  };

  useEffect(() => {
    dispatch(setProfilPic(picture));
    db.collection("users").doc(auth.currentUser?.uid).set(
      {
        profilPic: picture,
      },
      { merge: true }
    );
  }, [picture]);

  return (
    <div id="settings" className="settings">
      <p className="page-title">Settings</p>
      <div className="settings_top">
        <div className="settings_top_left">
          <Account />
        </div>
        <div className="settings_top_right">
          <Theme />
        </div>
      </div>
      <Picture setPicture={setPicture} />
      <Username onClick={changeUsername} />
      <Email />
      <Founds />
      <Theme />
    </div>
  );
}

export default Settings;
