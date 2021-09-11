/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import {
  loadNotifications,
  selectNotifications,
  setNotifications as setNotif,
} from "redux/reducers/appSlice";
import "./Notifications.scss";
import $ from "jquery";
import { db, auth } from "firebaseConfig";
import Notif from "interfaces/Notif/Notif";

type NotificationsProps = {
  setNotificationActive: (arg0: boolean) => void;
};
function Notifications({ setNotificationActive }: NotificationsProps) {
  const [notifications, setNotifications]: any = useState([
    {
      name: "Bienvenue",
      content: "",
      time: 39393922,
      read: false,
    },
  ]);
  const dispatch = useDispatch();
  const notif = useSelector(selectNotifications);
  const [render, setRender] = useState(0);
  useEffect(() => {
    setNotifications(notif);
  }, [notif]);

  function timeSince(date: any) {
    const d: any = new Date();
    const seconds = Math.floor((d - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return `${Math.floor(interval)} years`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} months`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} days`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} hour`;
    }
    if (interval > 2) {
      return `${Math.floor(interval)} hours`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} min`;
    }
    return `${Math.floor(seconds)} seconds`;
  }
  const date = (d: any) => {
    const a = new Date(d);
    return timeSince(a);
    // return `${a.getHours()}:${a.getMinutes()}`;
  };

  return (
    <div id="notifications" className="notifications not">
      <div className="notifications_title not">
        <h3 className="not">Notifications</h3>
      </div>
      {notifications?.length >= 1 ? (
        notifications.map((notification: any) => (
          <div
            key={notification.time}
            tabIndex={0}
            role="button"
            onKeyDown={() => {}}
            onClick={() => {
              if (notification.read === false) {
                dispatch(
                  loadNotifications(
                    notifications.map((no: any) =>
                      no.name === notification.name ? { ...no, read: true } : no
                    )
                  )
                );

                db.collection("users")
                  .doc(auth.currentUser?.uid)
                  .set(
                    {
                      notifications: notifications.map((no: any) =>
                        no.time === notification.time
                          ? { ...no, read: true }
                          : no
                      ),
                    },
                    { merge: true }
                  );
              }
              document.getElementById("notification_panel")!.style.opacity =
                "1";
              document.getElementById("notification_title")!.innerHTML =
                notification.name;
              document.getElementById("notification_content")!.innerHTML =
                notification.content;
              document.getElementById(
                "notification_panel"
              )!.style.pointerEvents = "all";
              setNotificationActive(false);
            }}
            className="notification not"
          >
            <div className="notification_title not">
              <h5 className="not">{notification?.name}</h5>
              {notification.read === false && <div className="not_read not" />}
              <p className="not">{date(notification?.time)}</p>
            </div>
            {notification?.content.split("").length > 30 ? (
              <p className="not">
                {notification?.content.replace("<br></br>", "").slice(0, 20)}{" "}
                ...
              </p>
            ) : (
              <p className="not">{notification?.content}</p>
            )}
          </div>
        ))
      ) : (
        <div className="no_notifications not">
          <p className="not">No notifications</p>
        </div>
      )}
    </div>
  );
}

export default Notifications;
