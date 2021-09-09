/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Header.scss";
import { auth } from "firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { selectProfilPic, selectUserName } from "redux/reducers/userSlice";
import john from "assets/pictures/john.png";
import $ from "jquery";
import { selectNotifications, setSearch } from "redux/reducers/appSlice";
import disableScroll from "disable-scroll";
import Notifications from "./notifications/Notifications";

function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const username = useSelector(selectUserName);
  const profilPic = useSelector(selectProfilPic);
  const [notificationActive, setNotificationActive] = useState(false);
  const [notif, setNotif] = useState(false);

  $(".notification_title not").click(() => {
    setNotificationActive(false);
  });
  const n = useSelector(selectNotifications);
  let a = false;
  n.map((x: any) => (x.read === false ? (a = true) : x));
  const logoutColor = menuActive ? "#787878" : "#FFF";

  useEffect(() => {
    const event = () => {
      $(".app").click((e) => {
        if (!e.target.classList.contains("not")) {
          if (notificationActive === true) setNotificationActive(false);
        }
        if (!e.target.classList.contains("log")) {
          if (document.getElementById("header_user_logout")) {
            document
              .getElementById("header_user_logout")!
              .classList.remove("header_user_logout_active");
          }
        }
      });
    };
    event();
    return event;
  }, []);
  // $(".app").click((e) => {
  //   if (!e.target.classList.contains("not")) {
  //     if (notificationActive === true) setNotificationActive(false);
  //   }
  //   if (!e.target.classList.contains("log")) {
  //     document
  //       .getElementById("header_user_logout")!
  //       .classList.remove("header_user_logout_active");
  //   }
  // });

  const handleClick = () => {
    document.getElementById("toggleMenu")!.classList.toggle("is-active");
    document.getElementById("menu")!.classList.toggle("toggle_menu");
    document.getElementById("container")!.classList.toggle("container_active");
    document
      .getElementById("btn_search_mobile")
      ?.classList.toggle("btn_menu_active");
    document.getElementById("shadow")!.classList.toggle("shadow_active");
    document.getElementById("shadow")!.classList.toggle("opacity");
    setMenuActive(!menuActive);
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
      "--secondary-bg-color"
    );
    if (bgColor !== "#221e34") {
      document.documentElement.style.setProperty(
        "--secondary-bg-color",
        "#221e34"
      );
      document.documentElement.style.setProperty("--third-bg-color", "#29253b");
    } else {
      document.documentElement.style.setProperty(
        "--secondary-bg-color",
        "#171429"
      );
      document.documentElement.style.setProperty("--third-bg-color", "#221e34");
    }
    if (!menuActive) {
      disableScroll.on();
      document.getElementById("search-bar")!.style.backgroundColor =
        "transparent";
    } else {
      disableScroll.off();
      document.getElementById("search-bar")!.style.backgroundColor =
        "var(--app-bg)";
    }
  };

  const animeLogo = () => {
    document.getElementById("logo_stick1")!.style.animation =
      "load 1s 0s linear";
    document.getElementById("logo_stick2")!.style.animation =
      "load3 1s 0.2s linear";
    document.getElementById("logo_stick3")!.style.animation =
      "load4 1s 0.4s linear";
    setTimeout(() => {
      document.getElementById("logo_stick1")!.style.animation = "none";
      document.getElementById("logo_stick2")!.style.animation = "none";
      document.getElementById("logo_stick3")!.style.animation = "none";
    }, 1000);
  };

  const dispatch = useDispatch();
  const search = (searchId: string) => {
    const result: any = $(searchId).val();
    if (
      result.toString().toLowerCase() === "bitcoin" ||
      result.toString().toLowerCase() === "ethereum" ||
      result.toString().toLowerCase() === "ripple" ||
      result.toString().toLowerCase() === "litecoin" ||
      result.toString().toLowerCase() === "neo"
    ) {
      dispatch(setSearch(result.toString()));
      $("#search").addClass("active_window");
      $("#input_search").val("");
      $("#no_results").removeClass("active_window");
      $(".menu_item").removeClass("is_active");
      $(".search_icon").addClass("search_icon_active");
      $("#search-bar").blur();
    } else {
      $("#search").addClass("active_window");
      $("#input_search").val("");
      $(".search_icon").addClass("search_icon_active");
      $(".no_results_found").addClass("active_window");
      $(".menu_item").removeClass("is_active");
      $("#search-bar").blur();
    }
  };

  const searchField = $(".search_header");
  const searchInput = $("#search_input");

  const checkSearch = () => {
    const contents: any = searchInput.val()!;
    if (contents.length !== 0) {
      searchField.addClass("full");
    } else {
      searchField.removeClass("full");
    }
  };

  $("#search_btn")
    .focus(() => {
      searchField.addClass("isActive");
    })
    .blur(() => {
      searchField.removeClass("isActive");
      checkSearch();
    });

  useEffect(() => {
    if (
      document.getElementById("search_header") !== null &&
      document.getElementById("header_logout") !== null
    ) {
      if (menuActive) {
        document
          .getElementById("search_header")!
          .classList.add("disable_event");
        document
          .getElementById("header_logout")!
          .classList.add("disable_event");
      } else {
        document
          .getElementById("search_header")!
          .classList.remove("disable_event");
        document
          .getElementById("header_logout")!
          .classList.remove("disable_event");
      }
    }
  }, [menuActive]);

  return (
    <div className="header">
      <div
        tabIndex={0}
        role="button"
        onKeyDown={handleClick}
        onClick={handleClick}
        className="menu_icon"
      >
        <button
          id="toggleMenu"
          className="hamburger hamburger--squeeze"
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
      <div className="header_content">
        <div onMouseEnter={animeLogo} id="header_logo" className="header_logo">
          <div className="header_logo_container">
            <div id="logo_stick1" className="stick1" />
            <div id="logo_stick2" className="stick2" />
            <div id="logo_stick3" className="stick3" />
          </div>
          <p>Coinlabs</p>
        </div>
        <div className="header_input">
          <input
            spellCheck="false"
            id="input_search"
            type="text"
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                search("#input_search");
              }
            }}
            onChange={(e: any) => {
              if (e.target.value === "") {
                $(".no_results_found").removeClass("active_window");
              }
            }}
            // onChange={(e) => {
            //   if (!e.target.value) {
            //     $("#search").removeClass("active_window");
            //   }
            //   if (
            //     e.target.value.charAt(0) === "b" ||
            //     e.target.value.charAt(0) === "B"
            //   ) {
            //     dispatch(setSearch("Bitcoin"));
            //     $("#search").addClass("active_window");
            //   } else if (
            //     e.target.value.charAt(0) === "E" ||
            //     e.target.value.charAt(0) === "e"
            //   ) {
            //     dispatch(setSearch("Ethereum"));
            //     $("#search").addClass("active_window");
            //   } else if (
            //     e.target.value.charAt(0) === "r" ||
            //     e.target.value.charAt(0) === "R"
            //   ) {
            //     dispatch(setSearch("Ripple"));
            //     $("#search").addClass("active_window");
            //   } else if (
            //     e.target.value.charAt(0) === "L" ||
            //     e.target.value.charAt(0) === "l"
            //   ) {
            //     dispatch(setSearch("Litecoin"));
            //     $("#search").addClass("active_window");
            //   } else if (
            //     e.target.value.charAt(0) === "n" ||
            //     e.target.value.charAt(0) === "N"
            //   ) {
            //     dispatch(setSearch("Neo"));
            //     $("#search").addClass("active_window");
            //   }
            // }}
            autoComplete="off"
            placeholder="Search for crypto here"
          />
          <div className="search_icon">
            <svg
              id="btn_search"
              onClick={() => search("#input_search")}
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="header_right">
        <div id="search_header" className="search_header">
          <label htmlFor="search">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search("#search-bar");
                  $("#search-bar").val("");
                }
              }}
              onClick={() => {
                document.getElementById("btn_search_mobile")!.style.opacity =
                  "0";
              }}
              onBlur={() => {
                setTimeout(() => {
                  document.getElementById("btn_search_mobile")!.style.opacity =
                    "1";
                  $("#search-bar").val("");
                }, 200);
              }}
              type="text"
              id="search-bar"
            />
            <svg
              id="btn_search_mobile"
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
            </svg>
          </label>
        </div>
        <svg
          onClick={() => {
            document.documentElement.style.setProperty(
              "--secondary-bg-color",
              "#221e34"
            );
            document.documentElement.style.setProperty(
              "--third-bg-color",
              "#29253b"
            );

            document.getElementById("toggleMenu")!.click();
            auth.signOut();
          }}
          className="header_logout"
          id="header_logout"
          height="20px"
          fill={logoutColor}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M255.2 468.6H63.8c-11.7 0-21.3-9.5-21.3-21.3V64.6c0-11.7 9.5-21.3 21.3-21.3H255.2c11.8 0 21.3-9.5 21.3-21.3S266.9 0.9 255.2 0.9H63.8C28.6 0.9 0 29.5 0 64.6v382.7c0 35.2 28.6 63.8 63.8 63.8H255.2c11.8 0 21.3-9.5 21.3-21.3C276.4 478.1 266.9 468.6 255.2 468.6z" />
          <path d="M505.7 240.9L376.4 113.3c-8.3-8.2-21.8-8.1-30.1 0.2s-8.2 21.8 0.2 30.1l92.4 91.2H191.4c-11.8 0-21.3 9.5-21.3 21.3 0 11.8 9.5 21.3 21.3 21.3h247.6l-92.4 91.2c-8.4 8.3-8.4 21.7-0.2 30.1 4.2 4.2 9.7 6.3 15.1 6.3 5.4 0 10.8-2 14.9-6.1l129.3-127.6c4-4 6.3-9.4 6.3-15.1C512 250.3 509.7 244.9 505.7 240.9z" />
        </svg>
        <div className="header_notification">
          <div>
            <svg
              className="not"
              onClick={() => setNotificationActive(!notificationActive)}
              id="notification"
              viewBox="0 5.4 32 32"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g data-name="Layer 31" id="Layer_31">
                <path d="M27,27H5a1,1,0,0,1-.89-1.45,18.14,18.14,0,0,0,1.89-8V14a10,10,0,0,1,20,0v3.53a18.14,18.14,0,0,0,1.89,8A1,1,0,0,1,27,27ZM6.55,25h18.9A20.14,20.14,0,0,1,24,17.53V14A8,8,0,0,0,8,14v3.53A20.14,20.14,0,0,1,6.55,25Z" />
                <path d="M16,31a5,5,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,.88,2.12,3.08,3.08,0,0,0,4.24,0,1,1,0,0,1,1.42,1.42A5,5,0,0,1,16,31Z" />
                <path d="M16,6a1,1,0,0,1-1-1V2a1,1,0,0,1,2,0V5A1,1,0,0,1,16,6Z" />
                <path d="M26,5a2,2,0,1,1,2-2A2,2,0,0,1,26,5Zm0-2h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Z" />
              </g>
            </svg>
            {a && <div className="notif" />}
          </div>
          {notificationActive && (
            <Notifications setNotificationActive={setNotificationActive} />
          )}
        </div>
        <img className="header_user_icon" src={profilPic || john} alt="" />

        <div
          role="button"
          tabIndex={0}
          id="header_user_name"
          onKeyDown={() => {
            document
              .getElementById("header_user_logout")!
              .classList.toggle("header_user_logout_active");
          }}
          onClick={() => {
            document
              .getElementById("header_user_logout")!
              .classList.toggle("header_user_logout_active");
          }}
          className="header_user_name log"
        >
          <p
            onFocus={() => {}}
            onMouseOver={() => {
              document.getElementById("header_arrow")!.style.fill =
                "var(--primary-font-color)";
            }}
            onMouseLeave={() => {
              document.getElementById("header_arrow")!.style.fill =
                "var(--secondary-font-color)";
            }}
            className="username log"
          >
            {username}
          </p>
          <svg
            id="header_arrow"
            className="header_arrow log"
            xmlns="http://www.w3.org/2000/svg"
            width="452"
            height="452"
            viewBox="0 0 451.8 451.8"
          >
            <path d="M225.9 354.7c-8.1 0-16.2-3.1-22.4-9.3L9.3 151.2c-12.4-12.4-12.4-32.4 0-44.8 12.4-12.4 32.4-12.4 44.7 0l171.9 171.9 171.9-171.9c12.4-12.4 32.4-12.4 44.7 0 12.4 12.4 12.4 32.4 0 44.8L248.3 345.4C242.1 351.6 234 354.7 225.9 354.7z" />
          </svg>
          <div id="header_user_logout" className="header_user_logout log">
            <span
              id="btn-logout"
              tabIndex={0}
              className="log"
              role="button"
              onKeyDown={() => auth.signOut()}
              onClick={() => auth.signOut()}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
