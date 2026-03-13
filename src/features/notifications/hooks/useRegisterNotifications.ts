import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import * as Notifications from "expo-notifications";
import { useNotificationContext } from "../context/NotificationContext";

export const useRegisterNotifications = () => {
  const { fetchUnreadCount } = useNotificationContext();
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const appStateListener = useRef<any>(null);

  useEffect(() => {
    const setupListeners = async () => {
      try {
        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            console.log("Received notification in foreground:", notification);
            setTimeout(() => {
              fetchUnreadCount();
            }, 500);
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("Notification response:", response);
            const data = response.notification.request.content.data;

            fetchUnreadCount();

            if (data?.screen) {
              import("../../../core/navigation/NavigationService")
                .then(({ NavigationService }) => {
                  NavigationService.handleNotificationNavigation(data);
                })
                .catch((error) => {
                  console.error("Error importing NavigationService:", error);
                });
            }
          });

        appStateListener.current = AppState.addEventListener(
          "change",
          (nextAppState) => {
            if (nextAppState === "active") {
              fetchUnreadCount();
            }
          },
        );
      } catch (error) {
        console.error("Error setting up notification listeners:", error);
      }
    };

    setupListeners();

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
      if (appStateListener.current) {
        appStateListener.current.remove();
      }
    };
  }, [fetchUnreadCount]);

  return {
    fetchUnreadCount,
  };
};
