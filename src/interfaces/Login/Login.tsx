/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Login.scss";
import { login, setProfilPic } from "redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import {
  loadBalanceHistory,
  loadCryptoHistory,
  loadExpensesHistory,
  loadIncomeHistory,
  setWallets,
} from "redux/reducers/walletsSlice";
import {
  changeTypeTextToPassword,
  goToLogin,
  goToRegister,
  lastUpdate,
  loginAnimation,
  resetLoginInputValue,
  selectProfilPicture,
  valideRegister,
} from "utils/utils";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Register from "./Register/Register";

function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [picture, setPicture]: any = useState("");

  document.onload = () => {
    changeTypeTextToPassword();
  };

  const [userList, setUserList]: any = useState({});
  const length = Object.keys(userList)?.length;
  useEffect(() => {
    const getUserList = () => {
      firebase
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((User: any) => {
            const USER = User.data().username;
            const PASSWORD = User.data().password;
            const EMAIL = User.data().email;
            setUserList({
              ...userList,
              [USER]: {
                Email: EMAIL,
                Password: PASSWORD,
              },
            });
          });
        });
    };
    return getUserList;
  }, [length]);
  // let baseEmail: any;
  const handleLogin = () => {
    let thisUsername: string = "name";
    Object.entries(userList).forEach((thisUser: any) => {
      if (thisUser[1].Email === email) {
        thisUsername = thisUser[0];
      }
    });

    if (
      (!userList[email] && userList[thisUsername]?.Email !== email) ||
      !email ||
      (!email &&
        userList[email]?.Password !== password &&
        userList[thisUsername]?.Password !== password) ||
      (!password && !email)
    ) {
      // bad email

      document.getElementById("log_error")!.style.opacity = "1";
    }
    if (
      (userList[email]?.Password !== password &&
        userList[thisUsername]?.Password !== password) ||
      !password ||
      (!password && !email)
    ) {
      // bad password

      document.getElementById("log_error")!.style.opacity = "1";
    } else if (
      (!userList[email] &&
        userList[thisUsername]?.Email !== email &&
        userList[email]?.Password !== password &&
        userList[thisUsername]?.Password !== password) ||
      (!password && !email) ||
      (!userList[email] && userList[thisUsername]?.Email !== email && !password)
    ) {
      // bad email && password
      document.getElementById("email_error")!.innerHTML = "User not found";
      document.getElementById("email_error")!.style.opacity = "1";
    }
    if (
      (userList[email] && userList[email].Password === password) ||
      (userList[thisUsername]?.Email === email &&
        userList[thisUsername]?.Password === password)
    ) {
      setEmail("");
      setPassword("");
      loginAnimation();

      if (email.includes("@")) {
        // db.collection("users")
        //   .get()
        //   .then((querySnapshot: any) => {
        //     querySnapshot.forEach((User: any) => {
        //       if (User.data().email === email) {

        //         baseEmail = User.data().baseEmail;
        //          console.log(baseEmail);
        //       }
        //     });
        //   });
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch((error: Error) => alert(error));
      } else {
        let emailRegistered: string;
        firebase
          .firestore()
          .collection("users")
          .get()
          .then((querySnapshot: any) => {
            querySnapshot.forEach((doc: any) => {
              if (doc.data().username === email) {
                emailRegistered = doc.data().email;
              }
            });
          });

        const checkUsername = () => {
          if (!emailRegistered) {
            setTimeout(() => {
              checkUsername();
            }, 10);
          } else {
            firebase
              .auth()
              .signInWithEmailAndPassword(emailRegistered, password)
              .catch((error: Error) => alert(error));
          }
        };
        checkUsername();
      }
    }
  };

  const handleDemoLogin = () => {
    loginAnimation();

    firebase
      .auth()
      .signInWithEmailAndPassword("devonlane@gmail.com", "devonlane")
      .catch((error: Error) => alert(error));
  };

  const emailExist = (mail: any) => {
    let r = false;
    const list = Object.entries(userList);

    list.forEach((item: any) => {
      if (item[1].Email === mail) {
        r = true;
      }
    });
    return r;
  };

  const register = () => {
    if (!password && !email && !userName) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML = "Email required";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password required";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      document.getElementById("password_register")!.classList.add("bad_input");
      document.getElementById("email_register")!.classList.add("bad_input");

      document.getElementById("username_register")!.classList.add("bad_input");
      return;
    }
    if (
      !password &&
      (!email.includes("@") ||
        (!email.includes(".com") && !email.includes(".fr"))) &&
      !userName
    ) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML =
        "Email is badly formatted";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password required";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }

    if (
      password.length < 6 &&
      email &&
      (!email.includes("@") ||
        (!email.includes(".com") && !email.includes(".fr"))) &&
      !userName
    ) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML =
        "Email is badly formatted";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password must contain at least 6 characters";
      document.getElementById("password_advertise")!.style.width = "10vw";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }

    if (!password && emailExist(email) && !userName) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML =
        "Email is already registered";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password required";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (password.length < 6 && !email && !userName) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML = "Email required";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password must contain at least 6 charachters";
      document.getElementById("password_advertise")!.style.width = "10vw";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (password && password.length < 6 && !email && userName) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML = "Email required";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password must contain at least 6 charachters";
      document.getElementById("password_advertise")!.style.width = "10vw";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (!password && !email && userName) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML = "Email required";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password required";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (password.length >= 6 && !email && !userName) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML = "Email required";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML = "";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "0";
      return;
    }
    if (
      password &&
      password.length < 6 &&
      email &&
      !emailExist(email) &&
      userName
    ) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML = "";
      document.getElementById("email_advertise")!.style.opacity = "0";

      document.getElementById("password_advertise")!.innerHTML =
        "Password must contain at least 6 charachters";
      document.getElementById("password_advertise")!.style.width = "10vw";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (
      !password &&
      email &&
      (email.includes("@") ||
        (email.includes(".com") && email.includes(".fr"))) &&
      !emailExist(email) &&
      !userName
    ) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML = "";
      document.getElementById("email_advertise")!.style.opacity = "0";

      document.getElementById("password_advertise")!.innerHTML =
        "Password required";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (
      password.length >= 6 &&
      email &&
      (email.includes("@") ||
        (email.includes(".com") && email.includes(".fr"))) &&
      !emailExist(email) &&
      userName
    ) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML = "";
      document.getElementById("email_advertise")!.style.opacity = "0";

      document.getElementById("password_advertise")!.innerHTML = "";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "0";
    }
    if (
      password.length >= 6 &&
      email &&
      (!email.includes("@") ||
        (!email.includes(".com") && !email.includes(".fr"))) &&
      !emailExist(email) &&
      userName
    ) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML =
        "Email is badly formatted";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML = "";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "0";
      return;
    }
    if (
      password.length >= 6 &&
      email &&
      (!email.includes("@") ||
        (!email.includes(".com") && !email.includes(".fr"))) &&
      !userName
    ) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML =
        "Email is badly formatted";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML = "";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "0";
      return;
    }
    if (
      password.length >= 6 &&
      email &&
      (email.includes("@") ||
        (email.includes(".com") && email.includes(".fr"))) &&
      emailExist(email) &&
      !userName
    ) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML =
        "Email already registered";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML = "";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "0";
      return;
    }
    if (
      password.length >= 6 &&
      email &&
      (email.includes("@") ||
        (email.includes(".com") && email.includes(".fr"))) &&
      !emailExist(email) &&
      !userName
    ) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML = "";
      document.getElementById("email_advertise")!.style.opacity = "0";

      document.getElementById("password_advertise")!.innerHTML = "";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "0";
      return;
    }
    if (password.length >= 6 && !email && userName) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML = "Email required";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML = "";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "0";
      return;
    }
    if (
      password.length >= 6 &&
      (!email.includes("@") ||
        (!email.includes(".com") && !email.includes(".fr"))) &&
      userName
    ) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML =
        "Email is badly formatted";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML = "";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "0";
      return;
    }
    if (password.length >= 6 && emailExist(email) && !userName) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML =
        "Email already registered";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML = "";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "0";
      return;
    }
    if (password.length >= 6 && emailExist(email) && userName) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML =
        "Email already registered";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML = "";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "0";
      return;
    }
    if (
      !password &&
      email &&
      (!email.includes("@") ||
        (!email.includes(".com") && !email.includes(".fr"))) &&
      userName
    ) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML =
        "Email is badly formatted";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password required";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (
      !password &&
      email &&
      (email.includes("@") ||
        (email.includes(".com") && email.includes(".fr"))) &&
      emailExist(email) &&
      userName
    ) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML =
        "Email is already registered";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password required";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (
      !password &&
      email &&
      (email.includes("@") ||
        (email.includes(".com") && email.includes(".fr"))) &&
      !emailExist(email) &&
      userName
    ) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML = "";
      document.getElementById("email_advertise")!.style.opacity = "0";

      document.getElementById("password_advertise")!.innerHTML =
        "Password required";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (
      password.length < 6 &&
      email &&
      (email.includes("@") ||
        (email.includes(".com") && email.includes(".fr"))) &&
      !emailExist(email) &&
      !userName
    ) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      document.getElementById("email_advertise")!.innerHTML = "";
      document.getElementById("email_advertise")!.style.opacity = "0";

      document.getElementById("password_advertise")!.innerHTML =
        "Password must contain at least 6 characters";
      document.getElementById("password_advertise")!.style.width = "10vw";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }

    if (!password && emailExist(email) && userName) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML =
        "Email already registered";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password required";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (password.length < 6 && emailExist(email) && userName) {
      document.getElementById("username_advertise")!.innerHTML = "";
      document.getElementById("username_advertise")!.style.opacity = "0";
      document.getElementById("email_advertise")!.innerHTML =
        "Email already registered";
      document.getElementById("email_advertise")!.style.opacity = "1";

      document.getElementById("password_advertise")!.innerHTML =
        "Password must contain at least 6 characters";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (!userName) {
      document.getElementById("username_advertise")!.innerHTML =
        "Username required";
      document.getElementById("username_advertise")!.style.opacity = "1";
      return;
    }
    if (!email) {
      document.getElementById("email_advertise")!.innerHTML = "Email required";
      document.getElementById("email_advertise")!.style.opacity = "1";
      return;
    }
    if (
      !email.includes("@") ||
      (!email.includes(".com") && !email.includes(".fr"))
    ) {
      document.getElementById("email_advertise")!.innerHTML =
        "Email is badly formatted";
      document.getElementById("email_advertise")!.style.opacity = "1";
      return;
    }
    if (emailExist(email)) {
      document.getElementById("email_advertise")!.innerHTML =
        "Email already registered";
      document.getElementById("email_advertise")!.style.opacity = "1";
      return;
    }

    if (!password) {
      document.getElementById("password_advertise")!.innerHTML =
        "Password required";
      document.getElementById("password_advertise")!.style.width =
        "fit-content";
      document.getElementById("password_advertise")!.style.opacity = "1";
      return;
    }
    if (password.length < 6) {
      document.getElementById("password_advertise")!.innerHTML =
        "Password must contain at least 6 characters";
      document.getElementById("password_advertise")!.style.width = "18vh";
      document.getElementById("password_advertise")!.style.opacity = "1";
    }
    loginAnimation();

    setUserList({
      ...userList,
      [userName]: {
        Email: email,
        Password: password,
      },
    });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth: any) => {
        const timelineDefault = [...Array(101).keys()].map((x) => ({
          total: 0,
          timestamp: new Date().getTime(),
        }));

        dispatch(loadCryptoHistory(timelineDefault));
        dispatch(loadIncomeHistory(timelineDefault));
        dispatch(loadExpensesHistory(timelineDefault));
        dispatch(loadBalanceHistory(timelineDefault));
        userAuth.user
          .updateProfile({
            displayName: userName,
          })
          .then(() => {
            dispatch(
              setWallets({
                usd: 20000,
                bitcoin: 0,
                ethereum: 0,
                ripple: 0,
                litecoin: 0,
                neo: 0,
                litecoinPrice: 0,
                ethereumPrice: 0,
                bitcoinPrice: 0,
                ripplePrice: 0,
                neoPrice: 0,
                TotalCrypto: 0,
                income: 0,
                expenses: 0,
              })
            );
            lastUpdate(dispatch);
            dispatch(setProfilPic(picture));
            dispatch(
              login({
                userName,
                email,
              })
            );
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser?.uid)
              .set(
                {
                  username: userName,
                  password,
                  email,
                  // baseEmail: email,

                  profilPic: picture,
                  balanceHistory: timelineDefault,
                  cryptoHistory: timelineDefault,
                  expensesHistory: timelineDefault,
                  incomeHistory: timelineDefault,
                },
                { merge: true }
              );
          });
      })
      .catch((error: Error) => alert(error));
    setPicture(null);
    setUserName("");
    setPassword("");
    setEmail("");
  };

  return (
    <div id="login_container" className="login-container">
      <div id="coinlabs" className="coinlabs">
        <div id="stick1" className="stick1" />
        <div id="stick2" className="stick2" />
        <div id="stick3" className="stick3" />
        <p>Coinlabs</p>
      </div>
      <div id="login" className="login">
        <p className="welcome">Welcome</p>
        <h3>Log into your account</h3>
        <p id="log_error" className="bad_log">
          Username or password incorrect
        </p>

        <div className="input">
          <label htmlFor="email">
            <div className="input_header">
              <p>E-mail or Username</p>
              <p id="email_error" className="input_advertise" />
            </div>
            <input
              placeholder="Enter your e-mail or username"
              type="text"
              id="email"
              autoComplete="off"
              spellCheck="false"
              onChange={(event) => {
                document
                  .getElementById("email")!
                  .classList.remove("anime_bad_input");
                document
                  .getElementById("password")!
                  .classList.remove("anime_bad_input");
                setEmail(event.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div className="input_header">
              <p>Password</p>
              <p id="password_error" className="input_advertise" />
            </div>
            <input
              type="text"
              onFocus={changeTypeTextToPassword}
              placeholder="Enter your password"
              autoComplete="off"
              id="password"
              onChange={(event) => {
                document
                  .getElementById("password")!
                  .classList.remove("anime_bad_input");
                document
                  .getElementById("email")!
                  .classList.remove("anime_bad_input");
                setPassword(event.target.value);
              }}
            />
          </label>
        </div>

        <div className="button">
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <button id="btn-demo-login" onClick={handleDemoLogin} type="button">
            Demo Login
          </button>
        </div>
        <div className="not_register">
          <p>Not registered yet?</p>
          <p
            onKeyDown={() => {
              setTimeout(() => {
                resetLoginInputValue();
              }, 700);
              goToRegister();
            }}
            onClick={() => {
              setTimeout(() => {
                resetLoginInputValue();
              }, 700);
              goToRegister();
            }}
            className="to_register"
          >
            Register{" "}
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
      <Register
        setEmail={setEmail}
        setPassword={setPassword}
        setPicture={setPicture}
        setUserName={setUserName}
        register={register}
      />
    </div>
  );
}

export default Login;
