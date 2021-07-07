/* eslint-disable no-nested-ternary */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-restricted-properties */

import { setLastUpdate, setWallets } from "redux/reducers/walletsSlice";
import { auth, db } from "firebaseConfig";

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
export function lastUpdate(dispatch: any) {
  const date = new Date();
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const month =
    date.getMonth() + 1 >= 10 ? date.getMonth() : `0${date.getMonth() + 1}`;
  dispatch(setLastUpdate(`${day}/${month}`));
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
