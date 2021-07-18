import "./InfoBoxM.scss";
import { numberWithSpaces } from "utils/utils";
import React from "react";
import Graph from "components/Graph2/Graph";

type InfoBoxProps = {
  name: string;
  price: number;
  variation: number;
  data: any;
};
function InfoBox({ name, price, variation, data }: InfoBoxProps) {
  const color = variation && variation > 0 ? "#37bb77" : "#f1c94f";
  const angle = variation && variation > 0 ? "140deg" : "210deg";

  let timelineData = [...Array(110).keys()].map((x) => ({
    tokens: x,
    Price: 0,
    timestamp: 37364728,
  }));
  if (data) {
    timelineData = [...Array(data?.length).keys()].map((x) => ({
      tokens: x,
      Price: data[x][1],
      timestamp: data[x][0],
    }));
  }
  return (
    <div className="infoboxM">
      <div
        className={
          name === "Ethereum" ? "infobox_left fix_ethereum" : "infobox_left"
        }
      >
        <div className="infobox_left_top">
          <p id="infoBoxM_name">{name}</p>
          <svg
            style={{ transform: `rotate(${angle})` }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 492 492"
            fill={color}
          >
            <path d="M464.3 207.4l0.8 0.2H135.9l103.5-103.7c5.1-5.1 7.8-11.9 7.8-19.1 0-7.2-2.8-14-7.8-19.1L223.3 49.5c-5.1-5.1-11.8-7.9-19-7.9 -7.2 0-14 2.8-19 7.8L7.8 226.9C2.8 232 0 238.8 0 246c0 7.2 2.8 14 7.8 19.1l177.4 177.4c5.1 5.1 11.8 7.8 19 7.8 7.2 0 13.9-2.8 19-7.8l16.1-16.1c5.1-5.1 7.8-11.8 7.8-19 0-7.2-2.8-13.6-7.8-18.7L134.7 284.4h330c14.8 0 27.3-12.8 27.3-27.6v-22.8C492 219.2 479.2 207.4 464.3 207.4z" />
          </svg>
        </div>
        <div className="infobox_left_bottom">
          <p>$</p>
          <p id="infoboxM_price">{numberWithSpaces(price)}</p>
        </div>
      </div>
      <div className="infobox_right">
        <Graph data={timelineData} color="White" width={115} height={90} />
      </div>
    </div>
  );
}

export default InfoBox;
