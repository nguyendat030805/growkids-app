import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { RootStackParamList } from "../../../core/navigation/NavigationService";
import { useSongById } from "../hooks/useSong";
import { Song } from "../types/Song.type";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SongCard = ({ song }: { song: Song }) => {
  const navigation = useNavigation<NavigationProp>();
  const { getSongById } = useSongById();

  const calculateProgress = () => {
    if (song.learningLog?.is_completed) return 100;
    if (!song.learningLog?.last_position_seconds || !song.duration) return 0;
    return Math.min(
      Math.round(
        (song.learningLog.last_position_seconds / song.duration) * 100,
      ),
      100,
    );
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = calculateProgress();

  const handlePress = async () => {
    const fullSong = await getSongById(song.mini_song_id);
    if (fullSong) {
      navigation.navigate("DetailPlay", { song: fullSong });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handlePress}
      className="mb-5"
    >
      <View className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-200">
        <View className="relative">
          <Image
            source={{ uri: song.thumbnail }}
            className="h-[150px] w-full"
            resizeMode="cover"
          />
          {song.category && (
            <View className="absolute right-3 top-3 rounded-full bg-orange-400 px-3 py-1">
              <Text className="text-[11px] font-semibold text-white">
                {song.category}
              </Text>
            </View>
          )}
        </View>
        <View className="px-4 py-3">
          <View className="flex-row items-center justify-between">
            <Text
              className="flex-1 pr-2 text-[15px] font-bold text-gray-900"
              numberOfLines={2}
            >
              {song.title}
            </Text>
            {song.learningLog?.is_completed && (
              <Ionicons name="checkmark-circle" size={20} color="#34D399" />
            )}
          </View>

          <Text className="mt-2 text-xs text-gray-400">
            ⏱ {formatDuration(song.duration)} ·{" "}
            <Text className="font-semibold text-orange-500">
              {song.views} views
            </Text>
          </Text>
        </View>
        <View className="flex-row items-center gap-4 px-4 py-3">
          <View className="flex-1">
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: "#FFB500",
                }}
              />
            </View>
          </View>
          <Text className="font-bold text-black text-sm">
            {progressPercent}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
