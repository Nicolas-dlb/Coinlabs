import { useDispatch, useSelector } from "react-redux";
import { selectWallets, setWallets } from "redux/reducers/walletsSlice";
import { getNumberFixed, lastUpdate, numberWithSpaces } from "utils/utils";
import "./InfoBoxD.scss";
import $ from "jquery";
import React, { useEffect } from "react";
import { auth } from "firebaseConfig";

type InfoBoxProps = {
  title: string;
  variation?: number;
  input?: true;
};
function InfoBox({ title, variation, input }: InfoBoxProps) {
  const wallet = useSelector(selectWallets);
  const color = variation && variation > 0 ? "#37bb77" : "#f1c94f";
  const angle = variation && variation > 0 ? "140deg" : "215deg";
  const amount =
    title === "Balance"
      ? wallet.usd
      : title === "Crypto"
      ? wallet.TotalCrypto
      : wallet[title.toLowerCase()];
  const dispatch = useDispatch();

  const setBalance = () => {
    const value = $("#balance").val();
    dispatch(
      setWallets({
        usd: Number(value),
      })
    );
    lastUpdate(dispatch, auth.currentUser?.uid);
    $("#balance").val(getNumberFixed(value, 2));
  };

  useEffect(() => {
    $("#balance").val(getNumberFixed(wallet.usd, 2));
  }, []);
  return (
    <div className="infoboxD">
      <div className="infobox_top">
        <p>{title}</p>
        {variation && (
          <div className="infobox_top_variation">
            <svg
              style={{ transform: `rotate(${angle})` }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 492 492"
              fill={color}
            >
              <path
                strokeWidth="2"
                d="M464.3 207.4l0.8 0.2H135.9l103.5-103.7c5.1-5.1 7.8-11.9 7.8-19.1 0-7.2-2.8-14-7.8-19.1L223.3 49.5c-5.1-5.1-11.8-7.9-19-7.9 -7.2 0-14 2.8-19 7.8L7.8 226.9C2.8 232 0 238.8 0 246c0 7.2 2.8 14 7.8 19.1l177.4 177.4c5.1 5.1 11.8 7.8 19 7.8 7.2 0 13.9-2.8 19-7.8l16.1-16.1c5.1-5.1 7.8-11.8 7.8-19 0-7.2-2.8-13.6-7.8-18.7L134.7 284.4h330c14.8 0 27.3-12.8 27.3-27.6v-22.8C492 219.2 479.2 207.4 464.3 207.4z"
              />
            </svg>
            <p style={{ color }}>{variation}%</p>
          </div>
        )}
      </div>
      <div className="infobox_bottom">
        <p>$</p>
        {!input ? (
          <>
            <p>{numberWithSpaces(getNumberFixed(amount, 2))}</p>
          </>
        ) : (
          <>
            <input onBlur={setBalance} id="balance" type="number" min="0" />
          </>
        )}
      </div>
    </div>
  );
}

export default InfoBox;
