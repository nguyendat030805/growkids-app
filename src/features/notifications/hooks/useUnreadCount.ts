import { useState, useEffect, useCallback } from "react";
import * as Notifications from "expo-notifications";
import { NotificationService } from "../services/NotificationService";

export const useUnreadCount = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUnreadCount = useCallback(async () => {
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
    } finally {
      setLoading(false);
    }
  }, []);

  const decrementCount = useCallback(async () => {
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

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  return {
    unreadCount,
    loading,
    fetchUnreadCount,
    decrementCount,
    resetCount,
  };
};
