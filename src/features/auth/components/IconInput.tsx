import { LucideIcon } from "lucide-react-native";
import React from "react";
import { View, TextInput, TextInputProps, Text } from "react-native";

import { CircleIcon } from "../../../core/components/CircleIcon";

interface IconInputProps extends TextInputProps {
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  iconSize?: number;
  error?: string | null;
}

const IconInput: React.FC<IconInputProps> = ({
  icon,
  iconBgColor = "#FBBF24",
  iconColor = "#fff",
  iconSize = 18,
  className,
  error,
  ...inputProps
}) => {
  const borderColor = error ? "border-red-500" : "border-green-300";

  return (
    <View className="mb-4">
      <View className={`flex-row border ${borderColor} rounded-full px-1 py-1`}>
        <CircleIcon
          icon={icon}
          size={45}
          iconSize={iconSize}
          backgroundColor={iconBgColor}
          iconColor={iconColor}
        />

        <TextInput
          {...inputProps}
          className={`flex-1 ml-3 text-xl ${className ?? ""}`}
          placeholderTextColor="#9CA3AF"
        />
      </View>
      {error && <Text className="text-red-500 text-sm mt-1 ml-4">{error}</Text>}
    </View>
  );
};

export default IconInput;
