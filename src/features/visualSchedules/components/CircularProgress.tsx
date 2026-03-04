import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
interface Props {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}
const CircularProgress: React.FC<Props> = ({
  percentage,
  size = 90,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        <Circle
          stroke="#e5e7eb"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#84cc16"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View className="absolute">
        <Text className="text-lg font-bold">{percentage}%</Text>
      </View>
    </View>
  );
};
export default CircularProgress;
