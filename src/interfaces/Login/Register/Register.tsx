/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import {
  changeTypeTextToPassword,
  goToLogin,
  resetLoginInputValue,
  selectProfilPicture,
} from "utils/utils";

type RegisterProps = {
  setEmail: (email: string) => void;
  setUserName: (userName: string) => void;
  setPicture: (picture: string) => void;
  setPassword: (password: string) => void;
  register: () => void;
};

function Register({
  setEmail,
  setUserName,
  setPicture,
  setPassword,
  register,
}: RegisterProps) {
  return (
    <div className="register_container">
      <div id="register" className="register">
        <h3>Create your account</h3>
        <div className="input">
          <label htmlFor="username">
            <div className="input_header">
              <p>Username</p>
              <p id="username_advertise" className="input_advertise" />
            </div>
            <input
              placeholder="Enter your username"
              type="text"
              id="username_register"
              autoComplete="off"
              spellCheck="false"
              onChange={(event) => setUserName(event.target.value)}
            />
          </label>
          <label htmlFor="email">
            <div className="input_header">
              <p>E-mail</p>
              <p id="email_advertise" className="input_advertise" />
            </div>
            <input
              placeholder="Enter your e-mail"
              type="text"
              id="email_register"
              autoComplete="off"
              spellCheck="false"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label htmlFor="password">
            <div className="input_header">
              <p>Password</p>
              <p id="password_advertise" className="input_advertise" />
            </div>
            <input
              type="text"
              onFocus={changeTypeTextToPassword}
              placeholder="Enter your password"
              autoComplete="off"
              id="password_register"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <div className="picture">
            <p>Profil picture</p>

            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => document.getElementById("file-input")!.click()}
              onClick={() => document.getElementById("file-input")!.click()}
              className="profil_pic"
              id="profil_pic"
            >
              +
            </div>
            <p id="file_error" className="file_error">
              File selected is not an image
            </p>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => selectProfilPicture(e, setPicture, "file_error")}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="button">
          <button type="button" onClick={register}>
            Sign Up
          </button>
        </div>
        <div className="not_register">
          <p>Already have an account?</p>
          <p
            onKeyDown={() => {
              setTimeout(() => {
                resetLoginInputValue();
              }, 700);
              goToLogin();
            }}
            onClick={() => {
              setTimeout(() => {
                resetLoginInputValue();
              }, 700);
              goToLogin();
            }}
            className="to_login"
          >
            Login{" "}
            <svg
              width="12px"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 492 492"
            >
              <path d="M464.3 207.4l0.8 0.2H135.9l103.5-103.7c5.1-5.1 7.8-11.9 7.8-19.1 0-7.2-2.8-14-7.8-19.1L223.3 49.5c-5.1-5.1-11.8-7.9-19-7.9 -7.2 0-14 2.8-19 7.8L7.8 226.9C2.8 232 0 238.8 0 246c0 7.2 2.8 14 7.8 19.1l177.4 177.4c5.1 5.1 11.8 7.8 19 7.8 7.2 0 13.9-2.8 19-7.8l16.1-16.1c5.1-5.1 7.8-11.8 7.8-19 0-7.2-2.8-13.6-7.8-18.7L134.7 284.4h330c14.8 0 27.3-12.8 27.3-27.6v-22.8C492 219.2 479.2 207.4 464.3 207.4z" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
