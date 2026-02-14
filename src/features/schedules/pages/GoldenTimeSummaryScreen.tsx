import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import ChatBubble from "../components/ChatBubble";

const GoldenTimeSummaryScreen = ({ route, navigation }: any) => {
  const { selectedSlots, timeBlocks } = route.params;

  const activityLabels: Record<string, string> = {
    WAKE_UP: "Wake up ☀️",
    BREAKFAST: "Breakfast 🍽️",
    NAP: "Nap 😴",
    BATH: "Bath 🛁",
    SLEEP: "Sleep 🌙",
  };

  const fixedSchedule = timeBlocks.map((block: any) => ({
    time: block.start_time,
    title: activityLabels[block.activity_type] || block.activity_type,
    type: "fixed",
  }));

  const goldenSchedule = selectedSlots.map((slot: any) => ({
    time: slot.start_time,
    title: slot.slot_type,
    context: slot.context,
    duration: slot.duration_minutes,
    type: "golden",
  }));

  const allSchedule = [...fixedSchedule, ...goldenSchedule].sort((a, b) => {
    const timeA = a.time.split(":").map(Number);
    const timeB = b.time.split(":").map(Number);
    return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
  });

  const totalMinutes = selectedSlots.reduce(
    (sum: number, slot: any) => sum + slot.duration_minutes,
    0,
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View className="items-center mt-6 mb-4">
          <Image
            source={require("@/assets/tải xuống.png")}
            className="w-[120px] h-[120px] resize-contain"
          />
        </View>
        <View className="px-6">
          <ChatBubble
            text={{
              vi: "Tuyệt vời! Đây là lịch trình hôm nay:",
              en: "Perfect! Here is today’s schedule:",
            }}
            animatedStyle={{}}
          />
        </View>
        <View className="mt-4 border border-orange-300 rounded-2xl p-5">
          <Text className="text-lg font-bold text-gray-800 mb-6">
            Today&apos;s schedule:
          </Text>

          {allSchedule.map((item, index) => {
            const isGolden = item.type === "golden";

            return (
              <View key={index} className="flex-row">
                <View className="items-center mr-4">
                  <View
                    className={`w-5 h-5 rounded-full border-2 items-center justify-center`}
                    style={{
                      borderColor: isGolden ? "#A8D400" : "#9CA3AF",
                      backgroundColor: isGolden ? "#A8D400" : "transparent",
                    }}
                  >
                    {isGolden && <Text className="text-white text-xs">✓</Text>}
                  </View>

                  {index !== allSchedule.length - 1 && (
                    <View
                      className="w-[2px] flex-1"
                      style={{
                        backgroundColor: isGolden ? "#A8D400" : "#D1D5DB",
                      }}
                    />
                  )}
                </View>

                <View className="flex-1 pb-8">
                  <Text className="text-gray-800 font-semibold">
                    {item.time}
                  </Text>

                  <Text
                    className={`mt-1 ${
                      isGolden ? "font-semibold" : "text-gray-600"
                    }`}
                    style={isGolden ? { color: "#A8D400" } : {}}
                  >
                    {item.title}
                    {item.duration && ` – ${item.duration} mins`}
                  </Text>

                  {item.context && (
                    <Text className="text-gray-500 text-sm mt-1">
                      {item.context}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}

          <View className="h-[1px] bg-gray-200 my-4" />

          <View className="flex-row items-center">
            <View
              className="w-5 h-5 rounded-full items-center justify-center mr-2"
              style={{ backgroundColor: "#A8D400" }}
            >
              <Text className="text-white text-xs">✓</Text>
            </View>
            <Text className="text-gray-700">
              Total: {totalMinutes} mins of English learning
            </Text>
          </View>
        </View>
        <View
          className="mt-4 p-4 rounded-xl"
          style={{
            backgroundColor: "#E5F9E8",
            borderColor: "#73DF80",
            borderWidth: 1,
          }}
        >
          <Text className="font-semibold" style={{ color: "#6B7A00" }}>
            Setup complete!
          </Text>
          <Text className="text-sm mt-1" style={{ color: "#8A9B00" }}>
            You&apos;ll receive a reminder 5 minutes before each prime time
            slot.
          </Text>
        </View>
      </ScrollView>

      <View className="p-6">
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          className="bg-lime-500 py-4 rounded-xl items-center"
        >
          <Text className="text-white font-bold text-lg">Completed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoldenTimeSummaryScreen;
