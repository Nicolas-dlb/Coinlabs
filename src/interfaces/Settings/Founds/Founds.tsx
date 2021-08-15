/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Founds.scss";
import $ from "jquery";
import { selectWallets, setWallets } from "redux/reducers/walletsSlice";

function Founds() {
  const dispatch = useDispatch();
  const wallet = useSelector(selectWallets);
  const [amount, setAmount] = useState(0);
  const setWallet = () => {
    dispatch(setWallets({ usd: wallet.usd + amount }));
    $("#add_founds").val("");
    setAmount(0);
  };
  return (
    <div className="settings_founds">
      <h3>Founds</h3>
      <div className="settings_founds_input">
        <div className="input">
          <p>$</p>
          <input
            id="add_founds"
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            min="0"
            placeholder="Enter amount"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setWallet();
              }
            }}
          />
        </div>
        <button
          className="btn_settings"
          onClick={() => {
            setWallet();
          }}
          type="button"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Founds;
