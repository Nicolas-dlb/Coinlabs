import "./Menu.scss";
import React, { useState } from "react";
import rocket from "assets/pictures/rocket.svg";
import { useSelector } from "react-redux";
import {
  selectProfilPic,
  selectUserEmail,
  selectUserName,
} from "redux/reducers/userSlice";
import $ from "jquery";
import john2 from "assets/pictures/john.png";
import MenuItem from "./MenuItem/MenuItem";

function Menu() {
  const [active, setActive] = useState("dashboard");
  const username = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);
  const profilPic = useSelector(selectProfilPic);

  const setInterface = (name: string): void => {
    setActive(name);
    $("#market").removeClass("active_window");
    $("#actuality").removeClass("active_window");
    $("#portfolio").removeClass("active_window");
    $("#dashboard").removeClass("active_window");
    $("#changelog").removeClass("active_window");
    $("#settings").removeClass("active_window");
    $(".search_icon").removeClass("search_icon_active");
    $("#search").removeClass("active_window");
    $(".no_results_found").removeClass("active_window");
    $(`#${name}`).addClass("active_window");
  };

  $("#header_logo").click(() => setInterface("dashboard"));

  return (
    <div id="menu" className="menu">
      <div className="user">
        <img className="user_icon" src={profilPic || john2} alt="" />
        <div className="user_name">
          <p>{username}</p>
        </div>
        <div className="user_email">
          <p>{email}</p>
        </div>
      </div>
      <nav>
        <MenuItem onClick={setInterface} item="Dashboard" active={active} />
        <MenuItem onClick={setInterface} item="Market" active={active} />
        <MenuItem onClick={setInterface} item="Portfolio" active={active} />
        <MenuItem onClick={setInterface} item="Changelog" active={active} />
        <MenuItem onClick={setInterface} item="Settings" active={active} />
      </nav>
      <div className="john">
        <img src={rocket} alt="" />
        <p>Newest version soon available!</p>
        <p>More info version 1.1</p>
        <span
          role="button"
          tabIndex={0}
          onKeyDown={() => setInterface("changelog")}
          onClick={() => setInterface("changelog")}
        >
          Read
        </span>
      </div>
    </div>
  );
}

export default Menu;
