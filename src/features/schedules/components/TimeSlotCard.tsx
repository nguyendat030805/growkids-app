import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface TimeSlotCardProps {
  title: string;
  time: string;
  subtitle: string;
  duration: string;
  suggestions: string[];
  isActive: boolean;
  isPreferred?: boolean;
  onToggle: () => void;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({
  title,
  time,
  subtitle,
  duration,
  suggestions,
  isActive,
  isPreferred = false,
  onToggle,
}) => {
  return (
    <View
      className={`w-full rounded-2xl p-4 mb-4 border ${
        isPreferred
          ? "bg-blue-50 border-blue-200"
          : "bg-orange-50 border-orange-200"
      }`}
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-1 mr-2">
          <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>
            ⏰ {time}
          </Text>
          <Text className="text-gray-500 text-sm">{subtitle}</Text>
        </View>

        <TouchableOpacity
          onPress={onToggle}
          activeOpacity={0.8}
          style={{
            width: 48,
            height: 24,
            borderRadius: 999,
            justifyContent: "center",
            paddingHorizontal: 4,
            backgroundColor: isActive ? "#22c55e" : "#d1d5db",
            flexShrink: 0,
          }}
        >
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              backgroundColor: "#ffffff",
              alignSelf: isActive ? "flex-end" : "flex-start",
            }}
          />
        </TouchableOpacity>
      </View>

      <Text className="text-gray-600 mb-2">
        Duration: <Text className="font-semibold">{duration}</Text>
      </Text>

      <Text className="text-gray-600">
        Suggestions:{" "}
        {suggestions.map((item, index) => (
          <Text key={index} className="text-gray-800 font-medium">
            {item}
            {index !== suggestions.length - 1 && ", "}
          </Text>
        ))}
      </Text>
    </View>
  );
};
export default TimeSlotCard;
