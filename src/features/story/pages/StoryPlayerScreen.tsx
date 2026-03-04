import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  PanResponder,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import {
  ChevronLeft,
  Play,
  Pause,
  Bookmark,
  CheckCircle,
} from "lucide-react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Audio, AVPlaybackStatus } from "expo-av";

import { ExperienceStackParamList } from "@/src/core/navigation/NavigationService";
import { useStories } from "@/src/features/story/hooks/useStories";
import { useStorySegments } from "@/src/features/story/hooks/useStorySegments";

const FALLBACK_IMAGE = require("@/public/assets/images/imgStory.png");

type StoryPlayerRouteProp = RouteProp<ExperienceStackParamList, "StoryPlayer">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH - 48;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;

export default function StoryPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute<StoryPlayerRouteProp>();
  const { storyId } = route.params;

  const { stories, loading: storiesLoading } = useStories();
  const story = useMemo(
    () => stories.find((s) => s.story_id === storyId),
    [stories, storyId],
  );
  const { segments } = useStorySegments(story);

  const title = story?.title ?? "";

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [segmentPositionMs, setSegmentPositionMs] = useState(0);
  const [segmentDurationsMs, setSegmentDurationsMs] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const segIndexRef = useRef(0);
  const barWidthRef = useRef(0);
  const barPageXRef = useRef(0);

  const currentSegment = segments[currentSegmentIndex];
  const isLastSegment = currentSegmentIndex === segments.length - 1;

  const totalDurationMs = useMemo(
    () => segmentDurationsMs.reduce((sum, d) => sum + d, 0),
    [segmentDurationsMs],
  );

  const segmentOffsets = useMemo(() => {
    const offsets: number[] = [];
    let acc = 0;
    for (const d of segmentDurationsMs) {
      offsets.push(acc);
      acc += d;
    }
    return offsets;
  }, [segmentDurationsMs]);

  const globalPositionMs =
    (segmentOffsets[currentSegmentIndex] ?? 0) + segmentPositionMs;

  const totalSeconds = Math.round(totalDurationMs / 1000);
  const currentTime = Math.round(globalPositionMs / 1000);

  // Preload all segment durations on mount
  useEffect(() => {
    if (segments.length === 0) return;
    let cancelled = false;

    const preload = async () => {
      const durations: number[] = [];
      for (const seg of segments) {
        if (!seg.audio_url) {
          durations.push(0);
          continue;
        }
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: seg.audio_url },
            { shouldPlay: false },
          );
          const status = await sound.getStatusAsync();
          durations.push(status.isLoaded ? (status.durationMillis ?? 0) : 0);
          await sound.unloadAsync();
        } catch {
          durations.push(0);
        }
      }
      if (!cancelled) {
        setSegmentDurationsMs(durations);
        setAudioReady(true);
      }
    };

    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    preload();
    return () => {
      cancelled = true;
    };
  }, [segments]);

  const loadFnRef =
    useRef<
      (index: number, autoPlay: boolean, startAtMs?: number) => Promise<void>
    >();

  const loadAndPlaySegment = useCallback(
    async (index: number, autoPlay: boolean, startAtMs = 0) => {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const seg = segments[index];
      if (!seg?.audio_url) return;

      segIndexRef.current = index;
      setCurrentSegmentIndex(index);
      setSegmentPositionMs(startAtMs);

      const { sound } = await Audio.Sound.createAsync(
        { uri: seg.audio_url },
        { shouldPlay: autoPlay, positionMillis: startAtMs },
        (status: AVPlaybackStatus) => {
          if (!status.isLoaded) return;
          setSegmentPositionMs(status.positionMillis);

          if (status.didJustFinish) {
            const nextIdx = segIndexRef.current + 1;
            if (nextIdx < segments.length) {
              loadFnRef.current?.(nextIdx, true);
            } else {
              setIsPlaying(false);
            }
          }
        },
      );
      soundRef.current = sound;
      if (autoPlay) setIsPlaying(true);
    },
    [segments],
  );

  useEffect(() => {
    loadFnRef.current = loadAndPlaySegment;
  }, [loadAndPlaySegment]);

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const togglePlay = async () => {
    if (!soundRef.current) {
      await loadAndPlaySegment(0, true);
      return;
    }

    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) return;

    if (status.didJustFinish && isLastSegment) {
      setSegmentPositionMs(0);
      await loadAndPlaySegment(0, true);
      return;
    }

    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const seekToGlobalPosition = useCallback(
    async (pageX: number) => {
      if (totalDurationMs === 0) return;
      const x = pageX - barPageXRef.current;
      const clamped = Math.max(0, Math.min(x, barWidthRef.current));
      const ratio = barWidthRef.current > 0 ? clamped / barWidthRef.current : 0;
      const targetMs = Math.round(ratio * totalDurationMs);

      let targetSegIdx = 0;
      for (let i = segmentOffsets.length - 1; i >= 0; i--) {
        if (targetMs >= segmentOffsets[i]) {
          targetSegIdx = i;
          break;
        }
      }
      const offsetInSegment = targetMs - segmentOffsets[targetSegIdx];

      if (targetSegIdx === currentSegmentIndex && soundRef.current) {
        await soundRef.current.setPositionAsync(offsetInSegment);
        setSegmentPositionMs(offsetInSegment);
      } else {
        await loadAndPlaySegment(targetSegIdx, isPlaying, offsetInSegment);
        setSegmentPositionMs(offsetInSegment);
      }
    },
    [
      totalDurationMs,
      segmentOffsets,
      currentSegmentIndex,
      isPlaying,
      loadAndPlaySegment,
    ],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt: GestureResponderEvent) => {
          seekToGlobalPosition(evt.nativeEvent.pageX);
        },
        onPanResponderMove: (evt: GestureResponderEvent) => {
          seekToGlobalPosition(evt.nativeEvent.pageX);
        },
      }),
    [seekToGlobalPosition],
  );

  const progressPercent =
    totalDurationMs > 0 ? (globalPositionMs / totalDurationMs) * 100 : 0;

  if (storiesLoading || (!audioReady && segments.length > 0)) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#FFB500" />
      </View>
    );
  }

  if (!currentSegment) return null;

  const segmentImage = currentSegment.image_url
    ? { uri: currentSegment.image_url }
    : FALLBACK_IMAGE;

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="py-4">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <ChevronLeft size={24} color="#1C2B6D" />
              <View className="ml-1">
                <Text className="text-xl font-bold text-[#1C2B6D]">Story</Text>
                <Text className="text-xs text-gray-400">
                  Let&apos;s enjoy the story!
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-10 h-10 rounded-xl bg-[#FF6B8A] items-center justify-center"
              activeOpacity={0.8}
            >
              <Bookmark size={20} color="#fff" fill="#fff" />
            </TouchableOpacity>
          </View>

          <View className="mx-6 mb-5 items-center">
            <View
              className="rounded-2xl overflow-hidden border-4 border-[#E8D5B0]"
              style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
            >
              <Image
                source={segmentImage}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          </View>

          <View className="items-center mb-4 px-6">
            <Text
              className="text-2xl font-extrabold text-[#1C2B6D] text-center"
              style={{ fontStyle: "italic" }}
            >
              {title}
            </Text>
          </View>

          <View className="mx-6 mb-6">
            <View
              className="rounded-2xl px-5 py-6"
              style={{
                backgroundColor: "#FFF8EE",
                borderWidth: 2,
                borderColor: "#E8D5B0",
              }}
            >
              <Text className="text-base text-gray-800 leading-7 text-center">
                {currentSegment.content_text}
              </Text>
            </View>

            <View className="flex-row justify-center mt-3 gap-2">
              {segments.map((_, idx) => (
                <View
                  key={idx}
                  className={`h-2 rounded-full ${
                    idx === currentSegmentIndex
                      ? "bg-[#4CAF50] w-6"
                      : "bg-gray-300 w-2"
                  }`}
                />
              ))}
            </View>
          </View>

          <View className="mx-6 mb-4">
            <View
              className="rounded-2xl px-5 py-5"
              style={{
                backgroundColor: "#C8A84E",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <View className="items-center mb-4">
                <TouchableOpacity
                  onPress={togglePlay}
                  activeOpacity={0.7}
                  className="w-16 h-16 rounded-full bg-[#4CAF50] items-center justify-center"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 4,
                  }}
                >
                  {isPlaying ? (
                    <Pause size={28} color="#fff" fill="#fff" />
                  ) : (
                    <Play
                      size={28}
                      color="#fff"
                      fill="#fff"
                      style={{ marginLeft: 3 }}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center gap-2">
                <Text className="text-xs text-white font-semibold w-10 text-center">
                  {formatTime(currentTime)}
                </Text>

                <View
                  className="flex-1 h-3 bg-[#A88A3D] rounded-full"
                  onLayout={(e) => {
                    barWidthRef.current = e.nativeEvent.layout.width;
                  }}
                  ref={(ref) => {
                    ref?.measureInWindow((x) => {
                      barPageXRef.current = x;
                    });
                  }}
                  {...panResponder.panHandlers}
                >
                  <View
                    className="h-full bg-white rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <View
                    className="absolute top-1/2 w-5 h-5 rounded-full bg-white"
                    style={{
                      left: `${progressPercent}%`,
                      marginLeft: -10,
                      marginTop: -10,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.3,
                      shadowRadius: 2,
                      elevation: 3,
                    }}
                  />
                </View>

                <Text className="text-xs text-white font-semibold w-10 text-center">
                  {formatTime(totalSeconds)}
                </Text>
              </View>
            </View>
          </View>

          {isLastSegment && (
            <View className="mx-6 mb-4">
              <TouchableOpacity
                onPress={async () => {
                  if (soundRef.current) await soundRef.current.unloadAsync();
                  soundRef.current = null;
                  setIsPlaying(false);
                  setIsCompleted(true);
                }}
                activeOpacity={0.8}
                className="bg-[#4CAF50] rounded-full py-4 flex-row items-center justify-center gap-2"
              >
                <CheckCircle size={22} color="#fff" />
                <Text className="text-white font-bold text-base">
                  Complete Story
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {isCompleted && (
        <View className="absolute inset-0 bg-[#EEF0F8] items-center justify-center px-8">
          <Text className="text-4xl absolute top-20 left-8">⭐</Text>
          <Text className="text-2xl absolute top-28 right-12">✨</Text>
          <Text className="text-3xl absolute top-16 right-6">⭐</Text>
          <Text className="text-xl absolute top-36 left-16">✨</Text>

          <View className="items-center mb-8">
            <View
              className="w-44 h-44 rounded-full items-center justify-center"
              style={{
                backgroundColor: "#D8C4F0",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <View className="w-36 h-36 rounded-full bg-[#E8D8F4] items-center justify-center">
                <Text className="text-5xl mb-1">🐉</Text>
                <View className="bg-[#F4A623] rounded-full px-4 py-1.5 mt-1">
                  <Text className="text-white font-extrabold text-xs tracking-wider">
                    COMPLETED!
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text className="text-2xl absolute top-60 left-6">⭐</Text>
          <Text className="text-lg absolute top-64 right-10">⭐</Text>

          <Text
            className="text-3xl font-extrabold text-[#1C2B6D] text-center mb-1"
            style={{ fontStyle: "italic" }}
          >
            Congratulations
          </Text>
          <Text
            className="text-3xl font-extrabold text-[#1C2B6D] text-center mb-8"
            style={{ fontStyle: "italic" }}
          >
            You finished
          </Text>

          <View className="mb-10">
            <Text className="text-6xl">📖</Text>
          </View>

          <View className="bg-white/60 rounded-2xl px-6 py-3 mb-8">
            <Text className="text-lg font-bold text-[#1C2B6D] text-center">
              {title}
            </Text>
          </View>

          <View className="w-full gap-3">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
              className="bg-[#4CAF50] rounded-full py-4 items-center"
            >
              <Text className="text-white font-bold text-base">
                Back to Stories
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                setIsCompleted(false);
                setSegmentPositionMs(0);
                await loadAndPlaySegment(0, false);
              }}
              activeOpacity={0.7}
              className="bg-white rounded-full py-4 items-center border border-gray-200"
            >
              <Text className="text-[#1C2B6D] font-bold text-base">
                Read Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
