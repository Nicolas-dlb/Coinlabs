/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserEmail } from "redux/reducers/userSlice";
import "./Email.scss";
import $ from "jquery";
import { auth, db } from "firebaseConfig";

function Email() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const changeEmail = () => {
    const user = auth.currentUser!;
    const newEmail: any = $("#set_email").val();
    user
      .updateEmail(newEmail)
      .then(() => {
        // Update successful
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    db.collection("users").doc(auth.currentUser?.uid).set(
      {
        email: newEmail,
      },
      { merge: true }
    );
    dispatch(setUserEmail(newEmail));
    setUserEmail(newEmail);
    $("#set_email").val("");
  };

  // const updateEmail = (newEmail: string) => {
  //   db.collection("users")
  //     .doc(auth.currentUser!.uid)
  //     .set({ email: newEmail }, { merge: true });
  // };

  // useEffect(() => {
  //   updateEmail(email);
  // }, [email]);
  return (
    <div className="settings_email">
      <h3>Email</h3>
      <div className="settings_email_input">
        <div className="input input_settings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="489"
            height="489"
            viewBox="0 0 489.2 489.2"
            className="email_icon"
          >
            <polygon points="0 386.6 143.5 214.9 0 99.6 " />
            <polygon points="489.2 386.6 489.2 99.6 345.6 214.9 " />
            <polygon points="487.9 398.7 489.2 398.7 489.2 397.7 " />
            <polygon points="0 398.7 1.2 398.7 0 397.7 " />
            <polygon points="480.8 398.7 479.9 397.7 334.6 223.7 244.6 296.1 154.6 223.7 9.2 397.7 8.4 398.7 " />
            <polygon points="152.6 204 158.1 208.5 163.6 212.9 244.6 277.9 325.5 212.9 331 208.5 336.5 204 477.9 90.5 11.3 90.5 " />
          </svg>
          <input
            id="set_email"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter new email"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                changeEmail();
              }
            }}
          />
        </div>
        <button onClick={changeEmail} type="button" className="btn_settings">
          Update
        </button>
      </div>
    </div>
  );
}

export default Email;
