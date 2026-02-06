import { Play, SkipBack, SkipForward } from "lucide-react-native";
import { Pressable, View } from "react-native";

type PlayerOverlayProps = {
  onPlayPress?: () => void;
};

const PlayerOverlay = ({ onPlayPress }: PlayerOverlayProps) => {
  return (
    <View className="absolute bottom-3 left-4 right-4">
      {/* Progress */}
      <View className="h-1 bg-white/40 rounded-full mb-3">
        <View className="h-1 w-1/3 bg-white rounded-full" />
      </View>

      {/* Controls */}
      <View className="flex-row items-center justify-center gap-8">
        <SkipBack size={22} color="#fff" />

        <Pressable onPress={onPlayPress}>
          <Play size={30} color="#fff" fill="#fff" />
        </Pressable>

        <SkipForward size={22} color="#fff" />
      </View>
    </View>
  );
};

export default PlayerOverlay;
