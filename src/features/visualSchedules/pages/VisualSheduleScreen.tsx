import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CircularProgress from "../components/CircularProgress";
import TimeSlotCard from "../components/TimeSlotCard";
import { TimeSlot } from "../types/schedule.type";

const VisualScheduleScreen = () => {
  const [activeTab, setActiveTab] = useState("home");
  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };
  const slots: TimeSlot[] = [
    {
      id: "1",
      title: "Golden Time(Main)",
      subtitle: "MiniSong",
      time: "19:30 - 20:00",
      duration: 30,
      status: "upcoming",
      progress: 50,
    },
    {
      id: "2",
      title: "Golden Time(Mini)",
      subtitle: "MiniSong",
      time: "7:30 - 7:45",
      duration: 15,
      status: "completed",
      progress: 100,
    },
    {
      id: "3",
      title: "Golden Time(Main)",
      subtitle: "Story",
      time: "20:30 - 21:00",
      duration: 30,
      status: "missed",
      progress: 40,
    },
  ];
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 pt-12">
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center">
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
            <Text className="text-lg font-semibold ml-3 text-gray-800">
              Visual Schedule
            </Text>
          </View>
          <Image
            source={require("../../../../public/assets/images/imgVisualSchedule.png")}
            className="w-14 h-14"
            resizeMode="contain"
          />
        </View>
        <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm elevation: 5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-semibold text-gray-800 text-base">
              Today’s Learning
            </Text>
            <TouchableOpacity className="flex-row items-center border border-[#FFB81F]/50 bg-white px-3 py-1 rounded-full">
              <Ionicons name="create-outline" size={14} color="#FFB81F" />
              <Text className="text-[#FFB81F] text-xs ml-1 font-medium">
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-[#FFB81F]/10 border border-[#FFB81F] rounded-2xl p-4 flex-row justify-between items-center">
            <View>
              <Text className="font-semibold text-gray-800">Progress</Text>
              <Text className="text-gray-600 mt-1">
                2/4 Golden Time completed
              </Text>
            </View>
            <CircularProgress percentage={50} />
          </View>
        </View>
        <Text className="text-gray-800 font-semibold mb-3 text-base">
          Golden Time(Main)
        </Text>
        {slots.map((slot) => (
          <TimeSlotCard key={slot.id} slot={slot} />
        ))}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
};

export default VisualScheduleScreen;
