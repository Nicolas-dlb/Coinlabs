import "./Market.scss";
import { useSelector } from "react-redux";
import {
  selectHistory,
  selectMarket,
  selectVariation,
} from "redux/reducers/marketSlice";
import React from "react";
import InfoBoxM from "./components/InfoBoxM/InfoBoxM";
import Exchange from "./components/Exchange/Exchange";
import MarketCap from "./components/MarketCap/MarketCap";
import PortfolioStats from "./components/PortfolioStats/PortfolioStats";

function Market() {
  const history = useSelector(selectHistory);
  const market = useSelector(selectMarket);
  const variation = useSelector(selectVariation);

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
        <PortfolioStats />
        <div className="market_right">
          <div className="title">
            <p>Exchange</p>
          </div>
          <Exchange />
          <div className="title">Market Cap</div>
          <MarketCap />
        </div>
      </div>
    </div>
  );
}

export default Market;
