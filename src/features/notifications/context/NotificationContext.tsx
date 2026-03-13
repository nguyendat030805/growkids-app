import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { NotificationService } from "../services/NotificationService";
import { STORAGE_KEYS } from "../../../core/constants";

interface NotificationContextType {
  unreadCount: number;
  loading: boolean;
  isAuthenticated: boolean;
  fetchUnreadCount: () => Promise<void>;
  decrementCount: () => void;
  resetCount: () => void;
  setOnNotificationReceived: (callback: (() => void) | undefined) => void;
  initializeAfterLogin: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const onNotificationReceivedRef = useRef<(() => void) | undefined>(undefined);
  const checkAuthStatus = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const authenticated = !!token;
      setIsAuthenticated(authenticated);
      return authenticated;
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  const fetchUnreadCount = useCallback(async () => {
    const authenticated = await checkAuthStatus();
    if (!authenticated) {
      console.log("User not authenticated, skipping unread count fetch");
      return;
    }

    try {
      setLoading(true);
      const response = await NotificationService.getUnreadCount();

      if (response.success) {
        const count =
          typeof response.data === "number"
            ? response.data
            : response.data &&
                typeof response.data === "object" &&
                "count" in response.data
              ? (response.data as { count: number }).count
              : 0;

        setUnreadCount(count);
        await Notifications.setBadgeCountAsync(count);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
      setUnreadCount(0);
      await Notifications.setBadgeCountAsync(0);
    } finally {
      setLoading(false);
    }
  }, [checkAuthStatus]);

  const decrementCount = useCallback(() => {
    setUnreadCount((prev) => {
      const newCount = Math.max(0, prev - 1);
      Notifications.setBadgeCountAsync(newCount);
      return newCount;
    });
  }, []);

  const resetCount = useCallback(async () => {
    setUnreadCount(0);
    await Notifications.setBadgeCountAsync(0);
  }, []);

  const setOnNotificationReceived = useCallback(
    (callback: (() => void) | undefined) => {
      onNotificationReceivedRef.current = callback;
    },
    [],
  );

  const initializeAfterLogin = useCallback(async () => {
    setIsAuthenticated(true);
    await fetchUnreadCount();
  }, [fetchUnreadCount]);

  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      async (notification) => {
        console.log("Global: Received notification:", notification);

        const authenticated = await checkAuthStatus();
        if (!authenticated) {
          console.log("User not authenticated, skipping notification handling");
          return;
        }

        setUnreadCount((prev) => {
          const newCount = prev + 1;
          Notifications.setBadgeCountAsync(newCount);
          return newCount;
        });

        if (onNotificationReceivedRef.current) {
          onNotificationReceivedRef.current();
        }
      },
    );

    return () => {
      notificationListener.remove();
    };
  }, [checkAuthStatus]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        loading,
        isAuthenticated,
        fetchUnreadCount,
        decrementCount,
        resetCount,
        setOnNotificationReceived,
        initializeAfterLogin,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
};
