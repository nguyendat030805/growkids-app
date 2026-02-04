import { Play, SkipBack, SkipForward } from "lucide-react-native";
import { View } from "react-native";

export default function PlayerOverlay() {
  return (
    <View className="absolute bottom-3 left-4 right-4">
      <View className="h-1 bg-white/40 rounded-full mb-3">
        <View className="h-1 w-1/3 bg-white rounded-full" />
      </View>
      <View className="flex-row items-center justify-center gap-8">
        <SkipBack size={22} color="#fff" />
        <Play size={30} color="#fff" fill="#fff" />
        <SkipForward size={22} color="#fff" />
      </View>
    </View>
  );
}
