import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectHistory, selectVariation } from "redux/reducers/marketSlice"
import { getNumberFixed, numberWithSpaces } from "utils/utils";
import "./StatItem.scss";
import Graph from 'components/Graph/Graph';
type StatItemProps = {
time: string
}

function StatItem({time}: StatItemProps) {
    const variation = useSelector(selectVariation);
    const history = useSelector(selectHistory);
const [data, setData] = useState([{tokens: 0,Price: 0}]);
    const varName = time === "3Month" || time === "6Month" ? `month${time.charAt(0)}` : time;
     const color = variation.bitcoin[varName] > 0 ? "#37bb77" : "#f1c94f";
    const angle = variation.bitcoin[varName] > 0 ? "140deg" : "210deg";
const timeline = `bitcoin${time.charAt(0).toUpperCase() + time.slice(1)}`;
     useEffect(() => {
   if (history[timeline]) {
       
        setData([...Array(history[timeline].length).keys()].map((x) => ({
    tokens: x,
    Price: history[timeline][x][1]
  })));
   }
  }, [history])

    return (
        <div className="stat_item">
            <div className="stat_time">
                <p>{time.charAt(0).toUpperCase() + time.slice(1)}</p>
            </div>
            <div className="stat_price">
                <p>$</p>
                <p>{numberWithSpaces(getNumberFixed(history[timeline][0][1], 2))}</p>
            </div>
            <div style={{ color: color }} className="stat_variation">
                 <svg
                        style={{ transform: `rotate(${angle})` }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 492 492"
                        fill={color}
                    >
                        <path d="M464.3 207.4l0.8 0.2H135.9l103.5-103.7c5.1-5.1 7.8-11.9 7.8-19.1 0-7.2-2.8-14-7.8-19.1L223.3 49.5c-5.1-5.1-11.8-7.9-19-7.9 -7.2 0-14 2.8-19 7.8L7.8 226.9C2.8 232 0 238.8 0 246c0 7.2 2.8 14 7.8 19.1l177.4 177.4c5.1 5.1 11.8 7.8 19 7.8 7.2 0 13.9-2.8 19-7.8l16.1-16.1c5.1-5.1 7.8-11.8 7.8-19 0-7.2-2.8-13.6-7.8-18.7L134.7 284.4h330c14.8 0 27.3-12.8 27.3-27.6v-22.8C492 219.2 479.2 207.4 464.3 207.4z" />
                    </svg>
                <p>{getNumberFixed(variation.bitcoin[varName], 2)}</p>
                <p>%</p>
            </div>
            <div className="stat_graph">
                <Graph data={data} width={100} height={30} color="White"/>
            </div>
        </div>
    )
}

export default StatItem
