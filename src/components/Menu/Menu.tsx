import "./Menu.scss";
import market from "assets/pictures/Market.png";
import { useState } from "react";
import john from "assets/pictures/John.svg";
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
            $("#portfolio").removeClass("active_window");
            $("#market").removeClass("active_window");
          }}
          onClick={() => {
            setActive("dashboard");
            $("#dashboard").addClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#market").removeClass("active_window");
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
            $("#portfolio").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
          }}
          role="button"
          onClick={() => {
            setActive("market");
            $("#market").addClass("active_window");
            $("#portfolio").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
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
            $("#market").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
          }}
          onClick={() => {
            setActive("portfolio");
            $("#portfolio").addClass("active_window");
            $("#market").removeClass("active_window");
            $("#dashboard").removeClass("active_window");
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
      </nav>
      <div className="john">
        <img src={john} alt="" />
        <p>Newest version soon available!</p>
        <p>More info version 1.2</p>
        <span>Update</span>
      </div>
    </div>
  );
}

export default Menu;
