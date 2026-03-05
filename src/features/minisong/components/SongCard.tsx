import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { MiniSongStackParamList } from "../routes/SongRoute";
import { Song } from "../types/Song.type";

type NavigationProp = NativeStackNavigationProp<
  MiniSongStackParamList,
  "Songs"
>;

export const SongCard = ({ song }: { song: Song }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate("SongDetail", { song })}
      className="mb-5"
    >
      <View className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <View className="relative">
          <Image
            source={song.thumbnail}
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

            <Ionicons name="heart-outline" size={18} color="#9CA3AF" />
          </View>

          <Text className="mt-2 text-xs text-gray-400">
            ⏱ {song.duration} ·{" "}
            <Text className="font-semibold text-orange-500">{song.views}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
