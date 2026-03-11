import { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import CircularProgress from "../components/CircularProgress";
import TimeSlotCard from "../components/TimeSlotCard";
import { scheduleService } from "../services/VisualScheduleService";
import { DailyScheduleResponseDto } from "../types/schedule.type";

import { useFlexibleFlow } from "../../flexible-schedule/hooks/useFlexibleSchedule";
import { MissedAlert } from "../../flexible-schedule/components/MissedAlert";
import { FlexibleModal } from "../../flexible-schedule/components/FlexibleModal";

const VisualScheduleScreen = () => {
  const [data, setData] = useState<DailyScheduleResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {
    missedSlots,
    isModalVisible,
    suggestion,
    loadingAi,
    setIsModalVisible,
    runCheck,
    handleGetAi,
    handleConfirm,
  } = useFlexibleFlow(async () => {
    await fetchData();
  });

  const fetchData = async () => {
    try {
      const result = await scheduleService.getDailySchedule();
      setData(result);
      await runCheck();
    } catch (error) {
      console.error("Lỗi khi tải lịch trình:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FFB81F" />
      </View>
    );
  }

  const schedules = data?.schedules || [];
  const completedCount = (schedules || []).filter(
    (s) => s.status === "completed",
  ).length;

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-4 pt-12"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center">
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
            <Text className="text-lg font-semibold ml-3 text-gray-800">
              Visual Schedule
            </Text>
          </View>
          <Image
            source={require("../../../../public/assets/images/imgVisualSchedule.png")}
            className="w-14 h-14"
            resizeMode="contain"
          />
        </View>
        {missedSlots.length > 0 && (
          <MissedAlert
            count={missedSlots.length}
            onPress={() => setIsModalVisible(true)}
          />
        )}
        <View className="bg-white rounded-2xl p-5 mb-6 border border-gray-300 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-semibold text-gray-800 text-base">
              Today&apos;s Learning
            </Text>
            <TouchableOpacity className="flex-row items-center border border-[#FFB81F]/50 bg-white px-3 py-1 rounded-full">
              <Ionicons name="create-outline" size={14} color="#FFB81F" />
              <Text className="text-black text-xs ml-1 font-medium">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-[#FF6200]/10 border border-[#FFB81F] rounded-2xl p-4 flex-row justify-between items-center">
            <View>
              <Text className="font-semibold text-gray-800">Progress</Text>
              <Text className="text-gray-600 mt-1">
                {completedCount}/{data?.schedules.length || 0} Golden Time
                completed
              </Text>
            </View>
            <CircularProgress percentage={data?.total_progress || 0} />
          </View>
        </View>

        <Text className="text-gray-800 font-semibold mb-3 text-base">
          Golden Time (Main)
        </Text>
        {data?.schedules.map((item) => (
          <TimeSlotCard
            key={item.slot_id}
            slot={{
              slot_id: item.slot_id,
              title: item.title,
              activity_type: item.activity_type,
              time_range: item.time_range,
              duration_label: item.duration_label,
              status: item.status,
              progress_percent: item.progress_percent,
              target_seconds: item.target_seconds,
              spent_seconds: item.spent_seconds,
            }}
          />
        ))}

        <View className="h-24" />
      </ScrollView>
      {missedSlots.length > 0 && (
        <FlexibleModal
          visible={isModalVisible}
          missedSlot={missedSlots[0]}
          suggestion={suggestion}
          loading={loadingAi}
          onClose={() => setIsModalVisible(false)}
          onGetAi={handleGetAi}
          onConfirm={handleConfirm}
        />
      )}
    </View>
  );
};

export default VisualScheduleScreen;
