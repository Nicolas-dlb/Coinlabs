import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Graph.scss";
import React, { useEffect, useState } from "react";
import { getNumberFixed, numberWithSpaces } from "utils/utils";
import Grid from "./Grid/Grid";

type GraphProps = {
  data: Array<Object>;
  color: string;
  width: number;
  height: number | undefined;
  tooltip?: true;
  selected?: string;
};

function Graph({
  data,
  color,
  width,
  height,
  tooltip = undefined,
  selected = "",
}: GraphProps) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (selected === "Bitcoin" || selected === "All") {
      setNumber(0);
    } else if (selected === "Ethereum") {
      setNumber(1);
    } else if (selected === "Litecoin") {
      setNumber(2);
    } else if (selected === "Ripple") {
      setNumber(4);
    } else if (selected === "Neo") {
      setNumber(3);
    }
  }, [selected]);

  const CustomTooltip = ({ active, payload, num }: any) => {
    let angle;
    if (payload) {
      angle = payload[0]?.value > 0 ? "140deg" : "215deg";
    }
    const divise =
      num === 0
        ? 1
        : num === 1
        ? 11
        : num === 2
        ? 100
        : num === 4
        ? 5000
        : num === 3
        ? 200
        : 1;
    const price = payload[num]?.value / divise;
    if (active) {
      return (
        <>
          <div className="tooltip-top">
            <p style={{ marginRight: "25px" }}>Balance</p>
            <svg
              style={{ transform: `rotate(${angle})` }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 492 492"
              fill="#fff"
            >
              <path d="M464.3 207.4l0.8 0.2H135.9l103.5-103.7c5.1-5.1 7.8-11.9 7.8-19.1 0-7.2-2.8-14-7.8-19.1L223.3 49.5c-5.1-5.1-11.8-7.9-19-7.9 -7.2 0-14 2.8-19 7.8L7.8 226.9C2.8 232 0 238.8 0 246c0 7.2 2.8 14 7.8 19.1l177.4 177.4c5.1 5.1 11.8 7.8 19 7.8 7.2 0 13.9-2.8 19-7.8l16.1-16.1c5.1-5.1 7.8-11.8 7.8-19 0-7.2-2.8-13.6-7.8-18.7L134.7 284.4h330c14.8 0 27.3-12.8 27.3-27.6v-22.8C492 219.2 479.2 207.4 464.3 207.4z" />
            </svg>
            <p style={{ marginLeft: "6px" }}>12%</p>
          </div>
          <div className="tooltip-bottom">
            <p>$</p>
            <p className="tooltip_price" id="tooltip_price">
              {numberWithSpaces(getNumberFixed(price, 2))}
            </p>
          </div>
        </>
      );
    }

    return null;
  };

  const wrapperStyle = {
    borderRadius: "15px",
    background:
      number === 0
        ? "linear-gradient(20deg, rgba(11,171,81,1) 0%, rgba(30,171,155,1) 100%)"
        : number === 1
        ? "linear-gradient(292deg, rgba(105,162,200,1) 0%, rgba(72,140,185,1) 100%)"
        : number === 2
        ? "linear-gradient(233deg, rgba(203,161,128,1) 0%, rgba(219,154,103,1) 100%)"
        : number === 4
        ? "linear-gradient(225deg, rgba(170,134,190,1) 0%, rgba(160,117,185,1) 30%)"
        : "linear-gradient(233deg, rgba(117,174,218,1) 0%, rgba(74,156,192,1) 40%)",
    border: "none",
    color: "#fff",
    padding: "10px",
    paddingTop: "12px",
    BoxShadow: "0px 6px 18px -6px rgba(0,0,0,0.49)",
    WebkitBoxShadow: "0px 6px 18px -6px rgba(0,0,0,0.49)",
    MozBoxShadow: "0px 6px 18px -6px rgba(0,0,0,0.49)",
    alignItems: "space-evenly",
    justifyContent: "center",
    zIndex: 1000,
  };

  return (
    <div className="graph_container">
      <div className="graph">
        <ResponsiveContainer
          width={width || (!width && tooltip ? "90%" : "99%")}
          height={height}
        >
          <AreaChart width={width} height={height} data={data}>
            <defs>
              <linearGradient id="Green" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2aac63" stopOpacity={0.17} />
                <stop offset="100%" stopColor="#2aac63" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="White" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity={0} />
                <stop offset="100%" stopColor="#fff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="Blue" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4689b6" stopOpacity={0.17} />
                <stop offset="100%" stopColor="#4689b6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="Pink" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a075b9" stopOpacity={0.17} />
                <stop offset="100%" stopColor="#a075b9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="Orange" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#db9a67" stopOpacity={0.17} />
                <stop offset="100%" stopColor="#db9a67" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="Blue2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a9cc0" stopOpacity={0.17} />
                <stop offset="100%" stopColor="#4a9cc0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              type="number"
              dataKey="tokens"
              hide
              interval="preserveStartEnd"
              tickMargin={25}
              tickLine
              axisLine={false}
              tickCount={5}
            />
            <YAxis hide tickMargin={25} tickLine axisLine={false} />
            {tooltip && (
              <Tooltip
                content={<CustomTooltip num={number} />}
                wrapperStyle={wrapperStyle}
                itemStyle={{ color: "rgb(11,171,81)" }}
                cursor={{
                  stroke:
                    number === 0
                      ? "rgb(11,171,81)"
                      : number === 1
                      ? "#4689b6"
                      : number === 2
                      ? "#db9a67"
                      : number === 4
                      ? "#a075b9"
                      : "#4a9cc0",
                  strokeWidth: 1.8,
                  strokeDasharray: 10,
                }}
                labelFormatter={(value: any) => `Tokens: ${value}`}
              />
            )}
            <Area
              activeDot={{
                stroke: "#fff",
                fill: "#26ae5f",
                strokeWidth: number === 0 ? 3 : 0,
                r: number === 0 ? 5 : 0,
              }}
              onMouseOver={() => {
                setNumber(0);
              }}
              strokeWidth={
                selected.includes("Bitcoin") ||
                selected.includes("All") ||
                selected === ""
                  ? 1
                  : 0
              }
              type="monotone"
              dataKey="Price"
              stroke={
                color === "Red"
                  ? "#f0487c"
                  : color === "Green"
                  ? "#2aac63"
                  : color === "White"
                  ? "#fff"
                  : "#fff"
              }
              fillOpacity={1}
              fill={
                selected.includes("Bitcoin") ||
                selected.includes("All") ||
                selected === ""
                  ? `url(#${color})`
                  : "none"
              }
            />

            <Area
              activeDot={{
                stroke: "#fff",
                fill: "#4689b6",
                strokeWidth: number === 1 ? 3 : 0,
                r: number === 1 ? 5 : 0,
              }}
              onMouseOver={() => {
                setNumber(1);
              }}
              strokeWidth={
                selected.includes("Ethereum") || selected.includes("All")
                  ? 1
                  : 0
              }
              type="monotone"
              dataKey="ethereum"
              stroke="#4689b6"
              fillOpacity={1}
              fill={
                selected.includes("Ethereum") || selected.includes("All")
                  ? `url(#Blue)`
                  : "none"
              }
            />
            <Area
              activeDot={{
                stroke: "#fff",
                fill: "#db9a67",
                strokeWidth: number === 2 ? 3 : 0,
                r: number === 2 ? 5 : 0,
              }}
              onMouseOver={() => {
                setNumber(2);
              }}
              strokeWidth={
                selected.includes("Litecoin") || selected.includes("All")
                  ? 1
                  : 0
              }
              type="monotone"
              dataKey="litecoin"
              stroke="#db9a67"
              fillOpacity={1}
              fill={
                selected.includes("Litecoin") || selected.includes("All")
                  ? `url(#Orange)`
                  : "none"
              }
            />

            <Area
              activeDot={{
                stroke: "#fff",
                fill: "#4a9cc0",
                strokeWidth: number === 3 ? 3 : 0,
                r: number === 3 ? 5 : 0,
              }}
              onMouseOver={() => {
                setNumber(3);
              }}
              strokeWidth={
                selected.includes("Neo") || selected.includes("All") ? 1 : 0
              }
              type="monotone"
              dataKey="neo"
              stroke="#4a9cc0"
              fillOpacity={1}
              fill={
                selected.includes("Neo") || selected.includes("All")
                  ? `url(#Blue2)`
                  : "none"
              }
            />

            <Area
              activeDot={{
                stroke: "#fff",
                fill: "#a075b9",
                strokeWidth: number === 4 ? 3 : 0,
                r: number === 4 ? 5 : 0,
              }}
              onMouseOver={() => {
                setNumber(4);
              }}
              strokeWidth={
                selected.includes("Ripple") || selected.includes("All") ? 1 : 0
              }
              type="monotone"
              dataKey="ripple"
              stroke="#a075b9"
              fillOpacity={1}
              fill={
                selected.includes("Ripple") || selected.includes("All")
                  ? `url(#Pink)`
                  : "none"
              }
            />
          </AreaChart>
        </ResponsiveContainer>
        <Grid />
      </div>
    </div>
  );
}

export default Graph;
