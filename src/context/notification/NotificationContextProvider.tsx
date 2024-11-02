import { useState, useEffect, PropsWithChildren } from "react";
import Icon from "../../components/common/Icon/Icon";
import {
  faCheck,
  faExclamation,
  faExclamationTriangle,
  faInfo,
  faXmarkCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import NotificationContext from "./NotificationContext";



type NotificationType = "success" | "error" | "warning" | "info" | "alert";

const notificationIcons: Record<NotificationType, IconDefinition> = {
  success: faCheck,
  alert: faInfo,
  error: faXmarkCircle,
  info: faExclamation,
  warning: faExclamationTriangle,
};

const notificationDisplayDuration = 3333;

export const NotificationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("alert");

  const openNotification = (type: NotificationType, message: string) => {
    setType(type);
    setMessage(message);
  };

  useEffect(() => {
    if (message) {
      const notificationTimeout = setTimeout(() => {
        setMessage("");
        setType("alert");
      }, notificationDisplayDuration);

      return () => {
        clearTimeout(notificationTimeout);
      };
    }
  }, [message]);

  console.log(type);
  

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {message && (
        <div
          role="alert"
          className={`alert alert-${type} fixed right-4 top-4 z-10 max-w-80`}
        >
          <Icon icon={notificationIcons[type]} />
          <span>{message}</span>
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
};
