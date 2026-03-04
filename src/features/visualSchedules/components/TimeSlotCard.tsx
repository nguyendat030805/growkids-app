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
  const config = useScheduleStatus(slot.status);
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
          <Text className="text-gray-800 font-semibold text-base">
            {slot.title}
          </Text>
        </View>
        <View className={`${config.badgeStyle} px-2 py-0.5 rounded-full`}>
          <Text
            className={`text-xs font-semibold capitalize ${
              slot.status === "missed"
                ? "text-orange-600"
                : slot.status === "completed"
                  ? "text-green-600"
                  : "text-yellow-600"
            }`}
          >
            {slot.status}
          </Text>
        </View>
      </View>
      <Text className="text-gray-700">{slot.time}</Text>
      <Text className="text-[#0F5E47] mt-1">{slot.subtitle}</Text>
      <ProgressBar progress={slot.progress} duration={slot.duration} />
    </View>
  );
};
export default TimeSlotCard;
