import { RouteProp, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Play } from "lucide-react-native";
import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  AppState,
  TouchableOpacity,
  ScrollView,
  FlatList,
  LayoutChangeEvent,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import { CircleIcon } from "../../../core/components/CircleIcon";
import HeaderChild from "../../../core/components/ScreenHeader";
import SuccessModal from "../../../core/components/SuccessModal";
import { RootStackParamList } from "../../../core/navigation/NavigationService";
import { SongsService } from "../services/SongService";

type DetailPlayRouteProp = RouteProp<RootStackParamList, "DetailPlay">;

export default function SongDetailPlayScreen() {
  const router = useRouter();
  const route = useRoute<DetailPlayRouteProp>();
  const { song } = route.params;
  const [playing, setPlaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalWatchTime, setTotalWatchTime] = useState(0);
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const playerRef = useRef<any>(null);
  const listRef = useRef<FlatList>(null);

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    );
    return match ? match[1] : "";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing && playerRef.current) {
        playerRef.current.getCurrentTime().then((time: number) => {
          setCurrentTime(time);
          const currentLyricIndex =
            song.song_lyrics?.findIndex((lyric, index) => {
              const nextLyric = song.song_lyrics?.[index + 1];
              return (
                lyric.start_time !== null &&
                time >= lyric.start_time &&
                (!nextLyric ||
                  nextLyric.start_time === null ||
                  time < nextLyric.start_time)
              );
            }) ?? -1;

          if (
            currentLyricIndex !== -1 &&
            currentLyricIndex !== activeLyricIndex
          ) {
            setActiveLyricIndex(currentLyricIndex);
          }
        });
      }
    }, 500);
    return () => clearInterval(interval);
  }, [playing, activeLyricIndex, song.song_lyrics]);

  useEffect(() => {
    if (!listRef.current || itemHeight === 0 || !song.song_lyrics) return;
    const totalItems = song.song_lyrics.length;
    const visibleItems = Math.floor(320 / itemHeight);
    const middlePosition = Math.floor(visibleItems / 2);
    let scrollToIndex = activeLyricIndex - middlePosition;
    scrollToIndex = Math.max(
      0,
      Math.min(scrollToIndex, totalItems - visibleItems),
    );

    if (activeLyricIndex >= middlePosition) {
      listRef.current.scrollToIndex({
        index: scrollToIndex,
        animated: true,
        viewPosition: 0,
      });
    }
  }, [activeLyricIndex, itemHeight, song.song_lyrics]);

  useEffect(() => {
    if (playing) {
      startTimeRef.current = Date.now();
    } else if (startTimeRef.current) {
      const watchTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTotalWatchTime((prev) => prev + watchTime);
    }
  }, [playing]);

  const updateLearningLog = async (isCompleted: boolean) => {
    if (!song.learningLogId || totalWatchTime === 0) return;
    try {
      await SongsService.updateLearningLog(
        song.learningLogId.toString(),
        totalWatchTime,
        Math.floor(currentTime),
        isCompleted,
      );
    } catch (error) {
      console.error("Failed to update learning log:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (totalWatchTime > 0) {
        updateLearningLog(false);
      }
    };
  }, [totalWatchTime, currentTime]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "background" && totalWatchTime > 0) {
        updateLearningLog(false);
      }
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );
    return () => subscription?.remove();
  }, [totalWatchTime, currentTime]);

  const seekToLyric = (startTime: number | null) => {
    if (playerRef.current && startTime !== null) {
      playerRef.current.seekTo(startTime, true);
      setPlaying(true);
    }
  };

  const onStateChange = (state: string) => {
    if (state === "playing") {
      setPlaying(true);
    } else if (state === "paused") {
      setPlaying(false);
      if (totalWatchTime > 0) {
        updateLearningLog(false);
      }
    } else if (state === "ended") {
      setPlaying(false);
      updateLearningLog(true);
      setShowSuccess(true);
    }
  };

  const handleBackPress = () => {
    if (playing && startTimeRef.current) {
      const watchTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const updatedTotalTime = totalWatchTime + watchTime;

      if (updatedTotalTime > 0) {
        SongsService.updateLearningLog(
          song.learningLogId?.toString() || "",
          updatedTotalTime,
          Math.floor(currentTime),
          false,
        ).finally(() => router.back());
      } else {
        router.back();
      }
    } else if (totalWatchTime > 0) {
      updateLearningLog(false).finally(() => router.back());
    } else {
      router.back();
    }
  };

  const handleItemLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (!itemHeight) {
      setItemHeight(height);
    }
  };

  const renderLyric = ({ item, index }: any) => {
    const isActive = index === activeLyricIndex;
    return (
      <TouchableOpacity
        onPress={() => seekToLyric(item.start_time)}
        className={`flex-row items-center justify-between rounded-xl px-4 py-3 mb-3 ${
          isActive
            ? "bg-orange-100 border-2 border-orange-300"
            : "bg-white opacity-60"
        } shadow-sm`}
        onLayout={index === 0 ? handleItemLayout : undefined}
      >
        <View className="flex-1 pr-3">
          <Text
            className={`font-semibold text-sm ${
              isActive ? "text-orange-600" : "text-gray-700"
            }`}
          >
            {item.lyric_text}
          </Text>
          <Text
            className={`text-xs mt-1 ${
              isActive ? "text-orange-500" : "text-gray-400"
            }`}
          >
            {item.phonetic}
          </Text>
        </View>
        <CircleIcon
          icon={Play}
          size={36}
          iconSize={16}
          backgroundColor={isActive ? "#FB923C" : "#22C55E"}
          onPress={() => seekToLyric(item.start_time)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#F5F6FA]">
      <View className="mx-4 mt-4 pt-4">
        <HeaderChild
          title="Song"
          subtitle="Let's sing together 🎵"
          showBack
          onBackPress={handleBackPress}
        />
      </View>

      <ScrollView
        className="px-4 mt-2 -mb-2"
        showsVerticalScrollIndicator={false}
      >
        <View className="relative mb-4 overflow-hidden rounded-2xl bg-white shadow-md">
          <YoutubePlayer
            ref={playerRef}
            height={220}
            play={playing}
            videoId={getYouTubeVideoId(song.video_url)}
            onChangeState={onStateChange}
          />
        </View>

        <Text className="text-lg font-bold mb-3">{song.title}</Text>

        <FlatList
          ref={listRef}
          data={song.song_lyrics}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLyric}
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: 320 }}
          extraData={activeLyricIndex}
          getItemLayout={(data, index) => ({
            length: itemHeight || 110,
            offset: (itemHeight || 110) * index,
            index,
          })}
        />
      </ScrollView>

      <SuccessModal
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </View>
  );
}
