import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Notification } from "../types/notification.type";
import {
  Clock,
  Music,
  TrendingUp,
  Book,
  Bell,
  AlertTriangle,
} from "lucide-react-native";

type Props = {
  notification: Notification;
  onPress?: () => void;
};

const isMissedGoldenTime = (type: string) =>
  type?.toLowerCase() === "missed_golden_time";

const getIconComponent = (iconName: string, type: string) => {
  if (isMissedGoldenTime(type)) {
    return <AlertTriangle size={20} color="#EF4444" />;
  }

  const iconProps = { size: 20, color: "#1C2B6D" };
  switch (iconName) {
    case "time-outline":
      return <Clock {...iconProps} />;
    case "musical-notes-outline":
      return <Music {...iconProps} />;
    case "stats-chart-outline":
      return <TrendingUp {...iconProps} />;
    case "book-outline":
      return <Book {...iconProps} />;
    default:
      return <Bell {...iconProps} />;
  }
};

export default function NotificationItem({ notification, onPress }: Props) {
  const isUnread = !notification.read;
  const isMissed = isMissedGoldenTime(notification.type);

  const handlePress = () => {
    if (onPress && isUnread) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`mb-3 rounded-2xl overflow-hidden ${
        isMissed
          ? "bg-red-50 border border-red-200"
          : isUnread
            ? "bg-[#9EC800]/10 border border-[#9EC800]/30"
            : "bg-gray-100 border border-gray-200"
      }`}
      style={styles.cardShadow}
    >
      <View className="flex-row p-4">
        <View
          className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
            isMissed
              ? "bg-red-100"
              : isUnread
                ? "bg-[#9EC800]/20"
                : "bg-gray-50"
          }`}
        >
          {getIconComponent(notification.icon, notification.type)}
        </View>

        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <Text
              className={`font-bold text-base flex-1 mr-2 ${
                isUnread ? "text-[#1C2B6D]" : "text-gray-700"
              }`}
            >
              {notification.title}
            </Text>

            <Text className="text-xs text-gray-500 font-medium pt-1">
              {notification.time}
            </Text>
          </View>

          <Text className="text-gray-600 text-sm leading-5">
            {notification.description}
          </Text>

          <View className="flex-row items-center justify-between mt-2">
            <Text
              className={`text-xs font-semibold ${
                isMissed ? "text-red-400" : "text-[#FFB500]"
              }`}
            >
              {notification.type
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </Text>

            {isUnread && (
              <View className="flex-row items-center">
                <View
                  className={`w-2 h-2 rounded-full mr-2 ${
                    isMissed ? "bg-red-400" : "bg-[#9EC800]"
                  }`}
                />
                <Text
                  className={`text-xs font-semibold ${
                    isMissed ? "text-red-400" : "text-[#9EC800]"
                  }`}
                >
                  New
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#1C2B6D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
