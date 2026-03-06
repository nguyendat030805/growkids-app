import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Music, BookOpen } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { ExperienceStackParamList } from "@/src/core/navigation/NavigationService";

const experiences = [
  {
    title: "MiniSong",
    type: "Short song",
    duration: "2-3 minutes",
    desc: "Fun songs (1-2 minutes) with clear topics and vocabulary.",
    progress: "12/16",
    btn: "Start",
    btnColor: "bg-[#9EC800]",
    progressColor: "#9EC800",
    image: require("@/public/assets/images/imgMiniSong.png"),
    iconComponent: Music,
    iconColor: "#9EC800",
    bgColor: "bg-[#A8D400]/10",
    navigateTo: "Songs" as keyof RootStackParamList | undefined,
  },
  {
    title: "Interactive Story",
    type: "Interactive story",
    duration: "5-7 minutes",
    desc: "Stories with native voices. Children tap to hear vocabulary.",
    progress: "5/12",
    btn: "Start",
    btnColor: "bg-[#FFB500]",
    progressColor: "#FFB500",
    image: require("@/public/assets/images/imgStory.png"),
    iconComponent: BookOpen,
    iconColor: "#FFB500",
    bgColor: "bg-[#FFB500]/10",
    navigateTo: "Story" as keyof ExperienceStackParamList,
  },
];

export default function ExperienceScreen() {
  const navigation =
    useNavigation<StackNavigationProp<ExperienceStackParamList>>();

  const calculateProgressPercentage = (progress: string) => {
    const [current, total] = progress.split("/").map(Number);
    return (current / total) * 100;
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          <View className="px-4">
            <Text className="text-2xl font-bold text-[#1C2B6D] text-center mb-3">
              Bilingual Learning Through Experience
            </Text>
            <Text className="text-center text-gray-600 mb-6 text-base px-2">
              Fun learning activities like MiniSong and Story help children
              learn language naturally through sound, images, and movement.
            </Text>

            <View className="gap-6">
              {experiences.map((exp, idx) => {
                const progressPercentage = calculateProgressPercentage(
                  exp.progress,
                );
                const IconComponent = exp.iconComponent;

                return (
                  <View
                    key={idx}
                    className="rounded-3xl border border-gray-200 overflow-hidden bg-white shadow-sm"
                  >
                    <View className="w-full h-44 overflow-hidden">
                      <Image
                        source={exp.image}
                        className="w-full h-full"
                        resizeMode="cover"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </View>

                    <View className={`p-4 ${exp.bgColor}`}>
                      <View className="flex-row items-center mb-2">
                        <View
                          className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-gray-100 items-center justify-center"
                          style={{ backgroundColor: `${exp.iconColor}20` }}
                        >
                          <IconComponent size={20} color={exp.iconColor} />
                        </View>

                        <Text className="font-bold text-lg text-black flex-1">
                          {exp.title}
                        </Text>

                        <View className="bg-white px-3 py-1 rounded-full">
                          <Text className="text-xm font-bold text-[#54616D]">
                            {exp.duration}
                          </Text>
                        </View>
                      </View>

                      <Text className="text-sm font-medium text-black mb-2">
                        {exp.type}
                      </Text>

                      <Text className="text-sm text-gray-600 mb-4 leading-5">
                        {exp.desc}
                      </Text>

                      <View className="flex-row items-center">
                        <Text className="text-sm font-bold text-black mr-2">
                          Progress
                        </Text>
                        <Text className="text-sm font-semibold text-[#1C2B6D]">
                          {exp.progress}
                        </Text>
                      </View>

                      <View className="flex-row items-center gap-4">
                        <View className="flex-1">
                          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <View
                              className="h-full rounded-full"
                              style={{
                                width: `${progressPercentage}%`,
                                backgroundColor: exp.progressColor,
                              }}
                            />
                          </View>
                        </View>

                        <TouchableOpacity
                          className={`rounded-full py-2 px-6 ${exp.btnColor} items-center min-w-[80px]`}
                          activeOpacity={0.8}
                          onPress={() => {
                            if (exp.navigateTo) {
                              navigation.navigate(exp.navigateTo as never);
                            }
                          }}
                        >
                          <Text className="font-bold text-white text-sm">
                            {exp.btn}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            <View className="mt-8 bg-[#F8F9FA] rounded-2xl p-5">
              <Text className="text-lg font-bold text-[#1C2B6D] mb-4">
                Coming Soon
              </Text>

              <View className="gap-4">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-xl bg-[#E8F5E9] items-center justify-center mr-4">
                    <Text className="text-xl">🎬</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-800">
                      Music Videos
                    </Text>
                    <Text className="text-sm text-gray-600">
                      Animated music videos with lyrics
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-xl bg-[#FFF3CD] items-center justify-center mr-4">
                    <Text className="text-xl">🎭</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-800">
                      Role Play
                    </Text>
                    <Text className="text-sm text-gray-600">
                      Interactive dialogues and scenarios
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
