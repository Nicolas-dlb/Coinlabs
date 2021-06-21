import './Menu.scss';
import market from 'assets/pictures/Market.png';
import { useState } from 'react';
import john from 'assets/pictures/John.svg';
import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserName } from 'redux/reducers/userSlice';
import { Link } from "react-router-dom";
function Menu() {
    const [active, setActive] = useState("dashboard");
    const username = useSelector(selectUserName);
    const email = useSelector(selectUserEmail);
    
    return (
        <div id="menu" className="menu">
            <div className="user">
                
                     <img className="user_icon" src="https://scontent-cdt1-1.xx.fbcdn.net/v/t1.6435-9/119068627_10214566640554345_3311555602242066403_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=TD0JJun6_n0AX-RSVVr&_nc_ht=scontent-cdt1-1.xx&oh=6b73a5f5d399a29725277e3263783179&oe=60CC92DE" alt="" />
                
                <div className="user_name">
                    <p>{username}</p>
                </div>
                <div className="user_email">
                    <p>{email}</p>
                </div>
            </div>
           <nav>
               <Link to="/Dashboard">
               <div onClick={() => setActive("dashboard")} className={ active === "dashboard" ? "menu_item is_active" : "menu_item"}>
                   <div className="menu_item_icon">
                      <div className="dashboard_icon">
                        <div className="dashboard_icon_top">
                               <span className="square"></span>
                       <span className="square" style={{opacity: 0.6}}></span>
                        </div>
                      <div className="dashboard_icon_bottom">
                           <span className="square"></span>
                       <span className="square"></span>
                      </div>
                      </div>
                   </div>
                   <p>Dashboard</p>
               </div>
               </Link>
               
               <Link to="/Market" >
<div onClick={() => setActive("market")} className={ active === "market" ? "menu_item is_active" : "menu_item"}>
                   <div className="menu_item_icon">
                     <span className="fix_market_icon"></span>
                      <img className="market_icon" src={market} alt="" />
                   </div>
                   <p>Market</p>
               </div>
               </Link>
                
               <div onClick={() => setActive("portfolio")} className={ active === "portfolio" ? "menu_item is_active" : "menu_item"}>
                   <div className="menu_item_icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 511.4 511.4"><g xmlns="http://www.w3.org/2000/svg"><path d="m0.7 252v-160.3c0-34.5 28-62.4 62.4-62.4h385c34.5 0 62.4 28 62.4 62.4v259.3c0 34.5-28 62.4-62.4 62.4h-122.5c-21 0-40.7-10.6-52.2-28.2l-28-42.6c-11.5-17.6-31.2-28.2-52.2-28.2h-130.1c-34.5-62.4-28-62.4-62.4z" data-original="#df8621" fill="#e4e4e4"/><path d="m415.2 0h-214.3c-26.5 0-48 21.5-48 48v284.4c0 26.5 21.5 48 48 48h214.3c26.5 0 48-21.5 48-48v-284.4c0-26.5-21.5-48-48-48z" data-original="#dddaec" fill="#8f8d97"/><path d="m338.6 73.2h-214.3c-26.5 0-48 21.5-48 48v284.4c0 26.5 21.5 48 48 48h214.3c26.5 0 48-21.5 48-48v-284.4c0-26.5-21.5-48-48-48z" data-original="#f1f4f6" fill="#f1f4f6"/><path d="m510.6 288.6v160.3c0 34.5-28 62.4-62.4 62.4h-385c-34.5 0-62.4-28-62.4-62.4v-259.3c0-34.5 28-62.4 62.4-62.4h122.5c21 0 40.7 10.6 52.2 28.2l28 42.6c11.5 17.6 31.2 28.2 52.2 28.2h130.1c34.5 0 62.4 28 62.4 62.4z" data-original="#e7a52e" className="a"/><path d="m114 511.3h-50.8c-34.5 0-62.4-28-62.4-62.4v-259.2c0-34.5 28-62.4 62.4-62.4h50.8c-34.5 0-62.4 28-62.4 62.4v259.2c0 34.5 28 62.4 62.4 62.4z" data-original="#e49824" className="a"/><path d="m316.8 198.4c-2.3 0-4.5-1.1-6-2.9l-26.9-33.4c-2.7-3.3-2.1-8.2 1.2-10.8s8.2-2.1 10.8 1.2l19.5 24.3 28.3-53.2c2-3.8 6.7-5.2 10.4-3.2 3.8 2 5.2 6.7 3.2 10.4l-33.8 63.5c-1.3 2.5-4 4.1-6.8 4.1z" data-original="#b3e59f" fill="#f2f2f2"/><g fill="#ffe07d"><path d="m191.9 281.6h-131.6c-4.3 0-7.7-3.5-7.7-7.7s3.5-7.7 7.7-7.7h131.6c4.3 0 7.7 3.5 7.7 7.7 0 4.3-3.5 7.7-7.7 7.7z" data-original="#ffe07d" className="b"/><path d="m191.9 310.1h-131.6c-4.3 0-7.7-3.5-7.7-7.7s3.5-7.7 7.7-7.7h131.6c4.3 0 7.7 3.5 7.7 7.7 0 4.3-3.5 7.7-7.7 7.7z" data-original="#ffe07d" className="b"/></g></g></svg>
                   </div>
                   <p>Portfolio</p>
               </div>
                <div onClick={() => setActive("history")} className={ active === "history" ? "menu_item is_active" : "menu_item"}>
                   <div onClick={() => setActive("history")} className="menu_item_icon">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="24" r="18.5" style={{fill: "white",strokeWidth: "0", stroke: "#000"}}/><polyline points="22.5 13.5 22.5 24.5 27.5 29.5" style={{fill: "none",strokeLinejoin:"round",strokeWidth:"3",stroke:"#000"}}/></svg>
                   </div>
                   <p>History</p>
               </div>
               <div onClick={() => setActive("settings")} className={ active === "settings" ? "menu_item is_active" : "menu_item"}>
                   <div onClick={() => setActive("settings")} className="menu_item_icon">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M496.6 312.1l-47.1-36.8c1.5-12.8 1.5-25.8 0-38.7l47.1-36.8c8.8-7.1 11.2-19.6 5.6-29.4l-49-84.6c-5.6-9.9-17.6-14.2-28.3-10.2l-55.5 22.3c-10.4-7.6-21.6-14-33.3-19.3l-8.5-58.9c-1.5-11.3-11.2-19.7-22.7-19.6h-98.1c-11.3-0.1-20.9 8.2-22.5 19.5l-8.5 59.1c-11.7 5.4-22.8 11.8-33.3 19.4L86.9 75.6c-10.5-4.2-22.5 0.1-28.1 10L9.8 170.3c-5.8 9.9-3.4 22.5 5.6 29.5l47.1 36.8c-1.5 12.8-1.5 25.8 0 38.7l-47.1 36.8c-8.8 7.1-11.2 19.6-5.6 29.4l48.9 84.7c5.6 9.9 17.6 14.2 28.3 10.2l55.5-22.3c10.4 7.6 21.6 14.1 33.3 19.4l8.5 58.9c1.5 11.3 11.1 19.7 22.5 19.6h98.1c11.3 0.1 21-8.2 22.6-19.5l8.5-59.1c11.7-5.4 22.8-11.8 33.3-19.4l55.7 22.4c10.6 4.1 22.5-0.1 28.1-10l49.2-85.1C507.9 331.5 505.4 319.1 496.6 312.1zM256 362.7c-58.9 0-106.7-47.8-106.7-106.7s47.8-106.7 106.7-106.7 106.7 47.8 106.7 106.7C362.6 314.9 314.8 362.6 256 362.7z" fill="#fff"/></svg>
                   </div>
                   <p>Settings</p>
               </div>
           </nav>
           <div className="john">
               <img src={john} alt="" />
               <p>Newest version soon available!</p>
               <p>More info version 1.2</p>
               <span>Update</span>
           </div>
        </div>
    )
}

 

export default Menu
