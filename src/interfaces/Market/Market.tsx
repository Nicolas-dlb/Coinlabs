import "./Market.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHistory,
  selectMarket,
  selectVariation,
} from "redux/reducers/marketSlice";
import { useEffect, useState } from "react";
import Graph from "components/Graph/Graph";
import {
  selectBalanceHistory,
  selectWallets,
  setBalanceHistory,
  setExpensesHistory,
  setIncomeHistory,
  setWalletHistory,
  setWallets,
} from "redux/reducers/walletsSlice";
import Select from "components/Select/Select";
import $ from "jquery";
import SelectExchange from "components/SelectExchange/SelectExchange";
import { getNumberFixed, numberWithSpaces } from "utils/utils";
import MarketCapItem from "./components/MartketCapItem/MarketCapItem";
import InfoBoxM from "./components/InfoBoxM/InfoBoxM";

function Market() {
  const history = useSelector(selectHistory);
  const market = useSelector(selectMarket);
  const variation = useSelector(selectVariation);
  const wallet = useSelector(selectWallets);
  const dispatch = useDispatch();
  const [active, setActive] = useState("Month");
  const [selectedCrypto, setSelectedCrypto] = useState("All");
  const balanceHistory = useSelector(selectBalanceHistory);
  const [data, setData] = useState([
    { tokens: 0, Price: 0, timestamp: 3227632 },
  ]);

  // Exchange
  const [cryptoSelected, setCryptoSelected] = useState("BTC");
  const [currencySelected, setCurrencySelected] = useState("BTC");
  const [nbr, setNbr] = useState(0);
  const [nbrCurrency, setNbrCurrency] = useState(0);
  const [lastInput, setLastInput] = useState("");

  const numberCrypto = market[cryptoSelected]?.usd * nbr;
  const numberCurrency = nbrCurrency * market[currencySelected]?.usd;

  const bitcoin = `bitcoin${active}`;
  const ethereum = `ethereum${active}`;
  const ripple = `ripple${active}`;
  const litecoin = `litecoin${active}`;
  const neo = `neo${active}`;

  const length =
    active === "Month"
      ? 601
      : active === "Week"
      ? 161
      : active === "Year"
      ? 361
      : active === "3Month"
      ? 81
      : active === "6Month"
      ? 181
      : 0;
  const l = -length;
  useEffect(() => {
    if (
      history[bitcoin] &&
      history[ripple] &&
      history[litecoin] &&
      history[neo] &&
      history[ethereum]
    ) {
      setData(
        [...Array(length).keys()].map((x) => ({
          tokens: x,
          Price: history[bitcoin].slice(l)[x][1],
          ethereum: history[ethereum].slice(l)[x][1] * 11,
          ripple: history[ripple].slice(l)[x][1] * 5000,
          litecoin: history[litecoin].slice(l)[x][1] * 100,
          neo: history[neo].slice(l)[x][1] * 200,
          timestamp: balanceHistory.slice(l)[x]?.timestamp,
        }))
      );
    }
  }, [history, active]);

  // Exchange

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
    <div id="market" className="market">
      <div className="page-title">
        <p>Market</p>
      </div>
      <div className="infobox_market">
        <InfoBoxM
          data={history.bitcoinWeek}
          name="Bitcoin"
          price={market.bitcoin?.usd}
          variation={variation.bitcoin.week}
        />
        <InfoBoxM
          data={history.ethereumWeek}
          name="Ethereum"
          price={market.ethereum?.usd}
          variation={variation.ethereum.week}
        />
        <InfoBoxM
          data={history.litecoinWeek}
          name="Litecoin"
          price={market.litecoin?.usd}
          variation={variation.litecoin.week}
        />
        <InfoBoxM
          data={history.rippleWeek}
          name="Ripple"
          price={market.ripple?.usd}
          variation={variation.litecoin.week}
        />
        <InfoBoxM
          data={history.neoWeek}
          name="Neo"
          price={market.neo?.usd}
          variation={variation.neo.week}
        />
      </div>
      <div className="market_content">
        <div className="portfolio_stats">
          <p className="title">Portfolio stats</p>
          <div className="portfolio_graph_container">
            <div className="tabs">
              <div className="tabs_left">
                <span
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => setActive("Week")}
                  onClick={() => setActive("Week")}
                  className={
                    active === "Week"
                      ? "btn_portfolio btn_portfolio_active"
                      : "btn_portfolio"
                  }
                >
                  1w
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => setActive("Month")}
                  onClick={() => setActive("Month")}
                  className={
                    active === "Month"
                      ? "btn_portfolio btn_portfolio_active"
                      : "btn_portfolio"
                  }
                >
                  1m
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => setActive("3Month")}
                  onClick={() => setActive("3Month")}
                  className={
                    active === "3Month"
                      ? "btn_portfolio btn_portfolio_active"
                      : "btn_portfolio"
                  }
                >
                  3m
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => setActive("6Month")}
                  onClick={() => setActive("6Month")}
                  className={
                    active === "6Month"
                      ? "btn_portfolio btn_portfolio_active"
                      : "btn_portfolio"
                  }
                >
                  6m
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => setActive("Year")}
                  onClick={() => setActive("Year")}
                  className={
                    active === "Year"
                      ? "btn_portfolio btn_portfolio_active"
                      : "btn_portfolio"
                  }
                >
                  1y
                </span>
              </div>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {
                  document
                    .getElementById("select-c")!
                    .classList.toggle("toggle-select");
                }}
                id="select-c"
                onClick={() => {
                  document
                    .getElementById("select-c")!
                    .classList.toggle("toggle-select");
                }}
                className="tabs_right"
              >
                <Select items="crypto" setCryptoSelected={setSelectedCrypto} />
              </div>
            </div>
            <Graph
              selected={selectedCrypto}
              data={data}
              color="Green"
              width={0}
              height={430}
              tooltip
            />
          </div>
        </div>
        <div className="market_right">
          <div className="title">
            <p>Exchange</p>
          </div>
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
                <p className="date">18/06</p>
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
          <div className="title">Market Cap</div>
          <div className="market_cap">
            <MarketCapItem name="Bitcoin" />
            <MarketCapItem name="Ethereum" />
            <MarketCapItem name="Ripple" />
            <MarketCapItem name="Litecoin" />
            <MarketCapItem name="Neo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;
