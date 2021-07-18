/* eslint-disable no-unused-vars */
import React from "react";
import marketIcon from "assets/pictures/Market.png";
import "./MenuItem.scss";
import $ from "jquery";
import portfolioIcon from "assets/pictures/portfolioIcon.svg";

type MenuItemProps = {
  item: string;
  onClick: (name: string) => void;
  active: string;
};

function MenuItem({ item, onClick, active }: MenuItemProps) {
  const dashboardIcon = (
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
  );

  const settingsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
      <path d="M22.2 14.4L21 13.7c-1.3-0.8-1.3-2.7 0-3.5l1.2-0.7c1-0.6 1.3-1.8 0.7-2.7l-1-1.7c-0.6-1-1.8-1.3-2.7-0.7L18 5.1c-1.3 0.8-3-0.2-3-1.7V2c0-1.1-0.9-2-2-2h-2C9.9 0 9 0.9 9 2v1.3c0 1.5-1.7 2.5-3 1.7L4.8 4.4c-1-0.6-2.2-0.2-2.7 0.7l-1 1.7C0.6 7.8 0.9 9 1.8 9.6L3 10.3C4.3 11 4.3 13 3 13.7l-1.2 0.7c-1 0.6-1.3 1.8-0.7 2.7l1 1.7c0.6 1 1.8 1.3 2.7 0.7L6 18.9c1.3-0.8 3 0.2 3 1.7V22c0 1.1 0.9 2 2 2h2c1.1 0 2-0.9 2-2v-1.3c0-1.5 1.7-2.5 3-1.7l1.2 0.7c1 0.6 2.2 0.2 2.7-0.7l1-1.7C23.4 16.2 23.1 15 22.2 14.4zM12 16c-2.2 0-4-1.8-4-4 0-2.2 1.8-4 4-4s4 1.8 4 4C16 14.2 14.2 16 12 16z" />
    </svg>
  );

  const changelogIcon = (
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
  );
  const img: any =
    item === "Market"
      ? marketIcon
      : item === "Dashboard"
      ? dashboardIcon
      : item === "Settings"
      ? settingsIcon
      : portfolioIcon;
  return (
    <div
      id={`menu_${item.toLowerCase()}`}
      tabIndex={0}
      onKeyDown={() => onClick(item.toLowerCase())}
      role="button"
      onClick={() => {
        $(`#menu_${item.toLowerCase()}`).addClass("active_window");
        onClick(item.toLowerCase());
      }}
      className={
        active === item.toLowerCase() || active === item
          ? `menu_item is_active menu_${item.toLowerCase()}`
          : `menu_item menu_${item.toLowerCase()}`
      }
    >
      <div className="menu_item_icon">
        {item === "Market" && <span className="fix_market_icon" />}
        {item === "Dashboard" ? (
          dashboardIcon
        ) : item === "Changelog" ? (
          changelogIcon
        ) : item === "Settings" ? (
          settingsIcon
        ) : (
          <img className={`${item.toLowerCase()}_icon`} src={img} alt="" />
        )}
      </div>
      <p>{item}</p>
    </div>
  );
}

export default MenuItem;
