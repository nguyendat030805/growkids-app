import { ArrowUp } from "lucide-react-native";
import {
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import HeaderChild from "../../../core/components/HeaderChild";
import { SongCard } from "../components/SongCard";
import { useSongs } from "../hooks/useSongs";

const SongsPage = () => {
  const { songs, loading } = useSongs();

  if (loading) {
    return <Text className="mt-10 text-center text-gray-500">Loading...</Text>;
  }

  return (
    <View className="flex-1 bg-[#F5F6FA]">
      <View className="mx-4 mt-4">
        <HeaderChild
          title="Songs"
          subtitle="Let’s enjoy the music!"
          showBack={true}
        />
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-2 border border-black-100 shadow-sm">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-sm"
          />
          <TouchableOpacity className="ml-2 bg-green-500 rounded-full p-2">
            <ArrowUp size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        className="mt-4"
        data={songs}
        keyExtractor={(item) => item.id.toString()}
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

export default SongsPage;
