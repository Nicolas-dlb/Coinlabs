/* eslint-disable react-hooks/exhaustive-deps */
import './Market.scss';
import InfoBoxM from './components/InfoBoxM/InfoBoxM';
import { useSelector } from 'react-redux';
import { selectHistory, selectMarket, selectVariation } from 'redux/reducers/marketSlice';
import MarketCapItem from './components/MartketCapItem/MarketCapItem';
import { useEffect, useState } from 'react';
import Graph from 'components/Graph/Graph';
import { selectBalanceHistory } from 'redux/reducers/walletsSlice';
import Select from "components/Select/Select";
function Market() {
    const history = useSelector(selectHistory);
    const market = useSelector(selectMarket);
    const variation = useSelector(selectVariation);
    const [active, setActive] = useState("Month");
    const [selectedCrypto, setSelectedCrypto] = useState("All");
    const balanceHistory = useSelector(selectBalanceHistory);
    const [data, setData] = useState([{tokens: 0,Price: 0,  timestamp: 3227632}])
 
   
const bitcoin = `bitcoin${active}`;
const ethereum = `ethereum${active}`;
const ripple = `ripple${active}`;
const litecoin = `litecoin${active}`;
const neo = `neo${active}`;

const length = active === "Month" ? 740 : active === "Week" ? 166 : active === "Year" ? 364: active === "3Month" ? 91 : active === "6Month" ? 181 : 0 ;
  useEffect(() => {
   if (history[bitcoin] && history[ripple] && history[litecoin] && history[neo] && history[ethereum]) {
       
        setData([...Array(length).keys()].map((x) => ({
    tokens: x,
    Price: history[bitcoin][x][1],
    ethereum: history[ethereum][x][1] * 11,
    ripple: history[ripple][x][1] * 5000,
    litecoin: history[litecoin][x][1] * 100,
    neo: history[neo][x][1] * 200,
    timestamp: balanceHistory[x]?.timestamp
  })));
   }
  }, [history, active])
    return (
        <div className="market">
            <div className="page-title"><p>Market</p></div>
             <div className="infobox_market">
                <InfoBoxM data={history.bitcoinMonth} name="Bitcoin" price={market.bitcoin?.usd} variation={variation.bitcoin.month} />
                <InfoBoxM data={history.ethereumMonth} name="Ethereum" price={market.ethereum?.usd} variation={variation.ethereum.month} />
                <InfoBoxM data={history.litecoinMonth} name="Litecoin" price={market.litecoin?.usd} variation={variation.litecoin.month} />
                <InfoBoxM data={history.rippleMonth} name="Ripple" price={market.ripple?.usd} variation={variation.litecoin.month} />
                <InfoBoxM data={history.neoMonth} name="Neo" price={market.neo?.usd} variation={variation.neo.month} />
            </div>
<div className="market_content">
    <div className="portfolio_stats">
        
            <p className="title">Portfolio stats</p>
            <div className="portfolio_graph_container">
                <div className="tabs">
                <div className="tabs_left">
                    <span onClick={() => setActive("Week")} className={active === "Week" ? "btn_portfolio btn_portfolio_active" : "btn_portfolio"}>1w</span>
                <span onClick={() => setActive("Month")} className={active === "Month" ? "btn_portfolio btn_portfolio_active" : "btn_portfolio"}>1m</span>
                <span onClick={() => setActive("3Month")} className={active === "3Month" ? "btn_portfolio btn_portfolio_active" : "btn_portfolio"}>3m</span>
                <span onClick={() => setActive("6Month")} className={active === "6Month" ? "btn_portfolio btn_portfolio_active" : "btn_portfolio"}>6m</span>
                <span onClick={() => setActive("Year")} className={active === "Year" ? "btn_portfolio btn_portfolio_active" : "btn_portfolio"}>1y</span>
                </div>
                <div id="select-c" onClick={() => {
                    document.getElementById('select-c')!.classList.toggle("toggle-select");
                }} className="tabs_right">
                    <Select items="crypto" setCryptoSelected={setSelectedCrypto}/>
                </div>
            </div>
            <Graph selected={selectedCrypto} active={active} data={data} color="Green" width={0} height={430} tooltip/>
            </div>
      
    </div>
    <div className="market_right">
                    <div className="title">
                <p>Exchange</p>
            </div>
            <div className="exchange">
                <div className="exchange-top">
                    <div className="exchange_left">
<p>Sell</p>
<div className="input">
    <input min="0" type="number" />
<select>
    <option value="USD">USD</option>
</select>
</div>
<p>Buy</p>
<div className="input">
    <input min="0" type="number" />
    <select>
        <option value="BTC">BTC</option>
    </select>
</div>
                </div>
                <div className="exchange_right">
                   <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 66 65" fill="#fff" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round"><path d="M31.848 0c4.993 0 9.744 1.144 14.007 3.2.67.302 1.34.663 2.008 1.024L44.94 6.813l-4.382-4.515-7.55 6.62-4.448-4.765-13.885 12.342 8.9 9.692-3.47 3 8.77 9.692-3.47 3.008L37.94 55.683l7.425-6.743 6.458 7.226c-1.28.963-2.68 1.928-4.2 2.77a32.11 32.11 0 0 1-15.712 4.09C14.3 63.026 0 48.883 0 31.486-.062 14.207 14.25 0 31.848 0zM26 29.558l7.612-6.743 6.822 7.525-7.614 6.742zm5.42 13.003l7.55-6.802 6.882 7.524-7.613 6.743zM20.584 16.736l7.6-6.743 6.82 7.525-7.613 6.742zm13.943-3.623L40.2 8.067l5.116 5.6-5.664 5.116zm10.1 23.177l5.673-5.047 5.116 5.657-5.664 5.06zm4.993 11.38l5.664-5.058 5.112 5.6-5.662 5.116zm2.315-26.007l3.775-3.372 3.4 3.734-3.774 3.37zm-4.872-11.137l3.775-3.43 3.412 3.792-3.778 3.37zm9.682 22.275l3.775-3.37 3.48 3.74-3.835 3.37zm-17-8.368l5.664-5.057 5.114 5.598-5.662 5.058z" stroke="none" fill="#fff" fill-rule="nonzero"/></svg>
                   <p>Balance</p>
                   <p className="wallet">$14.538,00</p>
                   <p className="date">18/06</p>
                </div>
                </div>
                <button type="button">Exchange</button>
            </div>
            <div className="title">Market Cap</div>
            <div className="market_cap">
               <MarketCapItem name="Bitcoin"/>
               <MarketCapItem name="Ethereum"/>
               <MarketCapItem name="Ripple"/>
            </div>
    </div>
</div>
        </div>
    )
}

export default Market
