import { Play } from "lucide-react-native";
import React from "react";

import { CircleIcon } from "@/src/core/components/CircleIcon";

interface PlayCircleButtonProps {
  size?: number;
  iconSize?: number;
  onPress?: () => void;
  variant?: "primary" | "overlay";
}

const PlayCircleButton: React.FC<PlayCircleButtonProps> = ({
  size = 48,
  iconSize = 20,
  onPress,
  variant = "primary",
}) => {
  const backgroundColor =
    variant === "overlay" ? "rgba(255,255,255,0.8)" : "#00C517";

  const iconColor = variant === "overlay" ? "#00C517" : "#fff";

  return (
    <CircleIcon
      icon={Play}
      size={size}
      iconSize={iconSize}
      backgroundColor={backgroundColor}
      iconColor={iconColor}
      onPress={onPress}
    />
  );
};

export default PlayCircleButton;
