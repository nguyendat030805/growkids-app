import { NotificationResponse, Notification } from "../types/notification.type";

export const getNotificationIcon = (type: string): string => {
  switch (type.toLowerCase()) {
    case "golden time":
      return "time-outline";
    case "song":
    case "music":
      return "musical-notes-outline";
    case "progress":
    case "stats":
      return "stats-chart-outline";
    case "story":
      return "book-outline";
    default:
      return "notifications-outline";
  }
};

export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const getNotificationSection = (
  dateString: string,
): "today" | "yesterday" | "earlier" => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays === 0) {
    return "today";
  } else if (diffInDays === 1) {
    return "yesterday";
  } else {
    return "earlier";
  }
};

export const transformNotificationData = (
  apiData: NotificationResponse,
): Notification => {
  return {
    ...apiData,
    id: apiData.notification_id,
    description: apiData.body,
    time: formatTimeAgo(apiData.sent_at),
    icon: getNotificationIcon(apiData.type),
    read: apiData.is_read,
    section: getNotificationSection(apiData.sent_at),
  };
};

export const groupNotificationsBySection = (notifications: Notification[]) => {
  const today = notifications.filter((n) => n.section === "today");
  const yesterday = notifications.filter((n) => n.section === "yesterday");
  const earlier = notifications.filter((n) => n.section === "earlier");

  return { today, yesterday, earlier };
};
