/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */

import "./App.scss";
import Market from "interfaces/Market/Market";
import Dashboard from "interfaces/Dashboard/Dashboard";

import Login from "interfaces/Login/Login";
import React, { useEffect } from "react";
import Settings from "interfaces/Settings/Settings";
import getData from "utils/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCrypto,
  selectHistory,
  selectMarket,
  setVariation,
} from "redux/reducers/marketSlice";
import {
  loadBalanceHistory,
  loadCryptoHistory,
  loadExpensesHistory,
  loadIncomeHistory,
  loadWalletHistory,
  resetBalanceHistory,
  resetCryptoHistory,
  resetExpensesHistory,
  resetIncomeHistory,
  resetWalletHistory,
  selectBalanceHistory,
  selectCryptoHistory,
  selectExpensesHistory,
  selectIncomeHistory,
  selectWalletHistory,
  selectWallets,
  setCryptoHistory,
  setWallets,
} from "redux/reducers/walletsSlice";
import {
  checkVariation,
  fetchWallet,
  updateUserWallet,
  updateWallet,
} from "utils/utils";
import {
  login,
  logout,
  selectUserName,
  setProfilPic,
  resetProfilPic,
} from "redux/reducers/userSlice";
import { auth, db } from "firebaseConfig";
import Header from "components/Header/Header";
import Menu from "components/Menu/Menu";
import Portfolio from "interfaces/Portfolio/Portfolio";
import Changelog from "interfaces/Changelog/Changelog";

import Search from "interfaces/Search/Search";

