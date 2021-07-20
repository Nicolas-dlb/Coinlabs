import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectHistory,
  selectMarket,
  selectVariation,
} from "redux/reducers/marketSlice";
import "./Variation.scss";
import Graph from "components/Graph2/Graph";
import { getNumberFixed, numberWithSpaces } from "utils/utils";

type VariationProps = {
  name: string;
  time: string;
};

function Variation({ name, time }: VariationProps) {
  const variation = useSelector(selectVariation);
  const history = useSelector(selectHistory);
  const market = useSelector(selectMarket);
  let color;
  if (variation) {
    color =
      variation[name.toLowerCase()][time.toLowerCase()] > 0
        ? "#37bb77"
        : "#f1c94f";
  }
  const angle =
    variation[name.toLowerCase()][time.toLowerCase()] > 0 ? "140deg" : "210deg";
  const historyName =
    time === "Current"
      ? `${name.toLowerCase()}Week`
      : `${name.toLowerCase()}${time}`;

  let timelineData = [...Array(110).keys()].map((x) => ({
    tokens: x,
    Price: 0,
    timestamp: 37364728,
  }));
  if (history[historyName]) {
    timelineData = [...Array(history[historyName]?.length).keys()].map((x) => ({
      tokens: x,
      Price: history[historyName][x][1],
      timestamp: history[historyName][x][0],
    }));
  }

  const [price, setPrice] = useState("0.00");
  useEffect(() => {
    if (history[historyName]) {
      setPrice(history[historyName][0][1]);
    }
  }, [history, name]);
  return (
    <div className="variation">
      <div className="variation_left">
        <div className="variation_top">
          <p className="title">
            {time === "3Month" || time === "6Month"
              ? `${time.charAt(0)} ${time.slice(-5)}`
              : time}
          </p>
          {time !== "Current" && (
            <div style={{ color }} className="variation_container">
              <svg
                style={{ transform: `rotate(${angle})` }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 492 492"
                fill={color}
              >
                <path d="M464.3 207.4l0.8 0.2H135.9l103.5-103.7c5.1-5.1 7.8-11.9 7.8-19.1 0-7.2-2.8-14-7.8-19.1L223.3 49.5c-5.1-5.1-11.8-7.9-19-7.9 -7.2 0-14 2.8-19 7.8L7.8 226.9C2.8 232 0 238.8 0 246c0 7.2 2.8 14 7.8 19.1l177.4 177.4c5.1 5.1 11.8 7.8 19 7.8 7.2 0 13.9-2.8 19-7.8l16.1-16.1c5.1-5.1 7.8-11.8 7.8-19 0-7.2-2.8-13.6-7.8-18.7L134.7 284.4h330c14.8 0 27.3-12.8 27.3-27.6v-22.8C492 219.2 479.2 207.4 464.3 207.4z" />
              </svg>
              <p className="variation_number">
                {time === "6Month" || time === "3Month"
                  ? getNumberFixed(
                      variation[name.toLowerCase()][
                        time.slice(-5).toLowerCase() + time.charAt(0)
                      ],
                      2
                    )
                  : getNumberFixed(
                      variation[name.toLowerCase()][time.toLowerCase()],
                      2
                    )}
              </p>
              <p>%</p>
            </div>
          )}
        </div>
        <div className="variation_bottom">
          <p>$</p>
          <p className="variation_price">
            {time === "Current"
              ? numberWithSpaces(
                  getNumberFixed(market[name.toLowerCase()].usd, 2)
                )
              : numberWithSpaces(getNumberFixed(price, 2))}
          </p>
        </div>
      </div>
      <div
        className={
          (time === "Current" && history[historyName]) ||
          (time === "Week" && history[historyName])
            ? "variation_right fix"
            : time === "Month" && history[historyName]
            ? "variation_right fix_month"
            : time === "3Month" && history[historyName]
            ? "variation_right fix_3Month"
            : "variation_right"
        }
      >
        <Graph data={timelineData} color="White" width={115} height={90} />
      </div>
    </div>
  );
}

export default Variation;
