import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Slot } from "../types/FlexibleScheduleType";
import { useScheduleStatus } from "../../visualSchedules/hooks/useScheduleStatus";

interface Props {
  visible: boolean;
  missedSlot: Slot;
  suggestion: Slot | null;
  loading: boolean;
  onClose: () => void;
  onGetAi: () => void;
  onConfirm: () => void;
}

const getEndTime = (startTime: string | undefined): string => {
  if (!startTime) return "...";
  const [hours, minutes] = startTime.split(":").map(Number);
  let endMin = minutes + 30;
  let endHour = hours;
  if (endMin >= 60) {
    endMin -= 60;
    endHour = (endHour + 1) % 24;
  }
  return `${String(endHour).padStart(2, "0")}:${String(endMin).padStart(2, "0")}`;
};

export const FlexibleModal = ({
  visible,
  missedSlot,
  suggestion,
  loading,
  onClose,
  onGetAi,
  onConfirm,
}: Props) => {
  const missedConfig = useScheduleStatus("missed");
  const suggestionConfig = useScheduleStatus("upcoming");

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center bg-black/50 p-6">
        <View className="bg-white rounded-[30px] p-6 shadow-2xl">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-[20px] font-bold text-gray-800 text-center flex-1">
              Flexible Schedule
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <Text className="text-xl text-gray-400">✕</Text>
            </TouchableOpacity>
          </View>

          <View className="border border-orange-100 rounded-2xl p-4 mb-5 bg-orange-50/20">
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center">
                <Ionicons
                  name={missedConfig.icon}
                  size={19}
                  color={missedConfig.iconColor}
                />
                <Text className="font-semibold text-gray-500 text-[13px] ml-1">
                  Golden Time (Main)
                </Text>
              </View>
              <View className="bg-orange-400 px-2 py-0.5 rounded-md">
                <Text className="text-white text-[10px] font-bold">Missed</Text>
              </View>
            </View>
            <Text className="text-lg font-bold text-gray-800">
              {missedSlot.start_time} - {getEndTime(missedSlot.start_time)}
            </Text>
            <Text className="text-teal-600 text-sm">
              {missedSlot.slot_type}
            </Text>
            <View className="h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
              <View className="h-full w-full" />
            </View>
          </View>

          <Text className="text-gray-400 font-bold text-x mb-3">
            Flexible suggestions for you
          </Text>

          {!suggestion ? (
            <TouchableOpacity
              onPress={onGetAi}
              disabled={loading}
              className="h-28 border-2 border-dashed border-teal-200 bg-teal-50/30 rounded-2xl justify-center items-center"
            >
              {loading ? (
                <ActivityIndicator size="large" color="#FFB81F" />
              ) : (
                <Text className="text-teal-700 font-medium">
                  Click to have the AI ​​suggest the latest time
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <View className="border border-teal-100 rounded-2xl p-4 bg-teal-50/20">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <Ionicons
                    name={suggestionConfig.icon}
                    size={19}
                    color={suggestionConfig.iconColor}
                  />
                  <Text className="font-semibold text-gray-500 text-[13px] ml-1">
                    Golden Time (Main)
                  </Text>
                </View>
                <View className="bg-yellow-400 px-2 py-0.5 rounded-md">
                  <Text className="text-white text-[10px] font-bold">
                    Upcoming
                  </Text>
                </View>
              </View>
              <Text className="text-lg font-bold text-gray-800">
                {suggestion.start_time} - {getEndTime(suggestion.start_time)}
              </Text>
              <Text className="text-teal-600 text-sm">
                {suggestion.slot_type}
              </Text>
              <View className="h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <View className="h-full" />
              </View>
            </View>
          )}

          <View className="flex-row justify-between mt-8">
            <TouchableOpacity
              onPress={onClose}
              className="w-[47%] border border-gray-200 py-4 rounded-2xl items-center"
            >
              <Text className="font-bold text-gray-500">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              disabled={!suggestion || loading}
              className={`w-[47%] py-4 rounded-2xl items-center ${suggestion ? "bg-[#A3CB38]" : "bg-gray-200"}`}
            >
              <Text className="font-bold text-white">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
