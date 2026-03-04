import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
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
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            stroke="#E5E7EB"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke="#A8D400"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View className="absolute">
        <Text className="text-lg font-bold text-gray-800">{percentage}%</Text>
      </View>
    </View>
  );
};
export default CircularProgress;
