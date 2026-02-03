import { LucideIcon } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

interface CircleIconProps {
  icon: LucideIcon;
  size?: number; // px
  iconSize?: number; // px
  iconColor?: string;
  backgroundColor?: string; // hex / rgb
  borderColor?: string;
  borderWidth?: number;
  onPress?: () => void;
}

export const CircleIcon: React.FC<CircleIconProps> = ({
  icon: Icon,
  size = 64,
  iconSize = 28,
  iconColor = "#fff",
  backgroundColor = "#FBBF24",
  borderColor,
  borderWidth = 0,
  onPress,
}) => {
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      className="items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor,
        borderColor,
        borderWidth,
      }}
    >
      <Icon size={iconSize} color={iconColor} />
    </Wrapper>
  );
};
