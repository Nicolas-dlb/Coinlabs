import "./Portfolio.scss";
import InfoBox from "interfaces/Dashboard/components/InfoBoxD/InfoBoxD";
import React from "react";
import PortfolioItem from "./PortfolioItem/PortfolioItem";

function Portfolio() {
  return (
    <div id="portfolio" className="portfolio">
      <p className="page-title">Portfolio</p>
      <div className="portfolio_top">
        <div className="balance_container">
          <div className="balance_top">
            <InfoBox title="Balance" />
            <InfoBox title="Crypto" />
          </div>
          <div className="balance_top">
            <InfoBox title="Income" />
            <InfoBox title="Expenses" />
          </div>
        </div>
      </div>
      <p className="title">Coins</p>
      <div className="portfolio_container">
        <PortfolioItem name="Bitcoin" />
        <PortfolioItem name="Ethereum" />
        <PortfolioItem name="Ripple" />
        <PortfolioItem name="Litecoin" />
        <PortfolioItem name="Neo" />
      </div>
    </div>
  );
}

export default Portfolio;
