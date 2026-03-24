import { View, Text, TouchableOpacity } from "react-native";
export const MissedAlert = ({
  count,
  onPress,
}: {
  count: number;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className=" my-4 bg-orange-50 border border-orange-200 rounded-2xl p-4 flex-row items-center shadow-sm"
  >
    <View className="bg-orange-100 p-2 rounded-full mr-3">
      <Text className="text-xl">⚠️</Text>
    </View>
    <View className="flex-1">
      <Text className="text-orange-800 font-bold text-lg">
        We need to optimize the schedule!
      </Text>
      <Text className="text-orange-600 text-[13px]" numberOfLines={1}>
        The child missed the {count} class time slot. Click to have the AI
        ​​help change the time.
      </Text>
    </View>
    <View className="bg-[#A3CB38] px-3 py-2 rounded-lg ml-2">
      <Text className="text-white font-bold text-[13px]">CHANGE TIME</Text>
    </View>
  </TouchableOpacity>
);
