import apiClient from "@/src/core/services/apiClient";

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface NotificationResponse {
  notification_id: string;
  user_id: string;
  title: string;
  body: string;
  type: string;
  data: any;
  is_read: boolean;
  sent_at: string;
  read_at: string | null;
}

export interface NotificationsApiResponse extends ApiResponse {
  data: NotificationResponse[];
}

export interface UnreadCountResponse extends ApiResponse {
  data: number;
}

export const NotificationService = {
  getNotifications: async (): Promise<NotificationsApiResponse> => {
    const res = await apiClient.get("/notifications");
    return res.data;
  },

  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const res = await apiClient.get("/notifications/unread-count");
    return res.data;
  },

  markAsRead: async (notificationId: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.patch(
        `/notifications/${notificationId}/read`,
      );
      return response.data;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  },

  clearAllNotifications: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.delete("/notifications/cleanup");
      return response.data;
    } catch (error) {
      console.error("Error clearing notifications:", error);
      throw error;
    }
  },
  async updateExpoPushToken(token: string) {
    return apiClient.post("/notifications/fcm-token", {
      fcmToken: token,
    });
  },

  async registerPushToken() {
    try {
      const NavigationService = (
        await import("../../../core/services/NotificationService")
      ).default;
      const token = await NavigationService.registerForPushNotificationsAsync();
      if (token) {
        await this.updateExpoPushToken(token);
        console.log("Push token registered successfully");
        return token;
      }
    } catch (error) {
      console.error("Failed to register push token:", error);
      throw error;
    }
  },
};
