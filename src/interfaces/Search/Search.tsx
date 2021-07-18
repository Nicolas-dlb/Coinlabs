/* eslint-disable import/order */
import MarketCapItem from "interfaces/Market/components/MarketCap/MarketCapItem/MarketCapItem";
import Stats from "./Stats/Stats";
import PortfolioItem from "interfaces/Portfolio/PortfolioItem/PortfolioItem";
import React from "react";
import { useSelector } from "react-redux";
import { selectSearch } from "redux/reducers/appSlice";
import "./Search.scss";
import toTheStars from "assets/pictures/To_the_stars.svg";
import Variation from "./Variation/Variation";

function Search() {
  let crypto = useSelector(selectSearch);
  crypto = crypto.charAt(0).toUpperCase() + crypto.slice(1);

  return (
    <div id="search" className="search">
      <p className="page-title">{crypto}</p>
      <div className="variations">
        <Variation name={crypto} time="Current" />
        <Variation name={crypto} time="Week" />
        <Variation name={crypto} time="Month" />
        <Variation name={crypto} time="3Month" />
        <Variation name={crypto} time="6Month" />
        <Variation name={crypto} time="Year" />
      </div>
      <div className="search_bottom">
        <div className="search_bottom_left">
          <Stats />
        </div>
        <div className="search_bottom_right">
          <div className="title">Portfolio</div>
          <div className="portfolio_container">
            <PortfolioItem name={crypto} />
          </div>
          <div className="title">Market cap</div>
          <div className="market_cap_container">
            <MarketCapItem name={crypto} />
          </div>
        </div>
      </div>
      <div id="no_results" className="no_results_found">
        <div className="no_result">
          <img src={toTheStars} alt="" />
          <p>No results found</p>
        </div>
      </div>
    </div>
  );
}

export default Search;
