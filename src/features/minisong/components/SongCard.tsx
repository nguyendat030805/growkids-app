import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Song } from "../types/Song";

export const SongCard = ({ song }: { song: Song }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        router.push({
          pathname: "/minisong/song-detail",
          params: {
            song: JSON.stringify(song),
          },
        })
      }
      className="mb-6"
    >
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {/* Image */}
        <Image
          source={song.thumbnail}
          className="w-full h-[150px]"
          resizeMode="cover"
        />

        {/* Badge */}
        <View className="absolute top-3 right-3 bg-orange-400 px-3 py-1 rounded-full">
          <Text className="text-white text-[11px] font-semibold">
            {song.category}
          </Text>
        </View>

        {/* Content */}
        <View className="p-3">
          <View className="flex-row items-center justify-between">
            <Text
              className="flex-1 text-[15px] font-bold mr-2"
              numberOfLines={2}
            >
              {song.title}
            </Text>
            <Ionicons name="heart-outline" size={20} color="#888" />
          </View>

          <Text className="mt-2 text-xs text-gray-500">
            {song.duration} ·{" "}
            <Text className="text-orange-500 font-semibold">{song.views}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
