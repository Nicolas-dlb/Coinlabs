/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import "./Select.scss";
import $ from "jquery";

type SelectProps = {
  items: string;
  setCryptoSelected?: (name: string) => void;
  setCurrencySelected?: (name: string) => void;
};

function Select({
  items,
  setCryptoSelected = undefined,
  setCurrencySelected = undefined,
}: SelectProps) {
  const langArray: any = [];
  let array = langArray;
  let type: string = "crypto";
  let secondType: string = "currency";
  let arrow: string = "select-crypto-arrow";
  let firstValue: string = "All";
  if (items === "currency") {
    const langArray2: any = [];
    array = langArray2;
    type = "currency";
    secondType = "crypto";
    arrow = "select-currency-arrow";
    firstValue = "Balance";
  }
  if (items === "crypto2") {
    const langArray3: any = [];
    array = langArray3;
    type = "crypto2";
    secondType = "crypto";
    arrow = "select-crypto2-arrow";
    firstValue = "Bitcoin";
  }

  useEffect(() => {
    // load array with items
    $(`.${type} option`).each(function loadItems() {
      const value = $(this).text();
      const item = `<li><p>${value}</p></li>`;
      if (array.length < 6) {
        array.push(item);
      }
    });
    // set options with this array

    $(`#${type}-items`).html(array);

    // Set the button value to the first element of the array
    $(`.btn-${type}`).html(array[0]);
    $(`.btn-${type}`).attr("value", `${firstValue}`);

    // change button stuff on click
    $(`#${type}-items li`).click(function selectItem(e) {
      const value: any = $(this).find("p").text();
      const item = `<li><p>${value}</p></li>`;
      $(`.btn-${type}`).html(item);
      $(`.btn-${type}`).attr("value", value);
      if (setCryptoSelected) {
        setCryptoSelected(value);
      } else if (setCurrencySelected) {
        setCurrencySelected(value);
      }

      $(`.${type}-list`).removeClass(`${type}-list-active`);
      $("#select-c").removeClass("toggle-select");
      e.stopPropagation();
    });
    // open options panel on click
    $(`.btn-${type}, .${arrow}`).click((e) => {
      $(`.${secondType}-list`).removeClass(`${secondType}-list-active`);
      $(`.${type}-list`).toggleClass(`${type}-list-active`);

      e.stopPropagation();
    });
    // close options panel when click outside
    $(document).click(() => {
      $(`.${type}-list`).removeClass(`${type}-list-active`);
      $("#select-c").removeClass("toggle-select");
    });
  }, []);

  $(`.btn-${type}, .${arrow}`).click((e) => {
    $(`.${secondType}-list`).removeClass(`${secondType}-list-active`);
    $(`.${type}-list`).toggleClass(`${type}-list-active`);

    e.stopPropagation();
  });

  return (
    <>
      <div>
        <select className={`${type} exchange_element`}>
          {items === "crypto" || items === "crypto2" ? (
            <>
              <option
                className="option exchange_element"
                label="All"
                value="All"
              >
                All
              </option>
              <option
                className="option exchange_element"
                label="Bitcoin"
                value="Bitcoin"
              >
                Bitcoin
              </option>
              <option
                className="option exchange_element"
                label="Ethereum"
                value="Ethereum"
              >
                Ethereum
              </option>

              <option
                className="option exchange_element"
                label="Ripple"
                value="Ripple"
              >
                Ripple
              </option>
              <option
                className="option exchange_element"
                label="Litecoin"
                value="Litecoin"
              >
                Litecoin
              </option>
              <option
                className="option exchange_element"
                label="Neo"
                value="Neo"
              >
                Neo
              </option>
            </>
          ) : (
            <>
              <option
                className="option exchange_element"
                label="Balance"
                value="Balance"
                id="growth_balance"
              >
                Balance
              </option>
              <option
                className="option exchange_element"
                label="Income"
                value="Income"
                id="growth_income"
              >
                Income
              </option>
              <option
                className="option exchange_element"
                label="Expenses"
                value="Expenses"
                id="growth_Expenses"
              >
                Expenses
              </option>
              <option
                className="option exchange_element"
                label="Crypto"
                value="Crypto"
                id="growth_Crypto"
              >
                Crypto
              </option>
            </>
          )}
        </select>
        <div className={`${type}-select exchange_element`}>
          <svg
            className={`select-${type}-arrow exchange_element`}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#605b95"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
          <button
            id="btn-select"
            aria-label="btn-select"
            type="button"
            className={`btn-${type} exchange_element`}
            value="All"
          />
          <div className={`${type}-list exchange_element`}>
            <ul id={`${type}-items`} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Select;
