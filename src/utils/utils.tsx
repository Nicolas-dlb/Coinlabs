/* eslint-disable no-nested-ternary */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */

import { setWallets } from "redux/reducers/walletsSlice";
import { auth, db } from "firebaseConfig";

/* eslint-disable no-restricted-properties */

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
export const getCurrency = (currency: any) =>
  currency === "usd" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.6 511.6"
      fill="#605b95"
      width="14px"
      height="13px"
    >
      <path d="M385.3 311.5c-2.5-8.4-5.5-15.6-9-21.8 -3.5-6.2-8.6-12.2-15.1-18.1 -6.6-5.9-12.5-10.7-17.7-14.3 -5.2-3.6-12.4-7.7-21.6-12.1 -9.1-4.5-16.4-7.8-21.7-10 -5.3-2.2-13-5.2-23.1-9 -8.9-3.4-15.6-6-20-7.8 -4.4-1.8-10.1-4.4-17.3-7.7 -7.1-3.3-12.5-6.3-16-8.8 -3.5-2.6-7.3-5.7-11.3-9.4 -4-3.7-6.8-7.7-8.4-11.8 -1.6-4.2-2.4-8.8-2.4-13.7 0-12.9 5.7-23.5 17.1-31.7 11.4-8.2 26.2-12.3 44.3-12.3 8 0 16.1 1.1 24.4 3.3s15.4 4.7 21.3 7.4c5.9 2.8 11.5 5.8 16.7 9.1 5.2 3.3 8.9 5.9 11.1 7.6 2.2 1.7 3.6 2.9 4.1 3.4 2.5 1.9 5 2.6 7.7 2 2.9-0.2 5-1.7 6.6-4.6l23.1-41.7c2.3-3.8 1.8-7.4-1.4-10.8 -1.1-1.1-2.6-2.5-4.3-4 -1.7-1.5-5.4-4.3-11.1-8.3 -5.7-4-11.8-7.6-18.1-10.7 -6.4-3.1-14.7-6.3-24.8-9.6 -10.2-3.2-20.7-5.4-31.5-6.6V9.1c0-2.7-0.9-4.9-2.6-6.6C282.5 0.9 280.3 0 277.6 0h-38.5c-2.5 0-4.6 0.9-6.4 2.7s-2.7 3.9-2.7 6.4v51.4c-29.9 5.7-54.2 18.5-72.8 38.3 -18.7 19.8-28 42.8-28 69.1 0 7.8 0.8 15.2 2.4 22.3 1.6 7 3.6 13.4 6 19 2.4 5.6 5.8 11.1 10.1 16.6 4.4 5.4 8.5 10.1 12.4 14 3.9 3.9 9 7.9 15.3 12.1 6.3 4.2 11.7 7.6 16.1 10.1 4.5 2.6 10.4 5.5 17.8 8.8 7.4 3.3 13.3 5.9 17.6 7.6 4.3 1.7 10.1 4.1 17.6 7.1 10.3 4 17.9 7.1 22.8 9.3 5 2.2 11.2 5.2 18.8 9.1 7.6 3.9 13.2 7.5 16.7 10.7 3.5 3.2 6.7 7.2 9.6 12s4.3 9.8 4.3 15.1c0 15-5.9 26.6-17.6 34.8 -11.7 8.2-25.3 12.3-40.7 12.3 -7 0-14.1-0.8-21.1-2.3 -24.7-5-47.9-16.9-69.4-35.7l-0.6-0.6c-1.7-2.1-4-2.9-6.9-2.6 -3 0.4-5.2 1.5-6.6 3.4l-29.4 38.5c-2.9 3.8-2.7 7.7 0.6 11.7 1 1.1 2.6 2.9 5 5.1 2.4 2.3 6.8 5.9 13.3 10.7 6.5 4.9 13.5 9.4 21.1 13.7 7.6 4.3 17.3 8.5 29 12.7 11.7 4.2 23.8 7.1 36.4 8.8v50c0 2.5 0.9 4.6 2.7 6.4 1.8 1.8 3.9 2.7 6.4 2.7h38.5c2.7 0 4.9-0.9 6.6-2.6s2.6-3.9 2.6-6.6v-50c30.3-4.9 54.9-17.9 73.8-39 18.9-21 28.4-46.1 28.4-75.2C389 328.8 387.8 319.9 385.3 311.5z" />
    </svg>
  ) : currency === "eur" ? (
    <span>€</span>
  ) : currency === "gbp" ? (
    <svg
      fill="#605b95"
      width="14px"
      height="13px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 407.9 407.9"
    >
      <path d="M161.4 183.2h84.6v39.7h-76.3c3.4 7.9 5.1 15.8 5.1 23.6 0 15.6-3.7 32.1-11.1 49.4 -7.4 17.4-19.7 35.1-36.7 53.2 14.1-3.9 27-5.9 38.7-5.9 14.9 0 31.6 2.2 50.2 6.7 30.8 7.3 51.7 11 62.6 11 13.2 0 30.4-5 51.6-15l15.6 44.3c-16.5 7-29.2 11.5-38.3 13.7 -9 2.1-18 3.2-27 3.2 -7.5 0-15.1-0.7-22.8-2.1 -4.8-0.9-16.4-4.2-34.8-9.8 -18.4-5.6-30.2-9-35.6-10.1 -8.4-1.4-16.8-2.1-25.2-2.1 -12.9 0-26.6 2.2-41.2 6.7 -14.6 4.5-27.9 10.6-39.9 18.3l-18.5-46.5c17.2-9.5 31.8-23 43.8-40.7 12-17.6 18-39.2 18-64.6 0-10.9-1.5-22-4.6-33.3H66.9v-39.7h41.4c-5.9-20-9.7-34.7-11.3-43.9 -1.6-9.2-2.4-18.2-2.4-27 0-37.2 13.8-66.3 41.4-87.3C158.1 8.3 184.9 0 216.5 0c32.4 0 59.1 8.9 80.2 26.7 21 17.8 34 42.8 38.8 75.1l-48.1 7.3c-2.7-21.5-10.7-38.4-24-50.8 -13.3-12.4-29.3-18.5-47.9-18.5 -19.9 0-36.4 6.4-49.5 19.2 -13.2 12.8-19.7 28.2-19.7 46.3C146.1 125.1 151.2 151.1 161.4 183.2L161.4 183.2z" />
    </svg>
  ) : (
    <svg
      fill="#605b95"
      width="14px"
      height="13px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.9 511.9"
    >
      <path d="M312.5 320c88.2 0 160-71.8 160-160C472.5 71.8 400.7 0 312.5 0H123.7c-11 0-19.8 8.5-19.8 19.5V280H59.5c-11 0-20 9-20 20 0 11 9 20 20 20h44.5v64H59.5c-11 0-20 9-20 20 0 11 9 20 20 20h44.5v67.9c0 11 9 20 20 20 11 0 20-9 20-20V424h169.2c11 0 20-9 20-20 0-11-9-20-20-20H144v-64H312.5zM144 40h168.5c66.1 0 120 53.9 120 120 0 66.1-53.8 120-120 120H144V40z" />
    </svg>
  );

