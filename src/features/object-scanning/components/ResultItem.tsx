import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ResultItemProps {
  en: string;
  vi: string;
  phonetic: string;
  keyword: string;
  onPlay: () => void;
}

export const ResultItem = ({ en, vi, keyword, onPlay }: ResultItemProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPlay}
    className="bg-[#F2F2F2] p-5 rounded-[20px] mb-4"
  >
    <View className="flex-row items-start justify-between">
      <View className="flex-1 pr-2">
        <Text className="text-[16px] text-gray-800 leading-6">
          {en.split(" ").map((word, i) => {
            const isMatch = word.toLowerCase().includes(keyword?.toLowerCase());
            return (
              <Text
                key={i}
                className={
                  isMatch ? "text-[#ffb500] font-bold" : "text-gray-800"
                }
              >
                {word}{" "}
              </Text>
            );
          })}
        </Text>
        <Text className="text-[14px] text-gray-500 italic mt-2">{vi}</Text>
      </View>
      <View className="bg-[#ffb500] p-2 rounded-full shadow-sm">
        <Ionicons name="volume-medium" size={20} color="white" />
      </View>
    </View>
  </TouchableOpacity>
);
