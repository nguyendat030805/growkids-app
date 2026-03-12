import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { NotificationResponse } from "../services/NotificationService";
import { NotificationService } from "../services/NotificationService";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await NotificationService.getNotifications();

      if (response.success) {
        setNotifications(response.data);
      } else {
        setError(response.message || "Failed to fetch notifications");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const response = await NotificationService.markAsRead(notificationId);

      if (response.success) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.notification_id === notificationId
              ? {
                  ...notification,
                  is_read: true,
                  read_at: new Date().toISOString(),
                }
              : notification,
          ),
        );
      } else {
        Alert.alert(
          "Error",
          response.message || "Failed to mark notification as read",
        );
      }
    } catch (err) {
      Alert.alert("Error", "Network error. Please try again.");
      console.error("Error marking notification as read:", err);
    }
  }, []);

  const clearAllNotifications = useCallback(async () => {
    try {
      const response = await NotificationService.clearAllNotifications();

      if (response.success) {
        setNotifications([]);
        Alert.alert("Success", "All notifications cleared");
      } else {
        Alert.alert(
          "Error",
          response.message || "Failed to clear notifications",
        );
      }
    } catch (err) {
      Alert.alert("Error", "Network error. Please try again.");
      console.error("Error clearing notifications:", err);
    }
  }, []);

  const handleClearAll = useCallback(() => {
    if (notifications.length === 0) return;

    Alert.alert(
      "Clear All Notifications",
      "Are you sure you want to clear all notifications? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: clearAllNotifications,
        },
      ],
    );
  }, [notifications.length, clearAllNotifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return {
    notifications,
    loading,
    refreshing,
    error,
    unreadCount,
    fetchNotifications,
    markAsRead,
    handleClearAll,
    refetch: () => fetchNotifications(true),
  };
};
