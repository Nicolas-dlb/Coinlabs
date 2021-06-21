/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "./Login.scss";
import {
  login,
  logout,
  setProfilPic,
} from "redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import {
  loadBalanceHistory,
  setWallets,
} from "redux/reducers/walletsSlice";
import { changeTypeTextToPassword, resetLoginInputValue } from "utils/utils";
import { auth, db } from "firebaseConfig";

function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [picture, setPicture]: any = useState("");
  
  
    document.onload = () =>{
      changeTypeTextToPassword();
    }




  const goToLogin = () => {
    document.getElementById("register")!.style.opacity = "0";
    document.getElementById("register")!.style.pointerEvents = "none";
    document.getElementById("login")!.style.opacity = "1";
    document.getElementById("login")!.style.pointerEvents = "auto";
  };

  const goToRegister = () => {
    document.getElementById("login")!.style.opacity = "0";
    document.getElementById("login")!.style.pointerEvents = "none";
    document.getElementById("register")!.style.opacity = "1";
    document.getElementById("register")!.style.pointerEvents = "auto";
  };
  const loginAnimation = () => {
    document.getElementById("stick1")!.style.animation =
      "load 1.1s 0s infinite linear";
    document.getElementById("stick2")!.style.animation =
      "load 1.1s 0.2s infinite linear";
    document.getElementById("stick3")!.style.animation =
      "load 1.1s 0.4s infinite linear";
    document.getElementById("coinlabs")!.style.transform =
      "translateY(40vh) scale(1.4)";

    document.getElementById("login")!.style.transform = "translateY(80vh)";
  };
  const [userList, setUserList]: any = useState({});
  const length = Object.keys(userList)?.length;
  useEffect(() => {
    db.collection("users")
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
  }, [length]);

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
        auth
          .signInWithEmailAndPassword(email, password)
          .catch((error: Error) => alert(error));
      } else {
        let emailRegistered: string;
        db.collection("users")
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
            auth
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
 
    auth.signInWithEmailAndPassword("johndoe@gmail.com", "johndoe")
      .catch((error: Error) => alert(error));
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout());
      })
      .catch((error: any) => alert(error.messsage));
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
      return;
    }
    loginAnimation();
    /* document.getElementById("login_container")!.style.transform =
      "translateY(-100%)"; */
    setUserList({
      ...userList,
      [userName]: {
        Email: email,
        Password: password,
      },
    });
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth: any) => {
       
        const timelineData = [...Array(110).keys()].map((x) => ({
          total: 20000,
          timestamp: new Date().getTime(),
        }));

        dispatch(loadBalanceHistory(timelineData));
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
              })
            );
            dispatch(setProfilPic(picture));
            dispatch(
              login({
                userName,
                email,
              })
            );
          })
          .then(() => {
            db.collection("users").doc(auth.currentUser?.uid).set(
              {
                username: userName,
                password,
                email,
                time: "Month",
                currency: "Dollar",
                profilPic: picture,
                balanceHistory: timelineData,
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
          <button onClick={handleDemoLogin} type="button">
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
              name="name"
              accept="image/jpeg"
              onChange={(e) => {
                const file = e.target.files![0];
                if (file.type.includes("image")) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);

                  // here we tell the reader what to do when it's done reading...
                  reader.onload = (readerEvent) => {
                    const content = readerEvent.target!.result; // this is the content!

                    setPicture(content);
                    document.getElementById("file_error")!.style.opacity = "0";
                   const color = getComputedStyle(document.documentElement).getPropertyValue('--third-font-color');
                    document.getElementById(
                      "profil_pic"
                    )!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" viewBox="0 0 408 408"><path d="M332 121.9H184.8l-29.3-34.8c-1-1.2-2.5-1.8-4-1.8H32.8C14.6 85.5 0 100.2 0 118.3v214c0 18.2 14.8 32.9 33 33H332c18.2 0 32.9-14.8 33-33v-177.5C364.9 136.7 350.2 121.9 332 121.9z"/><path d="M375.2 79.3H228l-29.3-34.8c-1-1.2-2.5-1.8-4-1.8H76c-16.5 0-30.4 12.2-32.6 28.5h108.3c5.7 0 11.1 2.5 14.7 6.8l25 29.7H332c26 0 47.1 21.1 47.1 47.1v167.5c16.5-2.1 28.9-16.1 28.9-32.7v-177.5C408 94.1 393.3 79.4 375.2 79.3z"/></svg>`;
                  };
                } else {
                  document.getElementById("file_error")!.style.opacity = "1";
                  document.getElementById("profil_pic")!.innerHTML = "+";
                }
              }}
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
    </div>
  );
}

export default Login;
