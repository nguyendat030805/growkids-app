import { RouteProp, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Play } from "lucide-react-native";
import { useState, useEffect, useRef, useMemo } from "react";
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
import { QuizModal } from "../components/QuizModal";

type DetailPlayRouteProp = RouteProp<RootStackParamList, "DetailPlay">;

export default function SongDetailPlayScreen() {
  const router = useRouter();
  const route = useRoute<DetailPlayRouteProp>();
  const { song: initialSong } = route.params;

  const [song, setSong] = useState(initialSong);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<any>(null);
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalWatchTime, setTotalWatchTime] = useState(0);
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);

  const startTimeRef = useRef<number>(Date.now());
  const playerRef = useRef<any>(null);
  const listRef = useRef<FlatList>(null);
  const isLocked = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fullData = await SongsService.getSongById(
          initialSong.mini_song_id,
        );
        setSong(fullData);
      } catch (e) {
        console.error("Load data error:", e);
      }
    };
    loadData();
  }, []);

  const videoId = useMemo(() => {
    const match = song.video_url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    );
    return match ? match[1] : "";
  }, [song.video_url]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!playing || showQuiz || isLocked.current || !playerRef.current)
        return;

      try {
        const time: number = await playerRef.current.getCurrentTime();
        const roundTime = Math.floor(time);

        const question = song.questions?.find(
          (q: any) =>
            Math.floor(q.start_time) === roundTime &&
            !answeredIds.includes(q.question_id),
        );

        if (question) {
          isLocked.current = true;
          playerRef.current?.pauseVideo?.();
          setPlaying(false);
          setActiveQuestion(question);
          setShowQuiz(true);
          return;
        }

        setCurrentTime(time);
        const index = song.song_lyrics?.findIndex((lyric, idx) => {
          const nextLyric = song.song_lyrics?.[idx + 1];
          return (
            time >= (lyric.start_time ?? 0) &&
            (!nextLyric || time < (nextLyric.start_time ?? 999))
          );
        });

        if (index !== undefined && index !== -1 && index !== activeLyricIndex) {
          setActiveLyricIndex(index);
        }
      } catch (error) {
        console.log("Interval logic error:", error);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [playing, song, answeredIds, showQuiz, activeLyricIndex]);

  useEffect(() => {
    if (!listRef.current || itemHeight === 0 || !song.song_lyrics) return;
    listRef.current.scrollToIndex({
      index: activeLyricIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [activeLyricIndex, itemHeight]);

  useEffect(() => {
    if (playing) {
      startTimeRef.current = Date.now();
    } else if (startTimeRef.current) {
      const sessionTime = Math.floor(
        (Date.now() - startTimeRef.current) / 1000,
      );
      setTotalWatchTime((prev) => prev + sessionTime);
    }
  }, [playing]);

  const updateLearningLog = async (isCompleted: boolean) => {
    if (!song.learningLogId) return;
    const sessionTime = playing
      ? Math.floor((Date.now() - startTimeRef.current) / 1000)
      : 0;
    const finalWatchTime = totalWatchTime + sessionTime;

    if (finalWatchTime === 0) return;

    try {
      await SongsService.updateLearningLog(
        song.learningLogId.toString(),
        finalWatchTime,
        Math.floor(currentTime),
        isCompleted,
      );
    } catch (error) {
      console.error("Failed to update log:", error);
    }
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState !== "active") {
        updateLearningLog(false);
      }
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, [totalWatchTime, currentTime]);

  const onStateChange = (state: string) => {
    if (showQuiz || isLocked.current) {
      if (state === "playing" || state === "buffering") {
        playerRef.current?.pauseVideo?.();
        setPlaying(false);
      }
      return;
    }

    if (state === "playing") {
      setPlaying(true);
    } else if (state === "paused") {
      setPlaying(false);
      updateLearningLog(false);
    } else if (state === "ended") {
      setPlaying(false);
      updateLearningLog(true);
      setShowSuccess(true);
    }
  };

  const handleCorrectAnswer = () => {
    if (activeQuestion) {
      setAnsweredIds((prev) => [...prev, activeQuestion.question_id]);
    }
    setTimeout(() => {
      isLocked.current = false;
      setShowQuiz(false);
      setPlaying(true);
    }, 1200);
  };

  const handleBackPress = async () => {
    await updateLearningLog(false);
    router.back();
  };

  const handleItemLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (!itemHeight) setItemHeight(height);
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
            videoId={videoId}
            onChangeState={onStateChange}
          />
        </View>

        <Text className="text-lg font-bold mb-3">{song.title}</Text>

        <FlatList
          ref={listRef}
          data={song.song_lyrics}
          keyExtractor={(item, idx) => idx.toString()}
          extraData={activeLyricIndex}
          getItemLayout={(data, index) => ({
            length: itemHeight || 90,
            offset: (itemHeight || 90) * index,
            index,
          })}
          renderItem={({ item, index }) => {
            const isActive = index === activeLyricIndex;
            return (
              <TouchableOpacity
                onPress={() => {
                  playerRef.current?.seekTo(item.start_time, true);
                  setPlaying(true);
                }}
                onLayout={index === 0 ? handleItemLayout : undefined}
                className={`flex-row items-center justify-between rounded-xl px-4 py-3 mb-3 ${isActive ? "bg-orange-100 border-2 border-orange-300" : "bg-white opacity-60"} shadow-sm`}
              >
                <View className="flex-1 pr-3">
                  <Text
                    className={`font-semibold text-sm ${isActive ? "text-orange-600" : "text-gray-700"}`}
                  >
                    {item.lyric_text}
                  </Text>
                  <Text
                    className={`text-xs mt-1 ${isActive ? "text-orange-500" : "text-gray-400"}`}
                  >
                    {item.phonetic}
                  </Text>
                </View>
                <CircleIcon
                  icon={Play}
                  size={36}
                  iconSize={16}
                  backgroundColor={isActive ? "#FB923C" : "#22C55E"}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>

      <QuizModal
        visible={showQuiz}
        question={activeQuestion}
        onCorrect={handleCorrectAnswer}
        onClose={() => {
          isLocked.current = false;
          setShowQuiz(false);
          setPlaying(true);
        }}
      />

      <SuccessModal
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </View>
  );
}