export function usdToCurrency(price: number, currency: string) {
  let result;
  if (currency === "eur") {
    result = price * 0.82366545;
  } else if (currency === "usd") {
    result = price;
  } else if (currency === "gbp") {
    result = price * 0.710764;
  } else if (currency === "mxn") {
    result = price * 19.945724;
  }
  return result;
}

export const updateUserWallet = (wallet: any, user: any) => {
  db.collection("users").doc(user).set(
    {
      usd: wallet.usd,
      bitcoin: wallet.bitcoin,
      ethereum: wallet.ethereum,
      ripple: wallet.ripple,
      litecoin: wallet.litecoin,
    },
    { merge: true }
  );
};
export const strUcFirst = (a: any) =>
  `${a}`.charAt(0).toUpperCase() + a.substr(1);

export const updateWalletHistory = (
  username: any,
  cryptoResult: any,
  cryptoName: any,
  cryptoResult2: any,
  wallets: any,
  split: any,
  user: any,
  m: any
) => {
  db.collection("users")
    .doc(user)
    .set(
      {
        walletHistory: [
          {
            details: `${username} send you ${getNumberFixed(
              Number(cryptoResult),
              m
            )} ${strUcFirst(cryptoName)}!`,
            date: split,
            crypto: cryptoResult2,
            balance: wallets.usd,
          },
        ],
      },
      { merge: true }
    );
};

/* const getData = (dispatch: any, data: any, market: any) => {
  if (data && market.ripple) {
    dispatch(
      setWallets({
        ...data,
        ripplePrice: data.ripple * market?.ripple?.usd,
        ethereumPrice: data.ethereum * market?.ethereum?.usd,
        bitcoinPrice: data.bitcoin * market?.bitcoin?.usd,
        TotalCrypto:
          data.ripple * market?.ripple?.usd +
          data.ethereum * market?.ethereum?.usd +
          data.bitcoin * market?.bitcoin?.usd,
      })
    );
  } else {
    console.log(market);
    setTimeout(() => getData(dispatch, data, market), 1000);
  }
}; */

export const fetchWallet = (dispatch: any) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .get()
    .then((doc) => doc.data())
    .then((data) => {
      if (data) {
        console.log(data)
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
