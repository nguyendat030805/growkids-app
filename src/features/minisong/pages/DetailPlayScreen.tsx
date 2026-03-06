import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import { Play } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import { CircleIcon } from "../../../core/components/CircleIcon";
import HeaderChild from "../../../core/components/ScreenHeader";
import SuccessModal from "../../../core/components/SuccessModal";
import { RootStackParamList } from "../../../core/navigation/NavigationService";

type DetailPlayRouteProp = RouteProp<RootStackParamList, "DetailPlay">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SongDetailPlayScreen() {
  const router = useRouter();
  const route = useRoute<DetailPlayRouteProp>();
  const { song } = route.params;
  const [playing, setPlaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    );
    return match ? match[1] : "";
  };

  const onStateChange = (state: string) => {
    if (state === "ended") {
      setShowSuccess(true);
    }
  };

  return (
    <View className="flex-1 bg-[#F5F6FA]">
      <View className="mx-4 mt-4">
        <HeaderChild
          title="Song"
          subtitle="Let's sing together 🎵"
          showBack
          onBackPress={() => router.back()}
        />
      </View>

      <ScrollView className="px-4 mt-2" showsVerticalScrollIndicator={false}>
        <View className="relative mb-4 overflow-hidden rounded-2xl bg-white shadow-md">
          <YoutubePlayer
            height={220}
            play={playing}
            videoId={getYouTubeVideoId(song.video_url)}
            onChangeState={onStateChange}
          />
        </View>

        <Text className="text-lg font-bold mb-3">{song.title}</Text>

        {song.song_lyrics?.map((item, index) => (
          <View
            key={item.id}
            className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3 mb-3 shadow-sm"
          >
            <View className="flex-1 pr-3">
              <Text className="font-semibold text-sm">{item.lyric_text}</Text>
              <Text className="text-xs text-orange-500 mt-1">
                {item.phonetic}
              </Text>
            </View>

            <CircleIcon
              icon={Play}
              size={36}
              iconSize={16}
              backgroundColor="#22C55E"
            />
          </View>
        ))}
      </ScrollView>

      <SuccessModal
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </View>
  );
}
