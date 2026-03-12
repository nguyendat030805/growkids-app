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

export type Notification = NotificationResponse & {
  id: string;
  description: string;
  time: string;
  icon: string;
  read: boolean;
  section: "today" | "yesterday" | "earlier";
};
