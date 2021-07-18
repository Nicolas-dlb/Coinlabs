import React, { useState } from "react";
import { getNumberFixed, lastUpdate, numberWithSpaces } from "utils/utils";
import SelectExchange from "components/SelectExchange/SelectExchange";
import $ from "jquery";
import {
  selectLastUpdate,
  selectWallets,
  setBalanceHistory,
  setExpensesHistory,
  setIncomeHistory,
  setWalletHistory,
  setWallets,
} from "redux/reducers/walletsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectMarket } from "redux/reducers/marketSlice";
import "./Exchange.scss";

function Exchange() {
  const wallet = useSelector(selectWallets);
  const lastUpdateDate = useSelector(selectLastUpdate);
  const dispatch = useDispatch();
  const [cryptoSelected, setCryptoSelected] = useState("BTC");
  const [currencySelected, setCurrencySelected] = useState("bitcoin");
  const [nbr, setNbr] = useState(0);
  const [nbrCurrency, setNbrCurrency] = useState(0);
  const [lastInput, setLastInput] = useState("");
  const market = useSelector(selectMarket);
  const numberCrypto = market[cryptoSelected]?.usd * nbr;
  const numberCurrency = nbrCurrency * market[currencySelected]?.usd;

  const handleChangeCurrency = () => {
    const inputBuy: any = $("#inputBuy").val();
    setNbrCurrency(Number(inputBuy));
  };
  const handleChangeCrypto = () => {
    const inputSell: any = $("#inputSell").val();
    setNbr(Number(inputSell));
  };

  const handleClick = () => {
    if (Number(nbr) === 0 && Number(nbrCurrency) === 0) {
      document
        .getElementById("inputBuy")!
        .classList.add("bad_input_send_crypto");
      setTimeout(() => {
        document
          .getElementById("inputBuy")!
          .classList.remove("bad_input_send_crypto");
      }, 5000);
      document
        .getElementById("inputSell")!
        .classList.add("bad_input_send_crypto");
      setTimeout(() => {
        document
          .getElementById("inputSell")!
          .classList.remove("bad_input_send_crypto");
      }, 5000);
    } else if (lastInput === "crypto") {
      if (Number(nbr) > wallet[cryptoSelected] || Number(nbr) === 0) {
        document
          .getElementById("inputSell")!
          .classList.add("bad_input_send_crypto");
        setTimeout(() => {
          document
            .getElementById("inputSell")!
            .classList.remove("bad_input_send_crypto");
        }, 5000);
        return;
      }

      dispatch(
        setWallets({
          [cryptoSelected]: wallet[cryptoSelected] - Number(nbr),

          usd: wallet.usd + Number(getNumberFixed(numberCrypto, 2)),
          income: Number(getNumberFixed(wallet.income + numberCrypto, 2)),
        })
      );

      dispatch(
        setBalanceHistory({
          total: wallet.usd + Number(numberCrypto),
          timestamp: new Date().getTime(),
        })
      );

      dispatch(
        setIncomeHistory({
          total: Number(getNumberFixed(wallet.income + numberCrypto, 2)),
          timestamp: new Date().getTime(),
        })
      );

      dispatch(
        setWalletHistory({
          status: "Sell",
          name:
            cryptoSelected.charAt(0).toUpperCase() + cryptoSelected.slice(1),

          price: getNumberFixed(Number(numberCrypto), 0),
        })
      );
      lastUpdate(dispatch);
      setLastInput("");
      setNbr(0);
      $("#inputSell").val(0);
    } else if (lastInput === "currency") {
      if (Number(numberCurrency) > wallet.usd || Number(numberCurrency) === 0) {
        document
          .getElementById("inputBuy")!
          .classList.add("bad_input_send_crypto");
        setTimeout(() => {
          document
            .getElementById("inputBuy")!
            .classList.remove("bad_input_send_crypto");
        }, 5000);
        return;
      }

      dispatch(
        setBalanceHistory({
          total: wallet.usd - Number(numberCurrency),
          timestamp: new Date().getTime(),
        })
      );
      dispatch(
        setWallets({
          [currencySelected]: wallet[currencySelected] + Number(nbrCurrency),

          usd: Number(getNumberFixed(wallet.usd - Number(numberCurrency), 2)),
          expenses: Number(getNumberFixed(wallet.expenses + numberCurrency, 2)),
        })
      );

      const timestamp = new Date().getTime();
      dispatch(
        setExpensesHistory({
          total: Number(getNumberFixed(wallet.expenses + numberCurrency, 2)),
          timestamp,
        })
      );
      dispatch(
        setWalletHistory({
          status: "Buy",
          name:
            currencySelected.charAt(0).toUpperCase() +
            currencySelected.slice(1),

          price: getNumberFixed(Number(numberCurrency), 0),
        })
      );
      lastUpdate(dispatch);

      setLastInput("");
      setNbrCurrency(0);
      $("#inputBuy").val(0);
    }
  };

  document.addEventListener("click", (e: any) => {
    if (!e.target.classList.contains("exchange_element")) {
      setNbr(1);
      setNbrCurrency(1);
      $("#inputSell").val(0);
      $("#inputBuy").val(0);
      $("#inputSell").css("opacity", "0");
      $("#inputBuy").css("opacity", "0");
      setLastInput("");
    }
  });
  return (
    <div className="exchange exchange_element">
      <div className="exchange-top exchange_element">
        <div className="exchange_left exchange_element">
          <p className="exchange_element">Sell</p>
          <div className="input exchange_element">
            <input
              className="exchange_element"
              onFocus={() => {
                $("#inputBuy").val(0);
                $("#inputBuy").css("opacity", "0");
                $("#inputSell").css("opacity", "1");
                setNbrCurrency(0);
                setLastInput("crypto");
              }}
              onChange={() => {
                document
                  .getElementById("inputBuy")!
                  .classList.remove("bad_input_send_crypto");
                document
                  .getElementById("inputSell")!
                  .classList.remove("bad_input_send_crypto");
                handleChangeCrypto();
              }}
              min="0"
              type="number"
              id="inputSell"
            />
            <SelectExchange
              setCryptoSelected={setCryptoSelected}
              items="sell"
            />
          </div>
          <p className="exchange_element">Buy</p>
          <div className="input exchange_element">
            <input
              className="exchange_element"
              onFocus={() => {
                $("#inputSell").val(0);
                $("#inputSell").css("opacity", "0");
                $("#inputBuy").css("opacity", "1");
                setNbr(0);
                setLastInput("currency");
              }}
              min="0"
              onChange={() => {
                document
                  .getElementById("inputBuy")!
                  .classList.remove("bad_input_send_crypto");
                document
                  .getElementById("inputSell")!
                  .classList.remove("bad_input_send_crypto");
                handleChangeCurrency();
              }}
              type="number"
              id="inputBuy"
            />
            <SelectExchange
              setCurrencySelected={setCurrencySelected}
              items="buy"
            />
          </div>
        </div>
        <div className="exchange_right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 66 65"
            fill="#fff"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M31.848 0c4.993 0 9.744 1.144 14.007 3.2.67.302 1.34.663 2.008 1.024L44.94 6.813l-4.382-4.515-7.55 6.62-4.448-4.765-13.885 12.342 8.9 9.692-3.47 3 8.77 9.692-3.47 3.008L37.94 55.683l7.425-6.743 6.458 7.226c-1.28.963-2.68 1.928-4.2 2.77a32.11 32.11 0 0 1-15.712 4.09C14.3 63.026 0 48.883 0 31.486-.062 14.207 14.25 0 31.848 0zM26 29.558l7.612-6.743 6.822 7.525-7.614 6.742zm5.42 13.003l7.55-6.802 6.882 7.524-7.613 6.743zM20.584 16.736l7.6-6.743 6.82 7.525-7.613 6.742zm13.943-3.623L40.2 8.067l5.116 5.6-5.664 5.116zm10.1 23.177l5.673-5.047 5.116 5.657-5.664 5.06zm4.993 11.38l5.664-5.058 5.112 5.6-5.662 5.116zm2.315-26.007l3.775-3.372 3.4 3.734-3.774 3.37zm-4.872-11.137l3.775-3.43 3.412 3.792-3.778 3.37zm9.682 22.275l3.775-3.37 3.48 3.74-3.835 3.37zm-17-8.368l5.664-5.057 5.114 5.598-5.662 5.058z"
              stroke="none"
              fill="#fff"
              fillRule="nonzero"
            />
          </svg>
          <p>Balance</p>
          <div className="wallet">
            <p>$</p>
            <p>{numberWithSpaces(getNumberFixed(wallet.usd, 2))}</p>
          </div>
          <p className="date">{lastUpdateDate}</p>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="btn-exchange exchange_element"
        type="button"
      >
        Exchange
      </button>
    </div>
  );
}

export default Exchange;
