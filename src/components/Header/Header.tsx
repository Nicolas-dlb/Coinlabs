import { useState } from 'react'
import './Header.scss';
import { auth } from 'firebaseConfig';
import { useSelector } from 'react-redux';
import { selectProfilPic, selectUserName } from 'redux/reducers/userSlice';

function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const username = useSelector(selectUserName);
  const profilPic = useSelector(selectProfilPic);
    /*<div id="menu_stick1" className="stick1"></div>
                <div id="menu_stick2" className="stick2"></div>
                <div id="menu_stick3" className="stick1"></div> */

     
        const logoutColor = menuActive ? "#787878" : "#FFF";
    return (
        <div className="header">
            <div onClick={() => {
                document.getElementById('toggleMenu')!.classList.toggle("is-active");
                document.getElementById("menu")!.classList.toggle('toggle_menu');
                document.getElementById('container')!.classList.toggle("container_active");
                
                document.getElementById('shadow')!.classList.toggle("shadow_active");
                document.getElementById('shadow')!.classList.toggle("opacity");
                setMenuActive(!menuActive);
               const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-bg-color');
               if (bgColor !== "#221e34") {
document.documentElement.style.setProperty(
        "--secondary-bg-color",
        "#221e34"
      );       
      document.documentElement.style.setProperty(
        "--third-bg-color",
        "#29253b"
      );           
               } else {
                   document.documentElement.style.setProperty(
        "--secondary-bg-color",
        "#171429"
      );       
      document.documentElement.style.setProperty(
        "--third-bg-color",
        "#221e34"
      );           
               }
               
            }} className="menu_icon">
                <button id="toggleMenu" className="hamburger hamburger--squeeze" type="button">
  <span className="hamburger-box">
    <span className="hamburger-inner"></span>
  </span>
</button>
                
            </div>
            <div className="header_content">
              <div className="header_logo">
                <div className="header_logo_container">
                    <div id="logo_stick1" className="stick1"></div>
                    <div id="logo_stick2" className="stick2"></div>
                    <div id="logo_stick3" className="stick3"></div>
                </div>
                <p>Coinlabs</p>
            </div>
            
            </div>
            <div className="header_right">
               
                
                 <svg onClick={() => { 
                   document.getElementById('toggleMenu')!.click();
                   auth.signOut()
                 }} className="header_logout" height="20px" fill={logoutColor} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M255.2 468.6H63.8c-11.7 0-21.3-9.5-21.3-21.3V64.6c0-11.7 9.5-21.3 21.3-21.3H255.2c11.8 0 21.3-9.5 21.3-21.3S266.9 0.9 255.2 0.9H63.8C28.6 0.9 0 29.5 0 64.6v382.7c0 35.2 28.6 63.8 63.8 63.8H255.2c11.8 0 21.3-9.5 21.3-21.3C276.4 478.1 266.9 468.6 255.2 468.6z"/><path d="M505.7 240.9L376.4 113.3c-8.3-8.2-21.8-8.1-30.1 0.2s-8.2 21.8 0.2 30.1l92.4 91.2H191.4c-11.8 0-21.3 9.5-21.3 21.3 0 11.8 9.5 21.3 21.3 21.3h247.6l-92.4 91.2c-8.4 8.3-8.4 21.7-0.2 30.1 4.2 4.2 9.7 6.3 15.1 6.3 5.4 0 10.8-2 14.9-6.1l129.3-127.6c4-4 6.3-9.4 6.3-15.1C512 250.3 509.7 244.9 505.7 240.9z"/></svg>
        
         
                 
                  <img className="header_user_icon"  src={
                    profilPic ||
                    "https://www.vhv.rs/dpng/d/164-1645859_selfie-clipart-groucho-glass-good-profile-hd-png.png"
                  } alt="" />
                
                <div onClick={() => {
                  document.getElementById('header_user_logout')!.classList.toggle('header_user_active')
                }} className="header_user_name">
                   <p className="username">{username}</p>
                   <svg className="header_arrow" xmlns="http://www.w3.org/2000/svg" width="452" height="452" viewBox="0 0 451.8 451.8"><path d="M225.9 354.7c-8.1 0-16.2-3.1-22.4-9.3L9.3 151.2c-12.4-12.4-12.4-32.4 0-44.8 12.4-12.4 32.4-12.4 44.7 0l171.9 171.9 171.9-171.9c12.4-12.4 32.4-12.4 44.7 0 12.4 12.4 12.4 32.4 0 44.8L248.3 345.4C242.1 351.6 234 354.7 225.9 354.7z"/></svg>
                <div id="header_user_logout" className="header_user_logout">
                  <p onClick={() => auth.signOut()}>Logout</p>
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default Header
