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
        <div id="dashboard" className="dashboard">
            <p className="page_title">Dashboard</p>
            <div className="infobox_dashboard">
               <div className="infobox_dashboard_top">
                    <InfoBoxD title="Balance" variation={12} />
                <InfoBoxD title="Income" variation={2.4} />
               </div>
               <div className="infobox_dashboard_bottom">
                    <InfoBoxD title="Expenses" variation={-12} />
                <InfoBoxD title="Transaction" />
               </div>
            </div>
            <p className="title">Market</p>
            <div className="infobox_market">
                <InfoBoxM data={history.bitcoinMonth} name="Bitcoin" price={market.bitcoin?.usd} variation={variation.bitcoin.month} />
                <InfoBoxM data={history.ethereumMonth} name="Ethereum" price={market.ethereum?.usd} variation={variation.ethereum.month} />
                <InfoBoxM data={history.litecoinMonth} name="Litecoin" price={market.litecoin?.usd} variation={variation.litecoin.month} />
                <InfoBoxM data={history.rippleMonth} name="Ripple" price={market.ripple?.usd} variation={variation.litecoin.month} />
                <InfoBoxM data={history.neoMonth} name="Neo" price={market.neo?.usd} variation={variation.neo.month} />
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
