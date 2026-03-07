import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Home, Zap, ScanLine, Mic, BookOpen } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TAB_CONFIG = [
  {
    name: "HomeTab",
    label: "Home",
    icon: Home,
    activeColor: "#1C2B6D",
    inactiveColor: "#9CA3AF",
  },
  {
    name: "ExperienceTab",
    label: "Experience",
    icon: Zap,
    activeColor: "#1C2B6D",
    inactiveColor: "#9CA3AF",
  },
  {
    name: "ScanTab",
    label: "Scan",
    icon: ScanLine,
    activeColor: "#1C2B6D",
    inactiveColor: "#9CA3AF",
  },
  {
    name: "VoiceTab",
    label: "Voice",
    icon: Mic,
    activeColor: "#1C2B6D",
    inactiveColor: "#9CA3AF",
  },
  {
    name: "LibraryTab",
    label: "Library",
    icon: BookOpen,
    activeColor: "#1C2B6D",
    inactiveColor: "#9CA3AF",
  },
];

export const BottomMenu: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  return (
    <SafeAreaView edges={["bottom"]} className="bg-white">
      <View className="flex-row items-center justify-between bg-white border-t border-gray-200 px-6 py-3">
        {TAB_CONFIG.map((item, index) => {
          const Icon = item.icon;
          const isScan = item.name === "ScanTab";
          const isActive = !isScan && state.index === index;
          const color = isActive ? item.activeColor : item.inactiveColor;

          return (
            <TouchableOpacity
              key={item.name}
              className="items-center justify-center"
              onPress={() => {
                if (isScan) {
                  navigation.navigate("ScanTab");
                  return;
                }
                if (!isActive) {
                  const route = state.routes[index];
                  navigation.navigate(route.name);
                }
              }}
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
    </SafeAreaView>
  );
};
