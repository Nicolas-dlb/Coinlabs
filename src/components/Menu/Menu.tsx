import "./Menu.scss";
import market from "assets/pictures/Market.png";
import { useState } from "react";
import john from "assets/pictures/John.svg";
import actuality from "assets/pictures/pastee.svg";
import { useSelector } from "react-redux";
import {
  selectProfilPic,
  selectUserEmail,
  selectUserName,
} from "redux/reducers/userSlice";
import $ from "jquery";

function Menu() {
  const [active, setActive] = useState("dashboard");
  const username = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);
  const profilPic = useSelector(selectProfilPic);

  $("#header_logo").click(() => {
    setActive("dashboard");
    $("#dashboard").addClass("active_window");
    $("#actuality").removeClass("active_window");
    $("#portfolio").removeClass("active_window");
    $("#market").removeClass("active_window");
    $("#changelog").removeClass("active_window");
  });
  return (
    <div id="menu" className="menu">
      <div className="user">
        <img
          className="user_icon"
          src={
            profilPic ||
            "https://www.vhv.rs/dpng/d/164-1645859_selfie-clipart-groucho-glass-good-profile-hd-png.png"
          }
          alt=""
        />

        <div className="user_name">
          <p>{username}</p>
        </div>
        <div className="user_email">
          <p>{email}</p>
        </div>
      </div>
      <nav>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => {
            setActive("dashboard");
            $("#dashboard").addClass("active_window");
            $("#actuality").removeClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#market").removeClass("active_window");
            $("#changelog").removeClass("active_window");
          }}
          onClick={() => {
            setActive("dashboard");
            $("#dashboard").addClass("active_window");
            $("#actuality").removeClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#market").removeClass("active_window");
            $("#changelog").removeClass("active_window");
          }}
          className={
            active === "dashboard" ? "menu_item is_active" : "menu_item"
          }
        >
          <div className="menu_item_icon">
            <div className="dashboard_icon">
              <div className="dashboard_icon_top">
                <span className="square" />
                <span className="square" style={{ opacity: 0.6 }} />
              </div>
              <div className="dashboard_icon_bottom">
                <span className="square" />
                <span className="square" />
              </div>
            </div>
          </div>
          <p>Dashboard</p>
        </div>

        <div
          tabIndex={0}
          onKeyDown={() => {
            setActive("market");
            $("#market").addClass("active_window");
            $("#actuality").removeClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
            $("#changelog").removeClass("active_window");
          }}
          role="button"
          onClick={() => {
            setActive("market");
            $("#market").addClass("active_window");
            $("#actuality").removeClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
            $("#changelog").removeClass("active_window");
          }}
          className={active === "market" ? "menu_item is_active" : "menu_item"}
        >
          <div className="menu_item_icon">
            <span className="fix_market_icon" />
            <img className="market_icon" src={market} alt="" />
          </div>
          <p>Market</p>
        </div>

        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => {
            setActive("portfolio");
            $("#portfolio").addClass("active_window");
            $("#actuality").removeClass("active_window");
            $("#market").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
            $("#changelog").removeClass("active_window");
          }}
          onClick={() => {
            setActive("portfolio");
            $("#portfolio").addClass("active_window");
            $("#actuality").removeClass("active_window");
            $("#market").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
            $("#changelog").removeClass("active_window");
          }}
          className={
            active === "portfolio" ? "menu_item is_active" : "menu_item"
          }
        >
          <div className="menu_item_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 511.4 511.4"
            >
              <g xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m0.7 252v-160.3c0-34.5 28-62.4 62.4-62.4h385c34.5 0 62.4 28 62.4 62.4v259.3c0 34.5-28 62.4-62.4 62.4h-122.5c-21 0-40.7-10.6-52.2-28.2l-28-42.6c-11.5-17.6-31.2-28.2-52.2-28.2h-130.1c-34.5-62.4-28-62.4-62.4z"
                  data-original="#df8621"
                  fill="#e4e4e4"
                />
                <path
                  d="m415.2 0h-214.3c-26.5 0-48 21.5-48 48v284.4c0 26.5 21.5 48 48 48h214.3c26.5 0 48-21.5 48-48v-284.4c0-26.5-21.5-48-48-48z"
                  data-original="#dddaec"
                  fill="#8f8d97"
                />
                <path
                  d="m338.6 73.2h-214.3c-26.5 0-48 21.5-48 48v284.4c0 26.5 21.5 48 48 48h214.3c26.5 0 48-21.5 48-48v-284.4c0-26.5-21.5-48-48-48z"
                  data-original="#f1f4f6"
                  fill="#f1f4f6"
                />
                <path
                  d="m510.6 288.6v160.3c0 34.5-28 62.4-62.4 62.4h-385c-34.5 0-62.4-28-62.4-62.4v-259.3c0-34.5 28-62.4 62.4-62.4h122.5c21 0 40.7 10.6 52.2 28.2l28 42.6c11.5 17.6 31.2 28.2 52.2 28.2h130.1c34.5 0 62.4 28 62.4 62.4z"
                  data-original="#e7a52e"
                  className="a"
                />
                <path
                  d="m114 511.3h-50.8c-34.5 0-62.4-28-62.4-62.4v-259.2c0-34.5 28-62.4 62.4-62.4h50.8c-34.5 0-62.4 28-62.4 62.4v259.2c0 34.5 28 62.4 62.4 62.4z"
                  data-original="#e49824"
                  className="a"
                />
                <path
                  d="m316.8 198.4c-2.3 0-4.5-1.1-6-2.9l-26.9-33.4c-2.7-3.3-2.1-8.2 1.2-10.8s8.2-2.1 10.8 1.2l19.5 24.3 28.3-53.2c2-3.8 6.7-5.2 10.4-3.2 3.8 2 5.2 6.7 3.2 10.4l-33.8 63.5c-1.3 2.5-4 4.1-6.8 4.1z"
                  data-original="#b3e59f"
                  fill="#f2f2f2"
                />
                <g fill="#ffe07d">
                  <path
                    d="m191.9 281.6h-131.6c-4.3 0-7.7-3.5-7.7-7.7s3.5-7.7 7.7-7.7h131.6c4.3 0 7.7 3.5 7.7 7.7 0 4.3-3.5 7.7-7.7 7.7z"
                    data-original="#ffe07d"
                    className="b"
                  />
                  <path
                    d="m191.9 310.1h-131.6c-4.3 0-7.7-3.5-7.7-7.7s3.5-7.7 7.7-7.7h131.6c4.3 0 7.7 3.5 7.7 7.7 0 4.3-3.5 7.7-7.7 7.7z"
                    data-original="#ffe07d"
                    className="b"
                  />
                </g>
              </g>
            </svg>
          </div>
          <p>Portfolio</p>
        </div>

        <div
          tabIndex={0}
          onKeyDown={() => {
            setActive("actuality");
            $("#actuality").addClass("active_window");
            $("#market").removeClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
            $("#changelog").removeClass("active_window");
          }}
          role="button"
          onClick={() => {
            setActive("actuality");
            $("#actuality").addClass("active_window");
            $("#market").removeClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
            $("#changelog").removeClass("active_window");
          }}
          className={
            active === "actuality" ? "menu_item is_active" : "menu_item"
          }
        >
          <div className="menu_item_icon">
            <img src={actuality} alt="" />
          </div>
          <p>Actuality</p>
        </div>

        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => {
            setActive("changelog");
            $("#actuality").removeClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#market").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
            $("#changelog").addClass("active_window");
          }}
          onClick={() => {
            setActive("changelog");
            $("#actuality").removeClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#market").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
            $("#changelog").addClass("active_window");
          }}
          className={
            active === "changelog"
              ? "menu_item is_active menu_changelog"
              : "menu_item menu_changelog"
          }
        >
          <div className="menu_item_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 512 512"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M456.3 130.9V44.5C456.3 19.9 436.4 0 411.8 0H100.2C75.6 0 55.7 19.9 55.7 44.5v219.9C24.7 265.9 0 291.5 0 322.8s24.7 56.9 55.7 58.4v86.3c0 24.6 19.9 44.5 44.5 44.5h311.7c24.6 0 44.5-19.9 44.5-44.5V247.6C487.3 246.1 512 220.5 512 189.2S487.3 132.3 456.3 130.9zM16.7 322.8c0-22.1 17.2-40.2 39-41.6v83.3C33.9 363 16.7 344.9 16.7 322.8zM456.3 230.9v-83.3c21.7 1.4 39 19.6 39 41.6S478.1 229.4 456.3 230.9z"
                data-original="#f2efe2"
                fill="#fff"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M91.8 139.1c0-4.6 3.7-8.3 8.3-8.3h100.2c4.6 0 8.3 3.7 8.3 8.3 0 4.6-3.7 8.3-8.3 8.3H100.2C95.6 147.5 91.8 143.7 91.8 139.1zM411.8 364.5H311.7c-4.6 0-8.3 3.7-8.3 8.3 0 4.6 3.7 8.3 8.3 8.3h100.2c4.6 0 8.3-3.7 8.3-8.3C420.2 368.3 416.4 364.5 411.8 364.5zM211.5 286.6H100.2c-4.6 0-8.3 3.7-8.3 8.3s3.7 8.3 8.3 8.3h111.3c4.6 0 8.3-3.7 8.3-8.3S216.1 286.6 211.5 286.6zM411.8 286.6H311.7c-4.6 0-8.3 3.7-8.3 8.3s3.7 8.3 8.3 8.3h100.2c4.6 0 8.3-3.7 8.3-8.3S416.4 286.6 411.8 286.6zM203.1 217c0 4.6 3.7 8.3 8.3 8.3h200.3c4.6 0 8.3-3.7 8.3-8.3 0-4.6-3.7-8.3-8.3-8.3H211.5C206.9 208.7 203.1 212.4 203.1 217zM100.2 225.4h44.5c4.6 0 8.3-3.7 8.3-8.3 0-4.6-3.7-8.3-8.3-8.3h-44.5c-4.6 0-8.3 3.7-8.3 8.3C91.8 221.7 95.6 225.4 100.2 225.4zM177 208.7c-4.6 0-8.3 3.7-8.3 8.3 0 4.6 3.7 8.3 8.3 8.3h1.1c4.6 0 8.3-3.7 8.3-8.3 0-4.6-3.7-8.3-8.3-8.3H177zM246 286.6h-1.1c-4.6 0-8.3 3.7-8.3 8.3s3.7 8.3 8.3 8.3h1.1c4.6 0 8.3-3.7 8.3-8.3S250.6 286.6 246 286.6zM278.3 286.6h-1.1c-4.6 0-8.3 3.7-8.3 8.3s3.7 8.3 8.3 8.3h1.1c4.6 0 8.3-3.7 8.3-8.3S282.9 286.6 278.3 286.6z"
                data-original="#bfbba3"
                fill="#878474"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M263.9 379.1l-43.3 34.2c-2.2 1.7-5.7 1.7-7.9 0 -1-0.8-1.6-1.9-1.6-3.1v-28.9H64h-5.6C26.2 381.2 0 355 0 322.8c0-31.3 24.7-56.9 55.7-58.4v16.7c-21.7 1.4-39 19.6-39 41.6 0 23 18.7 41.7 41.7 41.7H64h147.1v-28.9c0-1.2 0.6-2.3 1.6-3.1 2.2-1.7 5.7-1.7 7.9 0l43.3 34.2C268.2 370.1 268.2 375.7 263.9 379.1zM453.6 130.8H448 300.5v-28.9c0-1.2-0.6-2.3-1.6-3.1 -2.2-1.7-5.7-1.7-7.9 0l-43.3 34.2c-4.3 3.4-4.3 9 0 12.4l43.3 34.2c2.2 1.7 5.7 1.7 7.9 0 1-0.8 1.6-1.9 1.6-3.1v-28.9H448h5.6c23 0 41.7 18.7 41.7 41.7 0 22.1-17.2 40.2-39 41.6v16.7C487.3 246.1 512 220.5 512 189.2 512 157 485.8 130.8 453.6 130.8z"
                data-original="#fc8059"
                fill="#878474"
              />
            </svg>
          </div>
          <p>Changelog</p>
        </div>
      </nav>
      <div className="john">
        <img src={john} alt="" />
        <p>Newest version soon available!</p>
        <p>More info version 1.1</p>
        <span
          role="button"
          tabIndex={0}
          onKeyDown={() => {
            setActive("changelog");
            $("#actuality").removeClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#market").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
            $("#changelog").addClass("active_window");
          }}
          onClick={() => {
            setActive("changelog");
            $("#actuality").removeClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#market").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
            $("#changelog").addClass("active_window");
          }}
        >
          Read
        </span>
      </div>
    </div>
  );
}

export default Menu;
