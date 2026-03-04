import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

import ChatBubble from "../components/ChatBubble";
import TimeSlotCard from "../components/TimeSlotCard";
import { goldenTimeService } from "../services/GoldenTime.service";
import { useSubmitGoldenTime } from "../hooks/useSubmitGoldenTime";
import { GoldenTimeSlot } from "../types/GoldenTimeType";

const GoldenTimeScreen = ({ route }: any) => {
  const { childId, timeBlocks } = route.params;
  const [activeSlots, setActiveSlots] = useState<number[]>([]);
  const [data, setData] = useState<GoldenTimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [routineId, setRoutineId] = useState<string | null>(null);
  const { handleConfirm } = useSubmitGoldenTime(
    data,
    activeSlots,
    routineId,
    timeBlocks,
  );
  useEffect(() => {
    const fetchGoldenTime = async () => {
      try {
        const res = await goldenTimeService.getGoldenTime(childId);
        setData(res.slots);
        setRoutineId(res.routineId);
      } catch (error) {
        console.error("Error fetching golden time:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldenTime();
  }, [childId]);
  const toggleSlot = (index: number) => {
    setActiveSlots((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const formatTimeSlot = (slot: any) => {
    const start = slot.start_time;
    const [hour, minute] = start.split(":").map(Number);
    const endDate = new Date();
    endDate.setHours(hour);
    endDate.setMinutes(minute + slot.duration_minutes);
    const endHour = String(endDate.getHours()).padStart(2, "0");
    const endMinute = String(endDate.getMinutes()).padStart(2, "0");

    return {
      title: slot.slot_type,
      time: `${start} - ${endHour}:${endMinute}`,
      subtitle: slot.context,
      duration: `${slot.duration_minutes} mins`,
      suggestions: slot.suggestions,
    };
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingTop: 18, paddingBottom: 120 }}
      >
        <View className="items-center mt-6 mb-4">
          <Image
            source={require("@/assets/LogoIntro.png")}
            className="w-[120px] h-[120px] resize-contain"
          />
        </View>
        <View className="px-6">
          <ChatBubble
            text={{
              vi: "Dựa trên thông tin bạn cung cấp, tôi đề xuất các khung giờ vàng sau:",
              en: "Based on the information provided by the parents, I suggest these golden time slots:",
            }}
            animatedStyle={{}}
          />
        </View>

        <View className="px-6 mt-6">
          {data.map((slot, index) => {
            const formatted = formatTimeSlot(slot);

            return (
              <View key={index}>
                {index === 0 && (
                  <Text className="text-lg font-bold text-gray-800 mb-3">
                    ⭐ Preferred time:
                  </Text>
                )}
                {index === 1 && (
                  <Text className="text-lg font-bold text-gray-800 mt-4 mb-3">
                    Secondary time slot:
                  </Text>
                )}

                <TimeSlotCard
                  title={formatted.title}
                  time={formatted.time}
                  subtitle={formatted.subtitle}
                  duration={formatted.duration}
                  suggestions={formatted.suggestions}
                  isPreferred={index === 0}
                  isActive={activeSlots.includes(index)}
                  onToggle={() => toggleSlot(index)}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full px-6 flex-row justify-between bg-white py-6">
        <TouchableOpacity
          onPress={() => route.goBack()}
          className="bg-gray-100 py-3 px-10 rounded-xl"
        >
          <Text className="text-gray-600 font-semibold text-lg">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleConfirm}
          className="bg-lime-500 py-3 px-10 rounded-xl"
        >
          <Text className="text-white font-semibold text-lg">Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoldenTimeScreen;
