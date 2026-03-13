import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Bell, BellOff, ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import NotificationItem from "../components/NotificationItem";
import { useNotifications } from "../hooks/useNotifications";
import {
  transformNotificationData,
  groupNotificationsBySection,
} from "../utils/notificationUtils";
import { Header } from "@/src/core/pages/Header";
import { useNotificationContext } from "../context/NotificationContext";

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const { setOnNotificationReceived } = useNotificationContext();
  const {
    notifications: apiNotifications,
    loading,
    refreshing,
    error,
    unreadCount,
    markAsRead,
    handleClearAll,
    refetch,
  } = useNotifications();

  useEffect(() => {
    setOnNotificationReceived(() => {
      console.log("NotificationsScreen: Refreshing due to new notification");
      refetch();
    });

    return () => {
      setOnNotificationReceived(() => {});
    };
  }, [setOnNotificationReceived, refetch]);

  const notifications = apiNotifications.map(transformNotificationData);
  const { today, yesterday, earlier } =
    groupNotificationsBySection(notifications);

  if (loading && !refreshing) {
    return (
      <View className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1C2B6D" />
          <Text className="text-gray-500 mt-4">Loading notifications...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-4">
          <Bell size={48} color="#EF4444" />
          <Text className="text-red-500 text-base mt-4 text-center">
            {error}
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            className="bg-[#1C2B6D] px-6 py-3 rounded-full mt-4"
          >
            <Text className="text-white font-semibold">Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white pt-12">
      <Header></Header>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refetch}
            colors={["#1C2B6D"]}
            tintColor="#1C2B6D"
          />
        }
      >
        <View className="px-4 pt-4">
          {notifications.length > 0 && (
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="flex-row items-center bg-gray-100 px-3 py-2 rounded-full"
                activeOpacity={0.7}
              >
                <ArrowLeft size={16} color="#1C2B6D" />
                <Text className="text-[#1C2B6D] font-semibold text-sm ml-2">
                  Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleClearAll}
                className="flex-row items-center bg-[#FFB500]/10 px-4 py-2 rounded-full"
                activeOpacity={0.7}
              >
                <BellOff size={16} color="#FFB500" />
                <Text className="text-[#FFB500] font-semibold text-sm ml-2">
                  Clear All
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {today.length > 0 && (
            <>
              <Text className="text-[#1C2B6D] font-bold text-sm mb-3 uppercase tracking-wide">
                Today
              </Text>
              {today.map((item) => (
                <NotificationItem
                  key={item.id}
                  notification={item}
                  onPress={() => markAsRead(item.notification_id)}
                />
              ))}
            </>
          )}

          {yesterday.length > 0 && (
            <>
              <Text className="text-[#1C2B6D] font-bold text-sm mb-3 mt-6 uppercase tracking-wide">
                Yesterday
              </Text>
              {yesterday.map((item) => (
                <NotificationItem
                  key={item.id}
                  notification={item}
                  onPress={() => markAsRead(item.notification_id)}
                />
              ))}
            </>
          )}

          {earlier.length > 0 && (
            <>
              <Text className="text-[#1C2B6D] font-bold text-sm mb-3 mt-6 uppercase tracking-wide">
                Earlier
              </Text>
              {earlier.map((item) => (
                <NotificationItem
                  key={item.id}
                  notification={item}
                  onPress={() => markAsRead(item.notification_id)}
                />
              ))}
            </>
          )}

          {notifications.length === 0 && (
            <View className="items-center py-12">
              <Bell size={48} color="#9CA3AF" />
              <Text className="text-gray-400 text-base mt-4">
                No notifications yet
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                We&apos;ll notify you when something new happens
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
