import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

import MiniSongHeader from "../components/MiniSongHeader";
import PlayCircleButton from "../components/PlayCircleButton";

export default function SongDetailPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F5F6FA]">
      {/* ===== Header ===== */}
      <MiniSongHeader />
      <ScrollView className="px-4">
        <View
          className="rounded-2xl overflow-hidden relative mb-4"
          style={{
            shadowColor: "#80492c", // orange-600
            shadowOffset: { width: 5, height: 10 },
            shadowOpacity: 2,
            shadowRadius: 6,
            elevation: 9, // Android
          }}
        >
          <Image
            source={require("@/public/assets/images/song-body.png")}
            className="w-full h-[200px]"
            resizeMode="cover"
          />
          <View className="absolute inset-0 items-center justify-center">
            <PlayCircleButton variant="overlay" size={64} iconSize={28} />
          </View>
        </View>
        <Text className="text-lg font-bold mb-3">
          Head Shoulders Knees And Toes
        </Text>
        {[
          {
            title: "Head and shoulders knees and toes",
            sub: "/hed ænd ˈʃoʊldərz niːz ænd toʊz/",
          },
          {
            title: "Knees and toes",
            sub: "/niːz ænd toʊz/",
          },
          {
            title: "Head and shoulders knees and toes",
            sub: "/hed ænd ˈʃoʊldərz niːz ænd toʊz/",
          },
          {
            title: "Knees and toes",
            sub: "/niːz ænd toʊz/",
          },
          {
            title: "Head and shoulders knees and toes",
            sub: "/hed ænd ˈʃoʊldərz niːz ænd toʊz/",
          },
          {
            title: "Knees and toes",
            sub: "/niːz ænd toʊz/",
          },
          {
            title: "Head and shoulders knees and toes",
            sub: "/hed ænd ˈʃoʊldərz niːz ænd toʊz/",
          },
        ].map((item, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3 mb-3"
            style={{
              shadowColor: "#b9aea8",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.55,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <View className="flex-1 pr-3">
              <Text className="font-semibold text-sm">{item.title}</Text>
              <Text className="text-xs text-orange-500 mt-1">{item.sub}</Text>
            </View>

            <PlayCircleButton size={36} iconSize={16} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
