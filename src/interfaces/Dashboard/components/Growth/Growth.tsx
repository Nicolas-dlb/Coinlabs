/* eslint-disable react-hooks/exhaustive-deps */
import Graph from 'components/Graph/Graph';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBalanceHistory, setBalanceHistory } from 'redux/reducers/walletsSlice';
import './Growth.scss';

function Growth() {
    const [active, setActive] = useState("1m");
    const dispatch = useDispatch();
const balanceHistory = useSelector(selectBalanceHistory);
const [data, setData] = useState([{tokens: 0, Price: 0, timestamp: 3227632}])
 

  useEffect(() => {
   if (balanceHistory) {
       
        setData([...Array(balanceHistory.length).keys()].map((x) => ({
    tokens: x,
    Price: balanceHistory[x]?.total,
    timestamp: balanceHistory[x]?.timestamp
  })).filter((balance) => balance.tokens > balanceHistory.length - 110));
   }
  }, [balanceHistory])

    return (
        <div  className="growth">
            <div className="tabs">
                <div className="tabs_left">
                    <span onClick={() => setActive("1w")} className={active === "1w" ? "btn_growth btn_growth_active" : "btn_growth"}>1w</span>
                <span onClick={() => setActive("1m")} className={active === "1m" ? "btn_growth btn_growth_active" : "btn_growth"}>1m</span>
                <span onClick={() => setActive("3m")} className={active === "3m" ? "btn_growth btn_growth_active" : "btn_growth"}>3m</span>
                <span onClick={() => setActive("6m")} className={active === "6m" ? "btn_growth btn_growth_active" : "btn_growth"}>6m</span>
                <span onClick={() => setActive("1y")} className={active === "1y" ? "btn_growth btn_growth_active" : "btn_growth"}>1y</span>
                </div>
                <div onClick={() => {
                    dispatch(setBalanceHistory({timestamp: 87638752, total: 30498}))
                }} className="tabs_right">
                    <p>Balance</p>
                     <svg xmlns="http://www.w3.org/2000/svg" width="452" height="452" viewBox="0 0 451.8 451.8"><path d="M225.9 354.7c-8.1 0-16.2-3.1-22.4-9.3L9.3 151.2c-12.4-12.4-12.4-32.4 0-44.8 12.4-12.4 32.4-12.4 44.7 0l171.9 171.9 171.9-171.9c12.4-12.4 32.4-12.4 44.7 0 12.4 12.4 12.4 32.4 0 44.8L248.3 345.4C242.1 351.6 234 354.7 225.9 354.7z"/></svg>
                </div>
            </div>
            <Graph data={data} color="Green" width={0} height={300} tooltip/>
        </div>
    )
}

export default Growth
