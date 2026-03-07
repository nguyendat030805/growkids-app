import { useFocusEffect } from "@react-navigation/native";
import { Search } from "lucide-react-native";
import { useCallback } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import HeaderChild from "../../../core/components/ScreenHeader";
import { SongCard } from "../components/SongCard";
import { useSongs } from "../hooks/useSong";

const MiniSongScreen = () => {
  const { songs, loading, refetch, searchQuery, setSearchQuery } = useSongs();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F5F6FA]">
        <ActivityIndicator size="large" color="#FFB800" />
        <Text className="mt-3 text-amber-500 font-bold">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="mx-4 mt-4">
        <HeaderChild
          title="Songs"
          subtitle="Let’s enjoy the music!"
          showBack={true}
        />
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-2 border border-gray-300 shadow-sm mt-1">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-sm"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity className="ml-2 bg-green-500 rounded-full p-2">
            <Search size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        className="mt-4"
        data={songs}
        keyExtractor={(item) => item.mini_song_id.toString()}
        renderItem={({ item }) => <SongCard song={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      />
    </View>
  );
};

export default MiniSongScreen;
