import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TimeSlot } from "../types/schedule.type";
import { useScheduleStatus } from "../hooks/useScheduleStatus";
import ProgressBar from "./ProgressBar";

interface Props {
  slot: TimeSlot;
}

const TimeSlotCard: React.FC<Props> = ({ slot }) => {
  const normalizedStatus = slot.status.toLowerCase() as TimeSlot["status"];
  const config = useScheduleStatus(normalizedStatus);

  if (!slot) return null;

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Ionicons
            name={config.icon}
            size={18}
            color={config.iconColor}
            style={{ marginRight: 8 }}
          />
          <Text className="text-gray-800 font-semibold text-base capitalize">
            {slot.title}
          </Text>
        </View>

        <View className={`${config.badgeStyle} px-2 py-0.5 rounded-full`}>
          <Text
            className="text-xs font-semibold capitalize"
            style={{ color: config.iconColor }}
          >
            {slot.status}
          </Text>
        </View>
      </View>

      <Text className="text-gray-700 font-medium">{slot.time_range}</Text>
      <Text className="text-[#0F5E47] mt-1 text-sm">{slot.activity_type}</Text>

      <View className="mt-3">
        <ProgressBar
          progress={slot.progress_percent}
          duration={slot.duration_label}
        />
      </View>
    </View>
  );
};

export default TimeSlotCard;
