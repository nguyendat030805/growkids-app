import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Notification } from "../types/notification.type";
import { Clock, Music, TrendingUp, Book, Bell } from "lucide-react-native";

type Props = {
  notification: Notification;
  onPress?: () => void;
};

const getIconComponent = (iconName: string) => {
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
        isUnread
          ? "bg-[#9EC800]/10 border border-[#9EC800]/30"
          : "bg-white border border-gray-100"
      }`}
      style={styles.cardShadow}
    >
      <View className="flex-row p-4">
        <View
          className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
            isUnread ? "bg-[#9EC800]/20" : "bg-gray-50"
          }`}
        >
          {getIconComponent(notification.icon)}
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

            <Text className="text-xs text-gray-400 font-medium">
              {notification.time}
            </Text>
          </View>

          <Text className="text-gray-600 text-sm leading-5">
            {notification.description}
          </Text>

          <View className="flex-row items-center justify-between mt-2">
            <Text className="text-xs text-[#FFB500] font-semibold">
              {notification.type}
            </Text>

            {isUnread && (
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-[#9EC800] mr-2" />
                <Text className="text-[#9EC800] text-xs font-semibold">
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
