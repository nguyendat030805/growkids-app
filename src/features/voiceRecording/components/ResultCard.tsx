import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ResultCardProps {
  label: string;
  content: string;
  sub?: string;
  isAI?: boolean;
  onPressSpeak?: () => void;
}

export const ResultCard = ({
  label,
  content,
  sub,
  isAI,
  onPressSpeak,
}: ResultCardProps) => (
  <View
    className={`p-4 rounded-[20px] mb-4 shadow-sm ${
      isAI ? "bg-white border border-slate-200" : "bg-slate-200"
    }`}
    style={isAI ? { elevation: 2 } : {}}
  >
    <View className="self-start bg-black/5 px-2 py-1 rounded-md mb-1">
      <Text className="text-[10px] font-bold text-slate-500 uppercase">
        {label}
      </Text>
    </View>

    <Text className="text-lg font-bold text-slate-800">{content}</Text>

    {sub && (
      <View className="mt-2 p-2 bg-slate-50 rounded-lg">
        <Text className="italic text-slate-600 text-[15px]">{sub}</Text>
      </View>
    )}

    {isAI && (
      <TouchableOpacity
        className="bg-amber-400 flex-row p-3 rounded-full mt-3 justify-center items-center shadow-md active:bg-amber-500"
        onPress={onPressSpeak}
      >
        <Ionicons name="volume-medium" size={20} color="white" />
        <Text className="color-white font-bold ml-2 text-sm">Nghe phát âm</Text>
      </TouchableOpacity>
    )}
  </View>
);
