/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import { useEffect } from "react";
import "./SelectExchange.scss";
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
    const btn = document.querySelector(".select-sell")!;
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
  let type: string = "sell";
  let secondType: string = "buy";
  let arrow: string = "select-sell-arrow";
  let firstValue: string = "Bitcoin";
  if (items === "buy") {
    const langArray2: any = [];
    array = langArray2;
    type = "buy";
    secondType = "sell";
    arrow = "select-buy-arrow";
    firstValue = "Bitcoin";
  } else if (items === "add") {
 const langArray3: any = [];
    array = langArray3;
    type = "add";
    secondType = "";
    arrow = "select-add-arrow";
    firstValue = "Bitcoin";
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
      
      const value: any = $(this).text();
      const item = `<li><p>${value}</p></li>`;
      $(`.btn-${type}`).html(item);
      $(`.btn-${type}`).attr("value", value);
   const sell = $(`#select-sell`).text();
  const add = $(`#select-add`).text();
  if (setCryptoSelected) {

    if (items === "add") {
      setCryptoSelected(add);
      return;
    }
     const result = sell === "BTC" ? "bitcoin" : sell === "ETH" ? "ethereum" : sell === "XRP" ? "ripple" : sell === "LTC" ? "litecoin" : "neo";
    setCryptoSelected(result);
    
  }

   const buy = $(`#select-buy`).text();
  
  if (setCurrencySelected) {
    const result = buy === "BTC" ? "bitcoin" : buy === "ETH" ? "ethereum" : buy === "XRP" ? "ripple" : buy === "LTC" ? "litecoin" : "neo";
    setCurrencySelected(result);

    
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
 

  return (
    <>
      <div>
        <select className={`${type} exchange_element`}>
         
            <option
                className="option exchange_element"
                label="BTC"
                value="BTC"
                
              >BTC</option>
              <option
                className="option exchange_element"
                label="ETH"
                value="ETH"
                
              >ETH</option>
              
              <option
                className="option exchange_element"
                label="XRP"
                value="XRP"
                
              >XRP</option>
              <option
                className="option exchange_element"
                label="LTC"
                value="LTC"
                
              >LTC</option>
              <option
                className="option exchange_element"
                label="NEO"
                value="NEO"
                
              >NEO</option>    
        </select>
        <div
          className={`${type}-select exchange_element`}>
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
            id={`select-${type}`}
            aria-label={`select-${type}`}
            type="button"
            className={`btn-${type} exchange_element`}
            value=""
          />
          <div
            className={`${type}-list exchange_element`}
          >
            <ul
              id={`${type}-items`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Select;
