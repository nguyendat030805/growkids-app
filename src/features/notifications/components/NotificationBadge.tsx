import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Bell } from "lucide-react-native";
import { useNotificationContext } from "../context/NotificationContext";

interface NotificationBadgeProps {
  onPress?: () => void;
  size?: number;
  color?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  onPress,
  size = 24,
  color = "#1C2B6D",
}) => {
  const { unreadCount } = useNotificationContext();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="relative"
    >
      <Bell size={size} color={color} />

      {unreadCount > 0 && (
        <View className="absolute -top-1 -right-1 bg-[#FF4444] rounded-full min-w-[18px] h-[18px] items-center justify-center">
          <Text className="text-white text-xs font-bold">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
