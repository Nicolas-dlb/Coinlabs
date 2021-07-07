import React from "react";
import MarketCapItem from "./MarketCapItem/MarketCapItem";
import "./MarketCap.scss";

function MarketCap() {
  return (
    <div className="market_cap">
      <MarketCapItem name="Bitcoin" />
      <MarketCapItem name="Ethereum" />
      <MarketCapItem name="Ripple" />
      <MarketCapItem name="Litecoin" />
      <MarketCapItem name="Neo" />
    </div>
  );
}

export default MarketCap;
