/* eslint-disable no-nested-ternary */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-restricted-properties */

import { setLastUpdate, setWallets } from "redux/reducers/walletsSlice";
import { auth, db } from "firebaseConfig";
import { loadHistory } from "redux/reducers/marketSlice";
import { getHistoricalData } from "./api/api";

export function getNumberFixed(v: any, d: number): any {
  return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
}
export function numberWithSpaces(x: any) {
  const parts = x?.toString().split(".");
  if (parts) {
    parts![0] = parts![0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return parts?.join(".");
}
export function lastUpdate(dispatch: any, user: any) {
  const date = new Date();
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const month =
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  dispatch(setLastUpdate(`${day}/${month}`));
  db.collection("users")
    .doc(user)
    .set(
      {
        lastTrade: `${day}/${month}`,
      },
      { merge: true }
    );
}

export const updateUserWallet = (wallet: any, user: any) => {
  db.collection("users").doc(user).set(
    {
      usd: wallet.usd,
      bitcoin: wallet.bitcoin,
      ethereum: wallet.ethereum,
      ripple: wallet.ripple,
      litecoin: wallet.litecoin,
      expenses: wallet.expenses,
      income: wallet.income,
    },
    { merge: true }
  );
};
export const strUcFirst = (a: any) =>
  `${a}`.charAt(0).toUpperCase() + a.substr(1);

export const fetchWallet = (dispatch: any) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .get()
    .then((doc: any) => doc.data())
    .then((data: any) => {
      if (data) {
        dispatch(setWallets(data));
      }
    });
};

export const changeTypeTextToPassword = () => {
  document.getElementById("password")!.setAttribute("type", "password");
  document
    .getElementById("password_register")!
    .setAttribute("type", "password");
};

export const resetLoginInputValue = () => {
  if (document.getElementById("email")) {
    (document.getElementById("email") as HTMLInputElement)!.value = "";
    (document.getElementById("password") as HTMLInputElement)!.value = "";
    (document.getElementById("username_register") as HTMLInputElement)!.value =
      "";
    (document.getElementById("email_register") as HTMLInputElement)!.value = "";
    (document.getElementById("password_register") as HTMLInputElement)!.value =
      "";
    document.getElementById("profil_pic")!.innerHTML = "+";
    document.getElementById("password_advertise")!.style.opacity = "0";
    document.getElementById("email_advertise")!.style.opacity = "0";
    document.getElementById("username_advertise")!.style.opacity = "0";
    document.getElementById("profil_pic")!.innerHTML = "+";
    (document.getElementById("file-input") as HTMLInputElement)!.value = "";
    document.getElementById("log_error")!.style.opacity = "0";
    document.getElementById("file_error")!.style.opacity = "0";
  }
};

export const replaceA = (index: any, replacement: any, card: any) =>
  card.substr(0, index) + replacement + card.substr(index + replacement.length);

export function selectProfilPicture(e: any, setPicture: any, messageId: any) {
  const file = e.target.files![0];
  if (file.type.includes("image")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // here we tell the reader what to do when it's done reading...
    reader.onload = (readerEvent) => {
      const content = readerEvent.target!.result; // this is the content!

      setPicture(content);

      const color = getComputedStyle(document.documentElement).getPropertyValue(
        "--third-font-color"
      );
      if (messageId === "file_error") {
        document.getElementById(messageId)!.style.opacity = "0";
        document.getElementById(
          "profil_pic"
        )!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" viewBox="0 0 408 408"><path d="M332 121.9H184.8l-29.3-34.8c-1-1.2-2.5-1.8-4-1.8H32.8C14.6 85.5 0 100.2 0 118.3v214c0 18.2 14.8 32.9 33 33H332c18.2 0 32.9-14.8 33-33v-177.5C364.9 136.7 350.2 121.9 332 121.9z"/><path d="M375.2 79.3H228l-29.3-34.8c-1-1.2-2.5-1.8-4-1.8H76c-16.5 0-30.4 12.2-32.6 28.5h108.3c5.7 0 11.1 2.5 14.7 6.8l25 29.7H332c26 0 47.1 21.1 47.1 47.1v167.5c16.5-2.1 28.9-16.1 28.9-32.7v-177.5C408 94.1 393.3 79.4 375.2 79.3z"/></svg>`;
      } else if (messageId === "set_picture_message") {
        document.getElementById(messageId)!.style.color =
          "var(--third-font-color)";
        document.getElementById(messageId)!.innerHTML = "Successfully updated";
      }
    };
  } else if (messageId === "file_error") {
    document.getElementById(messageId)!.style.opacity = "1";
    document.getElementById("profil_pic")!.innerHTML = "+";
  } else if (messageId === "set_picture_message") {
    document.getElementById(messageId)!.innerHTML = "Bad file Selected";
    document.getElementById(messageId)!.style.color = "rgb(192, 106, 106)";
  }
}

export const goToLogin = () => {
  document.getElementById("register")!.style.opacity = "0";
  document.getElementById("register")!.style.pointerEvents = "none";
  document.getElementById("login")!.style.opacity = "1";
  document.getElementById("login")!.style.pointerEvents = "auto";
};

export const goToRegister = () => {
  document.getElementById("login")!.style.opacity = "0";
  document.getElementById("login")!.style.pointerEvents = "none";
  document.getElementById("register")!.style.opacity = "1";
  document.getElementById("register")!.style.pointerEvents = "auto";
};
export const loginAnimation = () => {
  document.getElementById("stick1")!.style.animation =
    "load 1.1s 0s infinite linear";
  document.getElementById("stick2")!.style.animation =
    "load 1.1s 0.2s infinite linear";
  document.getElementById("stick3")!.style.animation =
    "load 1.1s 0.4s infinite linear";
  document.getElementById("coinlabs")!.style.transform =
    "translateY(40vh) scale(1.4)";

  document.getElementById("login")!.style.transform = "translateY(80vh)";
  document.getElementById("register")!.style.transform = "translateY(90vh)";
};
export const valideRegister = (
  password: string,
  email: string,
  userName: string,
  picture: string,
  emailExist: any
) => {
  if (!password && !email && !userName) {
    document.getElementById("username_advertise")!.innerHTML =
      "Username required";
    document.getElementById("username_advertise")!.style.opacity = "1";
    document.getElementById("email_advertise")!.innerHTML = "Email required";
    document.getElementById("email_advertise")!.style.opacity = "1";

    document.getElementById("password_advertise")!.innerHTML =
      "Password required";
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
    document.getElementById("password_advertise")!.style.opacity = "0";
    return;
  }
  if (password.length >= 6 && !email && userName) {
    document.getElementById("username_advertise")!.innerHTML = "";
    document.getElementById("username_advertise")!.style.opacity = "0";
    document.getElementById("email_advertise")!.innerHTML = "Email required";
    document.getElementById("email_advertise")!.style.opacity = "1";

    document.getElementById("password_advertise")!.innerHTML = "";
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
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
    document.getElementById("password_advertise")!.style.width = "fit-content";
    document.getElementById("password_advertise")!.style.opacity = "1";
    return;
  }
  if (password.length < 6) {
    document.getElementById("password_advertise")!.innerHTML =
      "Password must contain at least 6 characters";
    document.getElementById("password_advertise")!.style.width = "18vh";
    document.getElementById("password_advertise")!.style.opacity = "1";
  }
};
export const checkVariation = (dispatch: any) => {
  let ethereumMonth1: number;
  let ethereum3Month1: number;
  let ethereum6Month1: number;
  let ethereumYear1: number;
  let ethereumWeek1: number;

  let bitcoinMonth1: number;
  let bitcoin6Month1: number;
  let bitcoin3Month1: number;
  let bitcoinYear1: number;
  let bitcoinWeek1: number;

  let rippleMonth1: number;
  let ripple6Month1: number;
  let ripple3Month1: number;
  let rippleYear1: number;
  let rippleWeek1: number;

  let litecoinMonth1: number;
  let litecoin6Month1: number;
  let litecoin3Month1: number;
  let litecoinYear1: number;
  let litecoinWeek1: number;

  let neo6Month1: number;
  let neoMonth1: number;
  let neo3Month1: number;
  let neoYear1: number;
  let neoWeek1: number;

  let bitcoinCap1: number;
  let ethereumCap1: number;
  let rippleCap1: number;
  let litecoinCap1: number;
  let neoCap1: number;

  const get = () => {
    let now: number | Date | any = new Date();
    let lastMonth: number | Date | any = new Date();
    let lastYear: number | Date | any = new Date();
    let lastDay: number | Date | any = new Date();
    let lastWeek: number | Date | any = new Date();
    let last3Month: number | Date | any = new Date();
    let last6Month: number | Date | any = new Date();
    now = now.getTime();
    now = (now - (now % 1000)) / 1000;

    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth = (lastMonth - (lastMonth % 1000)) / 1000;

    last3Month.setMonth(last3Month.getMonth() - 3);
    last3Month = (last3Month - (last3Month % 1000)) / 1000;

    last6Month.setMonth(last6Month.getMonth() - 6);
    last6Month = (last6Month - (last6Month % 1000)) / 1000;

    lastYear.setYear(lastYear.getFullYear() - 1);
    lastYear = (lastYear - (lastYear % 1000)) / 1000;

    lastDay.setDate(lastDay.getDate() - 1);
    lastDay = (lastDay - (lastDay % 1000)) / 1000;

    lastWeek.setDate(lastWeek.getDate() - 7);
    lastWeek = (lastWeek - (lastWeek % 1000)) / 1000;

    getHistoricalData("ethereum", lastMonth, now).then((data: any) => {
      ethereumMonth1 = data?.prices;
    });
    getHistoricalData("ethereum", last3Month, now).then((data: any) => {
      ethereum3Month1 = data?.prices;
    });
    getHistoricalData("ethereum", last6Month, now).then((data: any) => {
      ethereum6Month1 = data?.prices;
    });

    getHistoricalData("ethereum", lastYear, now).then((data: any) => {
      ethereumYear1 = data?.prices;
    });
    getHistoricalData("ethereum", lastWeek, now).then((data: any) => {
      ethereumWeek1 = data?.prices;
      ethereumCap1 = data?.market_caps;
    });
    getHistoricalData("bitcoin", lastMonth, now).then((data: any) => {
      bitcoinMonth1 = data?.prices;
    });
    getHistoricalData("bitcoin", last6Month, now).then((data: any) => {
      bitcoin6Month1 = data?.prices;
    });
    getHistoricalData("bitcoin", last3Month, now).then((data: any) => {
      bitcoin3Month1 = data?.prices;
    });

    getHistoricalData("bitcoin", lastYear, now).then((data: any) => {
      bitcoinYear1 = data?.prices;
    });
    getHistoricalData("bitcoin", lastWeek, now).then((data: any) => {
      bitcoinWeek1 = data?.prices;
      bitcoinCap1 = data?.market_caps;
    });
    getHistoricalData("ripple", lastMonth, now).then((data: any) => {
      rippleMonth1 = data?.prices;
    });
    getHistoricalData("ripple", last6Month, now).then((data: any) => {
      ripple6Month1 = data?.prices;
    });
    getHistoricalData("ripple", last3Month, now).then((data: any) => {
      ripple3Month1 = data?.prices;
    });

    getHistoricalData("ripple", lastYear, now).then((data: any) => {
      rippleYear1 = data?.prices;
    });
    getHistoricalData("ripple", lastWeek, now).then((data: any) => {
      rippleWeek1 = data?.prices;
      rippleCap1 = data?.market_caps;
    });

    getHistoricalData("litecoin", last6Month, now).then((data: any) => {
      litecoin6Month1 = data?.prices;
    });
    getHistoricalData("litecoin", last3Month, now).then((data: any) => {
      litecoin3Month1 = data?.prices;
    });
    getHistoricalData("litecoin", lastYear, now).then((data: any) => {
      litecoinYear1 = data?.prices;
    });
    getHistoricalData("litecoin", lastWeek, now).then((data: any) => {
      litecoinWeek1 = data?.prices;
      litecoinCap1 = data?.market_caps;
    });
    getHistoricalData("litecoin", lastMonth, now).then((data: any) => {
      litecoinMonth1 = data?.prices;
    });
    getHistoricalData("neo", lastMonth, now).then((data: any) => {
      neoMonth1 = data?.prices;
    });
    getHistoricalData("neo", last6Month, now).then((data: any) => {
      neo6Month1 = data?.prices;
    });
    getHistoricalData("neo", last3Month, now).then((data: any) => {
      neo3Month1 = data?.prices;
    });

    getHistoricalData("neo", lastYear, now).then((data: any) => {
      neoYear1 = data?.prices;
    });
    getHistoricalData("neo", lastWeek, now).then((data: any) => {
      neoWeek1 = data?.prices;
      neoCap1 = data?.market_caps;
    });
  };
  get();
  const load2 = () => {
    if (
      bitcoinMonth1 &&
      bitcoinYear1 &&
      bitcoin3Month1 &&
      bitcoin6Month1 &&
      ethereumYear1 &&
      ethereum6Month1 &&
      ethereum3Month1 &&
      ethereumMonth1 &&
      ripple6Month1 &&
      ripple3Month1 &&
      rippleYear1 &&
      rippleMonth1 &&
      litecoin6Month1 &&
      litecoin3Month1 &&
      litecoinYear1 &&
      litecoinMonth1 &&
      neo6Month1 &&
      neo3Month1 &&
      neoYear1 &&
      neoMonth1
    ) {
      dispatch(
        loadHistory({
          bitcoinMonth: bitcoinMonth1,
          bitcoinYear: bitcoinYear1,
          bitcoin3Month: bitcoin3Month1,
          bitcoin6Month: bitcoin6Month1,

          ethereumYear: ethereumYear1,
          ethereum3Month: ethereum3Month1,
          ethereum6Month: ethereum6Month1,
          ethereumMonth: ethereumMonth1,

          ripple3Month: ripple3Month1,
          ripple6Month: ripple6Month1,
          rippleYear: rippleYear1,
          rippleMonth: rippleMonth1,

          litecoin3Month: litecoin3Month1,
          litecoin6Month: litecoin6Month1,
          litecoinMonth: litecoinMonth1,
          litecoinYear: litecoinYear1,

          neo3Month: neo3Month1,
          neo6Month: neo6Month1,
          neoYear: neoYear1,
          neoMonth: neoMonth1,
        })
      );
    } else {
      setTimeout(() => {
        load2();
      }, 10);
    }
  };
  const load = () => {
    if (
      bitcoinWeek1 &&
      ethereumWeek1 &&
      rippleWeek1 &&
      litecoinWeek1 &&
      neoWeek1 &&
      bitcoinCap1 &&
      ethereumCap1 &&
      rippleCap1 &&
      litecoinCap1 &&
      neoCap1
    ) {
      dispatch(
        loadHistory({
          bitcoinCap: bitcoinCap1,
          litecoinCap: litecoinCap1,
          rippleCap: rippleCap1,
          ethereumCap: ethereumCap1,
          neoCap: neoCap1,

          bitcoinWeek: bitcoinWeek1,
          ethereumWeek: ethereumWeek1,
          rippleWeek: rippleWeek1,
          litecoinWeek: litecoinWeek1,
          neoWeek: neoWeek1,
        })
      );
    } else {
      setTimeout(() => {
        load();
      }, 10);
    }
  };

  load();
  load2();
};
export const updateWallet = (item: any) => {
  if (auth.currentUser && item?.length > 0) {
    db.collection("users").doc(auth.currentUser?.uid).set(
      {
        item,
      },
      { merge: true }
    );
  }
};
