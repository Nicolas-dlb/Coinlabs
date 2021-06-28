/* eslint-disable react-hooks/exhaustive-deps */
import './Dashboard.scss';
import InfoBoxD from "interfaces/Dashboard/components/InfoBoxD/InfoBoxD";
import InfoBoxM from "interfaces/Market/components/InfoBoxM/InfoBoxM";
import Growth from "./components/Growth/Growth";
import Transactions from "./components/Transactions/Transactions";
import {pure} from "recompose";
import {  useSelector } from 'react-redux';
import { selectHistory, selectMarket, selectVariation } from 'redux/reducers/marketSlice';


function Dashboard() {
   const market = useSelector(selectMarket);
   const variation = useSelector(selectVariation);
   const history = useSelector(selectHistory);


    return (
        <div id="dashboard" className="dashboard active_window">
            <p className="page_title">Dashboard</p>
            <div className="infobox_dashboard">
               <div className="infobox_dashboard_top">
                    <InfoBoxD title="Balance" />
                <InfoBoxD title="Income" />
               </div>
               <div className="infobox_dashboard_bottom">
                    <InfoBoxD title="Expenses" />
                <InfoBoxD title="Crypto" />
               </div>
            </div>
            <p className="title title_market">Market</p>
            <div className="infobox_market">
                <InfoBoxM data={history.bitcoinWeek} name="Bitcoin" price={market.bitcoin?.usd} variation={variation.bitcoin.week} />
                <InfoBoxM data={history.ethereumWeek} name="Ethereum" price={market.ethereum?.usd} variation={variation.ethereum.week} />
                <InfoBoxM data={history.litecoinWeek} name="Litecoin" price={market.litecoin?.usd} variation={variation.litecoin.week} />
                <InfoBoxM data={history.rippleWeek} name="Ripple" price={market.ripple?.usd} variation={variation.litecoin.week} />
                <InfoBoxM data={history.neoWeek} name="Neo" price={market.neo?.usd} variation={variation.neo.week} />
            </div>
           <div id="growth" className="dashboard_bottom">
            <div className="growth_container">
                <p className="title">Growth</p>
            <Growth />
            </div>
            <div className="transactions_container">
                <p className="title">Transactions</p>
                <Transactions />
            </div>
           </div>
        </div >
    )
}

export default pure(Dashboard);
