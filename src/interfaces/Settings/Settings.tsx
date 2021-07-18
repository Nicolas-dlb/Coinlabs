/* eslint-disable no-unused-vars */
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserName,
  setProfilPic,
  setUsername,
} from "redux/reducers/userSlice";
import "./Settings.scss";
import $ from "jquery";
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
    firebase.auth().currentUser!.updateProfile({
      displayName: value,
    });
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .set(
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
    if (userName && picture.split("").length > 1) {
      dispatch(setProfilPic(picture));
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser?.uid)
        .set(
          {
            profilPic: picture,
          },
          { merge: true }
        );
    }
  }, [picture]);

  return (
    <div id="settings" className="settings">
      <p className="page-title">Settings</p>
      <Account />
      <div className="settings_top">
        <div className="settings_top_left">
          <Picture setPicture={setPicture} />
        </div>
        <div className="settings_top_right">
          <Theme />
        </div>
      </div>

      <Username onClick={changeUsername} />
      <Email />
      <Founds />
      <Theme />
    </div>
  );
}

export default Settings;
