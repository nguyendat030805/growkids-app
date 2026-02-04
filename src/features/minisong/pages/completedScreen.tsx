import { Image, Text, View } from "react-native";

import MiniSongHeader from "../components/MiniSongHeader";
export default function CompletedScreen() {
  return (
    <View className="flex-1 bg-[#F3F6FB]">
      {/* ===== Header ===== */}
      <MiniSongHeader />
      {/* ===== Content ===== */}
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("@/public/assets/images/complete-mini-song.png")}
          className="w-[160px] h-[160px]"
          resizeMode="contain"
        />
        <Text
          className="mt-6 italic text-yellow-500"
          style={{ fontSize: 36, fontWeight: "800" }}
        >
          Completed
        </Text>
      </View>
    </View>
  );
}
