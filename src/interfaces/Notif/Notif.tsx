import React, { useEffect } from "react";
import "./Notif.scss";
import $ from "jquery";

interface NotifProps {
  Title?: string;
  content?: string;
}
function Notif({ Title = "Title", content = "content" }: NotifProps) {
  useEffect(() => {
    $(".notification_panel").click(() => {
      console.log("oijon");
      document.getElementById("notification_panel")!.style.opacity = "0";
      document.getElementById("notification_panel")!.style.pointerEvents =
        "none";
    });
  }, []);
  // $(".notification").click((e) => {
  //   console.log(e.target);
  // });

  return (
    <div id="notification_panel" className="notification_panel">
      <div className="notification_container">
        <div className="notification_header">
          <h3 id="notification_title">{Title}</h3>
        </div>
        <p id="notification_content">{content}</p>
      </div>
    </div>
  );
}

export default Notif;
