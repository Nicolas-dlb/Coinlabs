/* eslint-disable react-hooks/exhaustive-deps */
import Graph from 'components/Graph/Graph';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBalanceHistory, selectCryptoHistory, selectExpensesHistory, selectIncomeHistory } from 'redux/reducers/walletsSlice';
import './Growth.scss';
import Select from "components/Select/Select";

function Growth() {
    const [active, setActive] = useState("1m");
const balanceHistory = useSelector(selectBalanceHistory);
const [data, setData] = useState([{tokens: 0, Price: 0, timestamp: 3227632}])
 const [growthSelected, setGrowthSelected] = useState("Balance");
 const incomeHistory = useSelector(selectIncomeHistory);
 const cryptoHistory = useSelector(selectCryptoHistory);
 const expensesHistory = useSelector(selectExpensesHistory);

 const timeline = growthSelected === "Balance" ? balanceHistory : growthSelected === "Income" ? incomeHistory : growthSelected === "Expenses" ? expensesHistory : cryptoHistory;
  useEffect(() => {
   if (timeline) {
       
        setData([...Array(101).keys()].map((x) => ({
    tokens: x,
    Price: timeline.slice(-101)[x]?.total,
    timestamp: timeline.slice(-101)[x]?.timestamp
  })));
   }
  }, [timeline])

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
                <div className="tabs_right">
                   
                   <Select items="currency" setCurrencySelected={setGrowthSelected} />
                </div>
            </div>
            <Graph data={data} color="Green" width={0} height={180} tooltip/>
        </div>
    )
}

export default Growth
