import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
  PanResponder,
  GestureResponderEvent,
} from "react-native";
import {
  ChevronLeft,
  Play,
  Pause,
  Bookmark,
  CheckCircle,
} from "lucide-react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "@/src/core/navigation/NavigationService";
import { BottomMenu } from "@/src/core/pages/BottomMenu";
import { Header } from "@/src/core/pages/Header";

type StoryPlayerRouteProp = RouteProp<RootStackParamList, "StoryPlayer">;

interface StorySegment {
  text: string;
  image: ImageSourcePropType;
  startTime: number;
  endTime: number;
}

const STORY_SEGMENTS: Record<number, StorySegment[]> = {
  1: [
    {
      text: "Once upon a time, a tiny mouse was playing in the forest. A big lion was sleeping nearby under a large tree.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 30,
    },
    {
      text: "The mouse accidentally ran across the lion's nose and woke him up! The lion caught the mouse, but the mouse begged for mercy.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 30,
      endTime: 60,
    },
    {
      text: 'The lion laughed and let the mouse go. "You are too small to be my meal," he said kindly.',
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 60,
      endTime: 80,
    },
    {
      text: "Later, the lion was caught in a hunter's net. The tiny mouse heard his roar and came running to help.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 80,
      endTime: 100,
    },
    {
      text: "She gnawed through the ropes and set the lion free. From that day on, they became the best of friends.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 100,
      endTime: 120,
    },
  ],
  2: [
    {
      text: "In a small village, there was a garden that bloomed only at night. No one knew why.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 30,
    },
    {
      text: "A curious girl named Lily discovered it one evening. The flowers glowed with golden light.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 30,
      endTime: 60,
    },
    {
      text: "Lily learned that the garden grew brighter when someone did a good deed. She started helping everyone in the village.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 60,
      endTime: 90,
    },
  ],
  3: [
    {
      text: "Once there was a sweet little girl who always wore a red riding hood. Everyone in the village loved her.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 37,
    },
    {
      text: "One day, her mother asked her to take food to her grandmother who lived in the woods.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 37,
      endTime: 75,
    },
    {
      text: "On the way through the forest, she met a cunning wolf. The wolf tricked her and ran ahead.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 75,
      endTime: 112,
    },
    {
      text: "But a brave woodcutter saved them both. Red Riding Hood learned to always stay on the safe path.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 112,
      endTime: 150,
    },
  ],
  4: [
    {
      text: "A little bird fell from its nest during a storm. It was cold and afraid.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 27,
    },
    {
      text: "A kind boy named Tom found it shivering under a bush. He carefully picked it up and made a warm nest.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 27,
      endTime: 54,
    },
    {
      text: "Soon the bird was strong enough to fly again. It sang a beautiful song for Tom before flying home.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 54,
      endTime: 80,
    },
  ],
  5: [
    {
      text: "A little bird fell from its nest during a storm. It was cold and afraid.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 27,
    },
    {
      text: "A kind boy named Tom found it shivering under a bush. He carefully picked it up and made a warm nest.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 27,
      endTime: 54,
    },
    {
      text: "Soon the bird was strong enough to fly again. It sang a beautiful song for Tom before flying home.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 54,
      endTime: 80,
    },
  ],
  6: [
    {
      text: "Bunny was lost in the big meadow. He hopped left and right but could not find his home.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 20,
    },
    {
      text: "A friendly squirrel offered to help. Together they crossed the stream and passed the tall oak tree.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 20,
      endTime: 40,
    },
    {
      text: "Finally, they found the cozy burrow under the hill. Bunny was so happy he shared his carrots with his new friend.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 40,
      endTime: 60,
    },
  ],
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH - 48;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;

export default function StoryPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute<StoryPlayerRouteProp>();
  const { storyId, title, duration } = route.params;

  const totalSeconds = useMemo(() => {
    const num = parseInt(duration, 10);
    return isNaN(num) ? 60 : num;
  }, [duration]);

  const segments = useMemo(() => STORY_SEGMENTS[storyId] ?? [], [storyId]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const barWidthRef = useRef(0);
  const barPageXRef = useRef(0);

  const currentSegmentIndex = useMemo(() => {
    for (let i = segments.length - 1; i >= 0; i--) {
      if (currentTime >= segments[i].startTime) return i;
    }
    return 0;
  }, [currentTime, segments]);

  const currentSegment = segments[currentSegmentIndex];
  const isLastSegment = currentSegmentIndex === segments.length - 1;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSeconds]);

  const togglePlay = () => {
    if (currentTime >= totalSeconds) {
      setCurrentTime(0);
    }
    setIsPlaying((prev) => !prev);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const seekToPosition = useCallback(
    (pageX: number) => {
      const x = pageX - barPageXRef.current;
      const clamped = Math.max(0, Math.min(x, barWidthRef.current));
      const ratio = barWidthRef.current > 0 ? clamped / barWidthRef.current : 0;
      setCurrentTime(Math.round(ratio * totalSeconds));
    },
    [totalSeconds],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt: GestureResponderEvent) => {
          seekToPosition(evt.nativeEvent.pageX);
        },
        onPanResponderMove: (evt: GestureResponderEvent) => {
          seekToPosition(evt.nativeEvent.pageX);
        },
      }),
    [seekToPosition],
  );

  const progressPercent =
    totalSeconds > 0 ? (currentTime / totalSeconds) * 100 : 0;

  if (!currentSegment) return null;

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="py-4">
          <View className="px-0">
            <Header />
          </View>

          {/* Sub Header */}
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

          {/* Story Illustration - changes per segment */}
          <View className="mx-6 mb-5 items-center">
            <View
              className="rounded-2xl overflow-hidden border-4 border-[#E8D5B0]"
              style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
            >
              <Image
                source={currentSegment.image}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Story Title */}
          <View className="items-center mb-4 px-6">
            <Text
              className="text-2xl font-extrabold text-[#1C2B6D] text-center"
              style={{ fontStyle: "italic" }}
            >
              {title}
            </Text>
          </View>

          {/* Story Content - current segment only */}
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
                {currentSegment.text}
              </Text>
            </View>

            {/* Segment indicator dots */}
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

          {/* Audio Player */}
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
              {/* Single Play/Pause Button */}
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

              {/* Seekable Progress Bar */}
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
                  {/* Thumb */}
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
          {/* Complete Story Button - shows on last segment */}
          {isLastSegment && (
            <View className="mx-6 mb-4">
              <TouchableOpacity
                onPress={() => {
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

      {/* BottomMenu */}
      <View className="absolute bottom-0 left-0 right-0">
        <BottomMenu />
      </View>

      {/* Completion Screen Overlay */}
      {isCompleted && (
        <View className="absolute inset-0 bg-[#EEF0F8] items-center justify-center px-8">
          {/* Stars decoration */}
          <Text className="text-4xl absolute top-20 left-8">⭐</Text>
          <Text className="text-2xl absolute top-28 right-12">✨</Text>
          <Text className="text-3xl absolute top-16 right-6">⭐</Text>
          <Text className="text-xl absolute top-36 left-16">✨</Text>

          {/* Badge */}
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

          {/* More stars around badge */}
          <Text className="text-2xl absolute top-60 left-6">⭐</Text>
          <Text className="text-lg absolute top-64 right-10">⭐</Text>

          {/* Congratulations text */}
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

          {/* Book illustration */}
          <View className="mb-10">
            <Text className="text-6xl">📖</Text>
          </View>

          {/* Story title */}
          <View className="bg-white/60 rounded-2xl px-6 py-3 mb-8">
            <Text className="text-lg font-bold text-[#1C2B6D] text-center">
              {title}
            </Text>
          </View>

          {/* Action Buttons */}
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
              onPress={() => {
                setIsCompleted(false);
                setCurrentTime(0);
                setIsPlaying(false);
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
