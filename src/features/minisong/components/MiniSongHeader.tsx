import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MiniSongHeader = () => {
  const router = useRouter();
  return (
    <View className="mx-4 mt-4 mb-4 bg-white rounded-2xl px-4 py-3 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1C2B6D" />
          </TouchableOpacity>
          <Text className="ml-2 text-[18px] font-bold text-[#1C2B6D]">
            Songs
          </Text>
        </View>
        <Image
          source={require("@/public/assets/images/song-logo.png")}
          className="w-9 h-9"
          resizeMode="contain"
        />
      </View>
      <Text className="text-xs text-gray-500 ml-7">Let’s enjoy the music!</Text>
    </View>
  );
};
export default MiniSongHeader;
