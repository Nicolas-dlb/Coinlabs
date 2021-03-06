import "./Transactions.scss";
import { useSelector } from "react-redux";
import { selectWalletHistory } from "redux/reducers/walletsSlice";
import React from "react";
import Transaction from "./Transaction/Transaction";

function Transactions() {
  const walletHistory = useSelector(selectWalletHistory);
  const history = walletHistory?.slice(0, 6);
  return (
    <div className="transactions">
      {history?.map((item: any) => (
        <Transaction
          key={Math.random()}
          name={item.name}
          status={item.status}
          price={Number(item.price)}
        />
      ))}
    </div>
  );
}

export default Transactions;
