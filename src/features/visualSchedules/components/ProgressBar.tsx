import React from "react";
import { View, Text } from "react-native";
interface Props {
  progress: number;
  duration: string;
}
const ProgressBar: React.FC<Props> = ({ progress, duration }) => {
  return (
    <View className="mt-4">
      <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-2 bg-[#FFB81F] rounded-full"
          style={{ width: `${progress ?? 0}%` }}
        />
      </View>
      <Text className="text-center text-xs text-gray-600 mt-1">{duration}</Text>
    </View>
  );
};
export default ProgressBar;
