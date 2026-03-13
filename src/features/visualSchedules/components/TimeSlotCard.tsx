import React from "react";
import { View, Text, TouchableOpacity } from "react-native"; // Thêm TouchableOpacity vào import
import { Ionicons } from "@expo/vector-icons";
import { TimeSlot } from "../types/schedule.type";
import { useScheduleStatus } from "../hooks/useScheduleStatus";
import ProgressBar from "./ProgressBar";

interface Props {
  slot: TimeSlot;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TimeSlotCard: React.FC<Props> = ({ slot, onEdit, onDelete }) => {
  const normalizedStatus = slot.status.toLowerCase() as TimeSlot["status"];
  const config = useScheduleStatus(normalizedStatus);

  if (!slot) return null;

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center flex-1">
          <Ionicons
            name={config.icon}
            size={18}
            color={config.iconColor}
            style={{ marginRight: 8 }}
          />
          <Text
            className="text-gray-800 font-semibold text-base capitalize flex-1"
            numberOfLines={1}
          >
            {slot.title}
          </Text>
        </View>

        <View className="flex-row items-center space-x-2">
          <TouchableOpacity onPress={onEdit} className="p-1">
            <Ionicons name="pencil-outline" size={18} color="#FFB81F" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} className="p-1">
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </TouchableOpacity>

          <View
            className={`${config.badgeStyle} px-2 py-0.5 rounded-full ml-1`}
          >
            <Text
              className="text-xs font-semibold capitalize"
              style={{ color: config.iconColor }}
            >
              {slot.status}
            </Text>
          </View>
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