function App() {
  const a = useSelector(selectHistory);

  // const Market = lazy(() => import("interfaces/Market/Market"));
  // const Portfolio = lazy(() => import("interfaces/Portfolio/Portfolio"));
  // const Changelog = lazy(() => import("interfaces/Changelog/Changelog"));
  // const Settings = lazy(() => import("interfaces/Settings/Settings"));
  // const Search = lazy(() => import("interfaces/Search/Search"));

  const dispatch = useDispatch();
  const wallet = useSelector(selectWallets);
  const user = useSelector(selectUserName);
  const market = useSelector(selectMarket);
  const balanceHistory = useSelector(selectBalanceHistory);
  const walletHistory = useSelector(selectWalletHistory);
  const expensesHistory = useSelector(selectExpensesHistory);
  const incomeHistory = useSelector(selectIncomeHistory);
  const cryptoHistory = useSelector(selectCryptoHistory);

  useEffect(() => {
    checkVariation(dispatch);
    setInterval(() => checkVariation(dispatch), 60000);
    getData().then((data: any) => {
      if (data !== market && data) {
        dispatch(loadCrypto(data));
      }
    });
    setInterval(
      () =>
        getData().then((data: any) => {
          if (data !== market && data) {
            dispatch(loadCrypto(data));
          }
        }),
      60000
    );
  }, []);

  useEffect(() => {
    if (user !== null) {
      updateWallet(balanceHistory);
    }
  }, [balanceHistory, user]);

  useEffect(() => {
    if (user !== null) {
      updateWallet(walletHistory);
    }
  }, [walletHistory, user]);

  useEffect(() => {
    if (user !== null) {
      updateWallet(cryptoHistory);
    }
  }, [cryptoHistory, user]);

  useEffect(() => {
    if (user !== null) {
      updateWallet(incomeHistory);
    }
  }, [incomeHistory, user]);

  useEffect(() => {
    if (user !== null) {
      updateWallet(expensesHistory);
    }
  }, [expensesHistory, user]);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth: any) => {
      if (userAuth) {
        if (auth.currentUser) {
          fetchWallet(dispatch);
          db.collection("users")
            .doc(auth.currentUser?.uid)
            .get()
            .then((doc: any) => doc.data())
            .then((data: any) => {
              if (data) {
                dispatch(loadBalanceHistory(data.balanceHistory));
                dispatch(loadCryptoHistory(data.cryptoHistory));
                dispatch(loadIncomeHistory(data.incomeHistory));
                dispatch(loadExpensesHistory(data.expensesHistory));
                dispatch(loadWalletHistory(data.walletHistory));
                if (data.profilPic) {
                  dispatch(setProfilPic(data.profilPic));
                }
              }
            });
        } else {
          dispatch(resetBalanceHistory());
          dispatch(resetCryptoHistory());
          dispatch(resetIncomeHistory());
          dispatch(resetExpensesHistory());
          dispatch(resetWalletHistory());
        }

        setTimeout(() => {
          dispatch(
            login({
              email: userAuth.email,
              userName: userAuth.displayName,
            })
          );
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch(resetProfilPic());
        }, 1000);
        dispatch(logout());
      }
    });
  }, []);

  useEffect(() => {
    if (
      market.ethereum?.usd !== undefined &&
      market.ripple?.usd !== undefined &&
      market.bitcoin?.usd !== undefined &&
      market.litecoin?.usd !== undefined &&
      market.neo?.usd !== undefined &&
      market.ethereum?.usd !== 0 &&
      market.ripple?.usd !== 0 &&
      market.bitcoin?.usd !== 0 &&
      market.litecoin?.usd !== 0 &&
      market.neo?.usd !== 0 &&
      market.ethereum !== undefined &&
      market.bitcoin !== undefined &&
      market.ripple !== undefined &&
      market.litecoin !== undefined &&
      market.neo !== undefined
    ) {
      dispatch(
        setWallets({
          ethereumPrice: wallet.ethereum * market.ethereum?.usd,
          bitcoinPrice: wallet.bitcoin * market.bitcoin?.usd,
          ripplePrice: wallet.ripple * market.ripple?.usd,
          litecoinPrice: wallet.litecoin * market.litecoin?.usd,
          neoPrice: wallet.neo * market.neo?.usd,
          TotalCrypto:
            wallet.ethereum * market.ethereum?.usd +
            wallet.bitcoin * market.bitcoin?.usd +
            wallet.ripple * market.ripple?.usd +
            wallet.litecoin * market.litecoin?.usd +
            wallet.neo * market.neo?.usd,
        })
      );
    }
  }, [
    wallet.usd,
    wallet.litecoin,
    wallet.bitcoin,
    wallet.ethereum,
    wallet.ripple,
    wallet.neo,
    market,
  ]);

  const timestamp = new Date().getTime();
  useEffect(() => {
    if (wallet.TotalCrypto !== null) {
      dispatch(
        setCryptoHistory({
          total: wallet.TotalCrypto,
          timestamp,
        })
      );
    }
  }, [wallet.TotalCrypto]);

  useEffect(() => {
    if (user !== null && auth?.currentUser) {
      updateUserWallet(wallet, auth.currentUser?.uid);
    }
  }, [
    wallet.usd,
    wallet.ethereum,
    wallet.bitcoin,
    wallet.ripple,
    wallet.litecoin,
    wallet.neo,
    wallet.income,
    wallet.expenses,
    user,
  ]);

  let resultWeek: number = 0;
  let resultMonth: number = 0;
  let resultYear: number = 0;
  let result3Month: number = 0;
  let result6Month: number = 0;
  let resultCap: number = 0;

  let rippleWeek: number;
  let rippleYear: number;
  let rippleMonth: number;
  let ripple3Month: number;
  let ripple6Month: number;
  let rippleCap: number;

  let bitcoinWeek: number;
  let bitcoinYear: number;
  let bitcoinMonth: number;
  let bitcoin3Month: number;
  let bitcoin6Month: number;
  let bitcoinCap: number;

  let ethereumWeek: number;
  let ethereumYear: number;
  let ethereumMonth: number;
  let ethereum3Month: number;
  let ethereum6Month: number;
  let ethereumCap: number;

  let litecoinWeek: number;
  let litecoinYear: number;
  let litecoinMonth: number;
  let litecoin3Month: number;
  let litecoin6Month: number;
  let litecoinCap: number;

  let neoWeek: number;
  let neoYear: number;
  let neoMonth: number;
  let neo3Month: number;
  let neo6Month: number;
  let neoCap: number;

  function check() {
    if (
      !a.rippleMonth ||
      !a.bitcoinMonth ||
      !a.ethereumMonth ||
      !a.rippleYear ||
      !a.bitcoinYear ||
      !a.ethereumYear ||
      !a.neoMonth ||
      !a.neoYear ||
      !a.neoWeek ||
      !a.ethereumWeek ||
      !a.bitcoinWeek ||
      !a.litecoinWeek ||
      !a.rippleWeek
    ) {
      setTimeout(() => check(), 1);
    } else {
      let lWeek = a.rippleWeek.length - 1;
      let value1Week = a.rippleWeek[0][1];
      let value2Week = a.rippleWeek[lWeek][1];
      let betweenWeek = value2Week - value1Week;
      let onePercentWeek = value1Week / 100;
      resultWeek = betweenWeek / onePercentWeek;
      rippleWeek = resultWeek;
      let lMonth = a.rippleMonth.length - 1;
      let value1Month = a.rippleMonth[0][1];
      let value2Month = a.rippleMonth[lMonth][1];
      let betweenMonth = value2Month - value1Month;
      let onePercentMonth = value1Month / 100;
      resultMonth = betweenMonth / onePercentMonth;
      rippleMonth = resultMonth;
      let lYear = a.rippleYear.length - 1;
      let value1Year = a.rippleYear[0][1];
      let value2Year = a.rippleYear[lYear][1];
      let betweenYear = value2Year - value1Year;
      let onePercentYear = value1Year / 100;
      resultYear = betweenYear / onePercentYear;
      rippleYear = resultYear;

      let l3Month = a.ripple3Month.length - 1;
      let value13Month = a.ripple3Month[0][1];
      let value23Month = a.ripple3Month[l3Month][1];
      let between3Month = value23Month - value13Month;
      let onePercent3Month = value13Month / 100;
      result3Month = between3Month / onePercent3Month;
      ripple3Month = result3Month;

      let l6Month = a.ripple6Month.length - 1;
      let value16Month = a.ripple6Month[0][1];
      let value26Month = a.ripple6Month[l6Month][1];
      let between6Month = value26Month - value16Month;
      let onePercent6Month = value16Month / 100;
      result6Month = between6Month / onePercent6Month;
      ripple6Month = result6Month;

      let lCap = a.rippleCap.length - 1;
      let value1Cap = a.rippleCap[0][1];
      let value2Cap = a.rippleCap[lCap][1];

      let betweenCap = value2Cap - value1Cap;
      let onePercentCap = value1Cap / 100;
      resultCap = betweenCap / onePercentCap;
      rippleCap = resultCap;

      lWeek = a.bitcoinWeek.length - 1;
      value1Week = a.bitcoinWeek[0][1];
      value2Week = a.bitcoinWeek[lWeek][1];
      betweenWeek = value2Week - value1Week;
      onePercentWeek = value1Week / 100;
      resultWeek = betweenWeek / onePercentWeek;
      bitcoinWeek = resultWeek;
      lMonth = a.bitcoinMonth.length - 1;
      value1Month = a.bitcoinMonth[0][1];
      value2Month = a.bitcoinMonth[lMonth][1];
      betweenMonth = value2Month - value1Month;
      onePercentMonth = value1Month / 100;
      resultMonth = betweenMonth / onePercentMonth;
      bitcoinMonth = resultMonth;
      lYear = a.bitcoinYear.length - 1;
      value1Year = a.bitcoinYear[0][1];
      value2Year = a.bitcoinYear[lYear][1];
      betweenYear = value2Year - value1Year;
      onePercentYear = value1Year / 100;
      resultYear = betweenYear / onePercentYear;
      bitcoinYear = resultYear;

      l3Month = a.bitcoin3Month.length - 1;
      value13Month = a.bitcoin3Month[0][1];
      value23Month = a.bitcoin3Month[l3Month][1];
      between3Month = value23Month - value13Month;
      onePercent3Month = value13Month / 100;
      result3Month = between3Month / onePercent3Month;
      bitcoin3Month = result3Month;

      l6Month = a.bitcoin6Month.length - 1;
      value16Month = a.bitcoin6Month[0][1];
      value26Month = a.bitcoin6Month[l6Month][1];
      between6Month = value26Month - value16Month;
      onePercent6Month = value16Month / 100;
      result6Month = between6Month / onePercent6Month;
      bitcoin6Month = result6Month;

      lCap = a.bitcoinCap.length - 1;
      value1Cap = a.bitcoinCap[0][1];
      value2Cap = a.bitcoinCap[lCap][1];
      betweenCap = value2Cap - value1Cap;
      onePercentCap = value1Cap / 100;
      resultCap = betweenCap / onePercentCap;
      bitcoinCap = resultCap;

      lWeek = a.ethereumWeek.length - 1;
      value1Week = a.ethereumWeek[0][1];
      value2Week = a.ethereumWeek[lWeek][1];
      betweenWeek = value2Week - value1Week;
      onePercentWeek = value1Week / 100;
      resultWeek = betweenWeek / onePercentWeek;
      ethereumWeek = resultWeek;
      lMonth = a.ethereumMonth.length - 1;
      value1Month = a.ethereumMonth[0][1];
      value2Month = a.ethereumMonth[lMonth][1];
      betweenMonth = value2Month - value1Month;
      onePercentMonth = value1Month / 100;
      resultMonth = betweenMonth / onePercentMonth;
      ethereumMonth = resultMonth;
      lYear = a.ethereumYear.length - 1;
      value1Year = a.ethereumYear[0][1];
      value2Year = a.ethereumYear[lYear][1];
      betweenYear = value2Year - value1Year;
      onePercentYear = value1Year / 100;
      resultYear = betweenYear / onePercentYear;
      ethereumYear = resultYear;

      l3Month = a.ethereum3Month.length - 1;
      value13Month = a.ethereum3Month[0][1];
      value23Month = a.ethereum3Month[l3Month][1];
      between3Month = value23Month - value13Month;
      onePercent3Month = value13Month / 100;
      result3Month = between3Month / onePercent3Month;
      ethereum3Month = result3Month;

      l6Month = a.ethereum6Month.length - 1;
      value16Month = a.ethereum6Month[0][1];
      value26Month = a.ethereum6Month[l6Month][1];
      between6Month = value26Month - value16Month;
      onePercent6Month = value16Month / 100;
      result6Month = between6Month / onePercent6Month;
      ethereum6Month = result6Month;

      lCap = a.ethereumCap.length - 1;
      value1Cap = a.ethereumCap[0][1];
      value2Cap = a.ethereumCap[lCap][1];
      betweenCap = value2Cap - value1Cap;
      onePercentCap = value1Cap / 100;
      resultCap = betweenCap / onePercentCap;
      ethereumCap = resultCap;

      if (a.litecoinYear && a.litecoinMonth && a.litecoinWeek) {
        lWeek = a.litecoinWeek.length - 1;
        value1Week = a.litecoinWeek[0][1];
        value2Week = a.litecoinWeek[lWeek][1];
        betweenWeek = value2Week - value1Week;
        onePercentWeek = value1Week / 100;
        resultWeek = betweenWeek / onePercentWeek;
        litecoinWeek = resultWeek;
        lMonth = a.litecoinMonth.length - 1;
        value1Month = a.litecoinMonth[0][1];
        value2Month = a.litecoinMonth[lMonth][1];
        betweenMonth = value2Month - value1Month;
        onePercentMonth = value1Month / 100;
        resultMonth = betweenMonth / onePercentMonth;
        litecoinMonth = resultMonth;
        lYear = a.litecoinYear.length - 1;
        value1Year = a.litecoinYear[0][1];
        value2Year = a.litecoinYear[lYear][1];
        betweenYear = value2Year - value1Year;
        onePercentYear = value1Year / 100;
        resultYear = betweenYear / onePercentYear;
        litecoinYear = resultYear;

        l3Month = a.litecoin3Month.length - 1;
        value13Month = a.litecoin3Month[0][1];
        value23Month = a.litecoin3Month[l3Month][1];
        between3Month = value23Month - value13Month;
        onePercent3Month = value13Month / 100;
        result3Month = between3Month / onePercent3Month;
        litecoin3Month = result3Month;

        l6Month = a.litecoin6Month.length - 1;
        value16Month = a.litecoin6Month[0][1];
        value26Month = a.litecoin6Month[l6Month][1];
        between6Month = value26Month - value16Month;
        onePercent6Month = value16Month / 100;
        result6Month = between6Month / onePercent6Month;
        litecoin6Month = result6Month;

        lCap = a.litecoinCap.length - 1;
        value1Cap = a.litecoinCap[0][1];
        value2Cap = a.litecoinCap[lCap][1];
        betweenCap = value2Cap - value1Cap;
        onePercentCap = value1Cap / 100;
        resultCap = betweenCap / onePercentCap;
        litecoinCap = resultCap;
      }
      if (a.neoYear && a.neoMonth && a.neoWeek) {
        lWeek = a.neoWeek.length - 1;
        value1Week = a.neoWeek[0][1];
        value2Week = a.neoWeek[lWeek][1];
        betweenWeek = value2Week - value1Week;
        onePercentWeek = value1Week / 100;
        resultWeek = betweenWeek / onePercentWeek;
        neoWeek = resultWeek;
        lMonth = a.neoMonth.length - 1;
        value1Month = a.neoMonth[0][1];
        value2Month = a.neoMonth[lMonth][1];
        betweenMonth = value2Month - value1Month;
        onePercentMonth = value1Month / 100;
        resultMonth = betweenMonth / onePercentMonth;
        neoMonth = resultMonth;
        lYear = a.neoYear.length - 1;
        value1Year = a.neoYear[0][1];
        value2Year = a.neoYear[lYear][1];
        betweenYear = value2Year - value1Year;
        onePercentYear = value1Year / 100;
        resultYear = betweenYear / onePercentYear;
        neoYear = resultYear;

        l3Month = a.neo3Month.length - 1;
        value13Month = a.neo3Month[0][1];
        value23Month = a.neo3Month[l3Month][1];
        between3Month = value23Month - value13Month;
        onePercent3Month = value13Month / 100;
        result3Month = between3Month / onePercent3Month;
        neo3Month = result3Month;

        l6Month = a.neo6Month.length - 1;
        value16Month = a.neo6Month[0][1];
        value26Month = a.neo6Month[l6Month][1];
        between6Month = value26Month - value16Month;
        onePercent6Month = value16Month / 100;
        result6Month = between6Month / onePercent6Month;
        neo6Month = result6Month;

        lCap = a.neoCap.length - 1;
        value1Cap = a.neoCap[0][1];

        value2Cap = a.neoCap[lCap][1];

        betweenCap = value2Cap - value1Cap;
        onePercentCap = value1Cap / 100;
        resultCap = betweenCap / onePercentCap;
        neoCap = resultCap;
      }
    }
  }

  useEffect(() => {
    check();
    if (rippleWeek) {
      dispatch(
        setVariation({
          ripple: {
            week: rippleWeek,
            month: rippleMonth,
            month3: ripple3Month,
            month6: ripple6Month,
            year: rippleYear,
            cap: rippleCap,
          },
          bitcoin: {
            week: bitcoinWeek,
            month: bitcoinMonth,
            month3: bitcoin3Month,
            month6: bitcoin6Month,
            year: bitcoinYear,
            cap: bitcoinCap,
          },
          ethereum: {
            week: ethereumWeek,
            month: ethereumMonth,
            month3: ethereum3Month,
            month6: ethereum6Month,
            year: ethereumYear,
            cap: ethereumCap,
          },
          litecoin: {
            week: litecoinWeek,
            month: litecoinMonth,
            month3: litecoin3Month,
            month6: litecoin6Month,
            year: litecoinYear,
            cap: litecoinCap,
          },
          neo: {
            week: neoWeek,
            month: neoMonth,
            month3: neo3Month,
            month6: neo6Month,
            year: neoYear,
            cap: neoCap,
          },
        })
      );
    }
  }, [a]);

  return (
    <div id="app" className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <Menu />
          <div id="shadow" className="shadow" />
          <div id="container" className="container">
            <Dashboard />

            <Market />

            <Portfolio />
            <Changelog />
            <Settings />
            <Search />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
