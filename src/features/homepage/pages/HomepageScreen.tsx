import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

const stats = [
  {
    label: "Learned today",
    value: "3/3",
    sub: "Completed^^",
    color: "bg-[#F3FDE8] border-[#B6E388] text-[#618264]",
    valueColor: "text-[#A8D400]",
    borderWidth: "border-2",
  },
  {
    label: "Study time",
    value: "1 hours",
    sub: "60 minutes goal",
    color: "bg-[#FFF7D4] border-[#FFD95A] text-[#B99B2B]",
    valueColor: "text-[#FFB81F]",
  },
  {
    label: "Streak",
    value: "7 days",
    sub: "Keep it up!",
    color: "bg-[#E3F4F4] border-[#39A7FF] text-[#176B87]",
    valueColor: "text-[#0F5E47]",
  },
];

const activities = [
  {
    title: "MiniSong",
    type: "Short song",
    desc: "1-2 min songs with fun animations and hand & body movements.",
    info: "5 songs | New",
    btn: "Start",
    btnColor: "bg-[#9EC800] text-white",
    image: require("@/public/assets/images/imgMiniSong.png"),
  },
  {
    title: "Interactive Story",
    type: "Interactive story",
    desc: "Stories told by native voices. Tap the characters to learn vocabulary.",
    info: "3 stories | New",
    btn: "Start",
    btnColor: "bg-[#FFB500] text-[#B99B2B]",
    image: require("@/public/assets/images/imgStory.png"),
  },
];

export default function HomepageScreen() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          <View className="px-4">
            <Text className="text-2xl font-bold text-[#1C2B6D] text-center mb-4">
              Bilingual Learning with your child
            </Text>
            <Text className="text-center text-gray-500 mb-6 text-base">
              Fun activities help children develop language naturally through
              sounds, images, and movement, so they can learn English
              effectively
            </Text>

            <View className="flex-row justify-between mb-7">
              {stats.map((stat, idx) => (
                <View
                  key={idx}
                  className={`flex-1 mx-1 rounded-xl border ${stat.color} p-4 items-center`}
                >
                  <Text className="text-xs text-[#54616D] mb-1">
                    {stat.label}
                  </Text>
                  <Text
                    className={`text-xl font-bold mb-1 ${stat.valueColor || "text-[#1C2B6D]"}`}
                  >
                    {stat.value}
                  </Text>
                  <Text className="text-xs text-[#54616D]">{stat.sub}</Text>
                </View>
              ))}
            </View>

            <Text className="text-xl font-bold mb-6 text-[#1C2B6D]">
              {"Today's activities"}
            </Text>
            <View className="flex-row flex-wrap -mx-1">
              {activities.map((act, idx) => (
                <View key={idx} className="w-1/2 px-1 mb-4">
                  <View className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
                    <View className="w-full h-24">
                      <Image
                        source={act.image}
                        className="w-full h-full"
                        resizeMode="cover"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </View>
                    <View className="p-3">
                      <Text className="font-bold text-base mb-1 text-[#1C2B6D]">
                        {act.title}
                      </Text>
                      <Text className="text-xs font-bold text-[#0F5E47] mb-3">
                        {act.type}
                      </Text>
                      <Text className="text-xs text-gray-500 mb-3 min-h-[32px]">
                        {act.desc}
                      </Text>
                      <View className="flex-row items-center justify-between mt-auto">
                        <Text className="text-xs text-[#9BC900] font-semibold">
                          {act.info}
                        </Text>
                        <TouchableOpacity
                          className={`rounded-lg px-3 py-1 ml-2 ${act.btnColor}`}
                        >
                          <Text className="font-bold text-xs text-white">
                            {act.btn}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
