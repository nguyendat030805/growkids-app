import { useRouter } from "expo-router";
import { Play } from "lucide-react-native";
import { useState, useCallback } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import { CircleIcon } from "../../../core/components/CircleIcon";
import HeaderChild from "../../../core/components/ScreenHeader";
import { headShouldersLyrics } from "../data/headShoulders.lyrics";

export default function SongDetailPlayScreen() {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const onStateChange = useCallback(
    (state: string) => {
      if (state === "ended") {
        setPlaying(false);
        setHasEnded(true);

        setTimeout(() => {
          router.replace("/minisong/Completed");
        }, 300);
      }
    },
    [router],
  );

  return (
    <View className="flex-1 bg-[#F5F6FA]">
      <View className="mx-4 mt-4">
        <HeaderChild
          title="Song"
          subtitle="Let’s sing together 🎵"
          showBack
          onBackPress={() => router.back()}
        />
      </View>

      <ScrollView className="px-4 mt-2" showsVerticalScrollIndicator={false}>
        {/* Video */}
        <View className="relative mb-4 overflow-hidden rounded-2xl bg-white shadow-md">
          <YoutubePlayer
            height={220}
            play={playing}
            videoId="WX8HmogNyCY"
            onChangeState={onStateChange}
          />

          {!playing && (
            <Pressable
              onPress={() => setPlaying(true)}
              className="absolute inset-0 items-center justify-center"
            >
              <View className="w-14 h-14 rounded-full bg-black/60 items-center justify-center">
                <Text className="text-white text-xl">▶</Text>
              </View>
            </Pressable>
          )}
        </View>

        {/* Title */}
        <Text className="text-lg font-bold mb-3">
          Head Shoulders Knees And Toes
        </Text>

        {/* Lyrics */}
        {headShouldersLyrics.map((item, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3 mb-3 shadow-sm"
          >
            <View className="flex-1 pr-3">
              <Text className="font-semibold text-sm">{item.title}</Text>
              <Text className="text-xs text-orange-500 mt-1">{item.sub}</Text>
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
    </View>
  );
}
