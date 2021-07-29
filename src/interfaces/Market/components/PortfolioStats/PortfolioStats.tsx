import React, { useEffect, useState } from "react";
import "./PortfolioStats.scss";
import Graph from "components/Graph/Graph";
import Select from "components/Select/Select";
import { useSelector } from "react-redux";
import { selectHistory } from "redux/reducers/marketSlice";
import { pure } from "recompose";

type PortfolioStatsProps = {
  search?: string | undefined;
};
function PortfolioStats({ search }: PortfolioStatsProps) {
  const history = useSelector(selectHistory);

  const [active, setActive] = useState("Month");
  const [selectedCrypto, setSelectedCrypto] = useState("All");
  const [data, setData] = useState([{ tokens: 0, Price: 0 }]);

  useEffect(() => {
    if (search) {
      setSelectedCrypto(search);
    }
  }, [search]);

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
  const multiplicateur = active === "Week" ? 0.94 : 1;
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
          Price: history[bitcoin].slice(l)[x][1] * multiplicateur,
          ethereum: history[ethereum].slice(l)[x][1] * 11,
          ripple: history[ripple].slice(l)[x][1] * 5000,
          litecoin: history[litecoin].slice(l)[x][1] * 100,
          neo: history[neo].slice(l)[x][1] * 200,
        }))
      );
    } else {
      setData(
        [...Array(25).keys()].map((x) => ({
          tokens: x,
          Price: 0,
          ethereum: 0,
          ripple: 0,
          litecoin: 0,
          neo: 0,
          timestamp: 0,
        }))
      );
    }
  }, [history, active]);
  return (
    <div className="portfolio_stats">
      <p className="title">{search ? "Stats" : "Portfolio stats"}</p>
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
          {!search && (
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
          )}
        </div>
        <Graph
          selected={selectedCrypto}
          data={data}
          color="Green"
          width={0}
          height={330}
          tooltip
        />
      </div>
    </div>
  );
}

export default pure(PortfolioStats);
