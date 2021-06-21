/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import { useEffect } from "react";
import "./Select.scss";
import $ from "jquery";


type SelectProps = {
  items: string;
  setCryptoSelected?: any;
  setCurrencySelected?: any;
};

function Select({
  items,
  setCryptoSelected = false,
  setCurrencySelected = false,
}: SelectProps) {
  /* useEffect(() => {
     Test for rewrite Jquery script in pure JS 

    const array: any = [];
    const options = [...document.getElementsByClassName("option")];
    const btn = document.querySelector(".btn-select")!;
    const cryptoList = document.querySelector(".crypto-list")!;
    const cryptoItems = document.getElementById("crypto-items")!;
    const liItems = cryptoItems.querySelectorAll("li")!;

    options.forEach((option) => {
      const img = option.getAttribute("data-thumbnail");
      const value = option.getAttribute("value");
      const item = `<li value="${value}" src="${img}" onClick="selectItem()" class="select"><img class="select" src="${img}" alt="" value="${value}"/></li>`;
      array.push(item);
    });

    cryptoItems.innerHTML = array.join("");
    // Set the button value to the first el of the array
    btn.innerHTML = array[0];
    btn.setAttribute("value", "ethereum");

    // change button stuff on click

    document.addEventListener("click", (e: any) => {
      if (!e.target.classList.contains("select")) {
        setSelectCrypto(false);
      }
    }); 
  }, []); */
  const langArray: any = [];
  let array = langArray;
  let type: string = "crypto";
  let secondType: string = "currency";
  let arrow: string = "select-crypto-arrow";
  let firstValue: string = "ethereum";
  if (items === "currency") {
    const langArray2: any = [];
    array = langArray2;
    type = "currency";
    secondType = "crypto";
    arrow = "select-currency-arrow";
    firstValue = "usd";
  }
  if (items === "currency2") {
    const langArray3: any = [];
    array = langArray3;
    type = "currency2";
    secondType = "crypto2";
    arrow = "select-currency2-arrow";
    firstValue = "usd";
  }

  useEffect(() => {
    // load array with items
    $(`.${type} option`).each(function loadItems() {
     
      const value = $(this).text();
      const item = `<li><p>${value}</p></li>`;
      array.push(item);
    });
    // set options with this array
    $(`#${type}-items`).html(array);

    // Set the button value to the first element of the array
    $(`.btn-${type}`).html(array[0]);
    $(`.btn-${type}`).attr("value", `${firstValue}`);

    // change button stuff on click
    $(`#${type}-items li`).click(function selectItem(e) {
      const img = $(this).find("img").attr("src");
      const value: any = $(this).find("p").text();
      const item = `<li><p>${value}</p></li>`;
      $(`.btn-${type}`).html(item);
      $(`.btn-${type}`).attr("value", value);
   setCryptoSelected(value);
   
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
  const crypto = $("#btn-select").text();
  
  if (setCryptoSelected) {
    setCryptoSelected(crypto);

    
  }


  return (
    <>
      <div>
        <select className={`${type} exchange_element`}>
          {items === "crypto" ? (
            <>
            <option
                className="option exchange_element"
                label="All"
                value="All"
                
              >All</option>
            <option
                className="option exchange_element"
                label="Bitcoin"
                value="Bitcoin"
                
              >Bitcoin</option>
              <option
                className="option exchange_element"
                label="Ethereum"
                value="Ethereum"
                
              >Ethereum</option>
              
              <option
                className="option exchange_element"
                label="Ripple"
                value="Ripple"
                
              >Ripple</option>
              <option
                className="option exchange_element"
                label="Litecoin"
                value="Litecoin"
                
              >Litecoin</option>
              <option
                className="option exchange_element"
                label="Neo"
                value="Neo"
                
              >Neo</option>
             

             
            </>
          ) : (
            <>
              <option label="dollar" value="usd" />
              <option label="euro" value="eur"  />
              <option label="livre" value="gbp"  />
              <option label="pesos" value="mxn"  />
            </>
          )}
        </select>
        <div
          className={
            items === "crypto"
              ? "crypto-select exchange_element"
              : items === "currency2"
              ? "currency-select3 exchange_element"
              : "currency-select2 exchange_element"
          }
        >
          <svg
            className={
              items === "crypto"
                ? "select-crypto-arrow exchange_element"
                : items === "currency2"
                ? "select-currency2-arrow exchange_element"
                : "select-currency-arrow exchange_element"
            }
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
            className={
              items === "crypto"
                ? "btn-crypto exchange_element"
                : items === "currency2"
                ? "btn-currency2 exchange_element"
                : "btn-currency exchange_element"
            }
            value=""
          />
          <div
            className={
              items === "crypto"
                ? "crypto-list exchange_element"
                : items === "currency2"
                ? "currency2-list exchange_element"
                : "currency-list exchange_element"
            }
          >
            <ul
              id={
                items === "crypto"
                  ? "crypto-items"
                  : items === "currency2"
                  ? "currency2-items"
                  : "currency-items"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Select;
