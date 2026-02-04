import { Home, Zap, BookOpen, User } from "lucide-react-native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface BottomMenuProps {
  activeTab?: "home" | "experience" | "library" | "profile";
  onTabPress?: (tab: "home" | "experience" | "library" | "profile") => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({
  activeTab = "home",
  onTabPress,
}) => {
  const menuItems = [
    {
      id: "home" as const,
      label: "Home",
      icon: Home,
      activeColor: "#1C2B6D",
      inactiveColor: "#9CA3AF",
    },
    {
      id: "experience" as const,
      label: "Experience",
      icon: Zap,
      activeColor: "#1C2B6D",
      inactiveColor: "#9CA3AF",
    },
    {
      id: "library" as const,
      label: "Library",
      icon: BookOpen,
      activeColor: "#1C2B6D",
      inactiveColor: "#9CA3AF",
    },
    {
      id: "profile" as const,
      label: "Profile",
      icon: User,
      activeColor: "#1C2B6D",
      inactiveColor: "#9CA3AF",
    },
  ];

  return (
    <View className="flex-row items-center justify-between bg-white border-t border-gray-200 px-6 py-3">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        const color = isActive ? item.activeColor : item.inactiveColor;

        return (
          <TouchableOpacity
            key={item.id}
            className="items-center justify-center"
            onPress={() => onTabPress && onTabPress(item.id)}
            activeOpacity={0.7}
          >
            <Icon size={24} color={color} />
            <Text
              className={`text-xs mt-1 ${isActive ? "font-semibold text-[#1C2B6D]" : "font-medium text-gray-500"}`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
