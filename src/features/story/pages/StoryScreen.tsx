import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
  StyleSheet,
} from "react-native";
import { ChevronLeft, Heart, Star } from "lucide-react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/core/navigation/NavigationService";

import { BottomMenu } from "@/src/core/pages/BottomMenu";
import { Header } from "@/src/core/pages/Header";
import {
  AIStoryModal,
  AIStoryParams,
} from "@/src/features/story/components/AIStoryModal";

interface Story {
  id: number;
  title: string;
  author: string;
  category: string;
  categoryColor: string;
  duration: string;
  content: string;
  image: ImageSourcePropType;
  isFavorite?: boolean;
}

const formatDuration = (seconds: string) => {
  const totalSec = parseInt(seconds, 10);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min === 0) return `${sec}s`;
  if (sec === 0) return `${min} min`;
  return `${min} min ${sec}s`;
};

const storiesData: Story[] = [
  {
    id: 1,
    title: "Echoes of Time",
    author: "Emily R.",
    category: "Literature",
    categoryColor: "#A855F7",
    duration: "120",
    content:
      "Once upon a time, a tiny mouse was playing. A big lion was sleeping nearby. The mouse accidentally ran across the lion's nose and woke him up.",
    image: require("@/public/assets/images/imgStory.png"),
    isFavorite: true,
  },
  {
    id: 2,
    title: "Whispers in the Wind",
    author: "David K.",
    category: "Travel",
    categoryColor: "#14B8A6",
    duration: "90",
    content:
      "In a small village, there was a garden that bloomed only at night. A curious girl named Lily discovered it one evening.",
    image: require("@/public/assets/images/imgStory.png"),
  },
  {
    id: 3,
    title: "City of Neon",
    author: "Sarah P.",
    category: "Sci-Fi",
    categoryColor: "#3B82F6",
    duration: "150",
    content:
      "Once there was a sweet little girl who always wore a red riding hood. One day, her mother asked her to take food to her grandmother.",
    image: require("@/public/assets/images/imgStory.png"),
  },
  {
    id: 4,
    title: "Ocean's Call",
    author: "Liam T.",
    category: "Romance",
    categoryColor: "#F43F5E",
    duration: "80",
    content:
      "A little bird fell from its nest during a storm. A kind boy named Tom found it shivering under a bush.",
    image: require("@/public/assets/images/imgStory.png"),
  },
  {
    id: 5,
    title: "The Magic Garden",
    author: "Anna M.",
    category: "Literature",
    categoryColor: "#A855F7",
    duration: "100",
    content:
      "The flowers glowed with golden light and whispered secrets of kindness.",
    image: require("@/public/assets/images/imgStory.png"),
  },
  {
    id: 6,
    title: "Red Riding Hood",
    author: "Tom W.",
    category: "Adventure",
    categoryColor: "#F59E0B",
    duration: "130",
    content:
      "Bunny was lost in the big meadow. He hopped left and right but could not find his home.",
    image: require("@/public/assets/images/imgStory.png"),
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_GAP = 14;
const HORIZONTAL_PADDING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;
const IMAGE_HEIGHT = CARD_WIDTH * 0.85;

export default function StoryScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showAIModal, setShowAIModal] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(
    new Set(storiesData.filter((s) => s.isFavorite).map((s) => s.id)),
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAIGenerate = (params: AIStoryParams) => {
    setShowAIModal(false);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="py-4">
          <View className="px-0">
            <Header />
          </View>

          <View className="flex-row items-center justify-between px-4 mb-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <ChevronLeft size={24} color="#1C2B6D" />
              <Text className="text-xl font-bold text-[#1C2B6D] ml-1">
                Story
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-[#FFB500] items-center justify-center"
              activeOpacity={0.8}
            >
              <Star size={20} color="#fff" fill="#fff" />
            </TouchableOpacity>
          </View>

          <View className="mx-4 mb-5">
            <TouchableOpacity
              onPress={() => setShowAIModal(true)}
              activeOpacity={0.8}
              className="bg-[#FFB500] rounded-full py-3 px-6 items-center"
            >
              <Text className="text-white font-extrabold text-base tracking-wider">
                Smart Story Generation
              </Text>
            </TouchableOpacity>
          </View>

          <View className="px-4">
            <View className="flex-row flex-wrap" style={{ gap: CARD_GAP }}>
              {storiesData.map((story) => {
                const isFav = favorites.has(story.id);
                return (
                  <TouchableOpacity
                    key={story.id}
                    activeOpacity={0.9}
                    style={[styles.card, { width: CARD_WIDTH }]}
                    onPress={() =>
                      navigation.navigate("StoryPlayer", {
                        storyId: story.id,
                        title: story.title,
                        duration: story.duration,
                      })
                    }
                  >
                    <Image
                      source={story.image}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />

                    <View className="px-2.5 pt-2 pb-2.5">
                      <View className="flex-row items-center justify-between">
                        <Text
                          className="text-[13px] font-bold text-gray-900 flex-1 mr-1"
                          numberOfLines={1}
                        >
                          {story.title}
                        </Text>
                        <TouchableOpacity
                          onPress={(e) => {
                            e.stopPropagation();
                            toggleFavorite(story.id);
                          }}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          activeOpacity={0.6}
                        >
                          {isFav ? (
                            <Heart
                              size={18}
                              color="#EF4444"
                              fill="#EF4444"
                              strokeWidth={2}
                            />
                          ) : (
                            <Heart
                              size={18}
                              color="#D1D5DB"
                              fill="#FFFFFF"
                              strokeWidth={2}
                            />
                          )}
                        </TouchableOpacity>
                      </View>

                      <View className="flex-row items-center justify-between mt-2">
                        <View
                          style={[
                            styles.categoryBadge,
                            { backgroundColor: story.categoryColor + "18" },
                          ]}
                        >
                          <Text
                            style={[
                              styles.categoryText,
                              { color: story.categoryColor },
                            ]}
                          >
                            {story.category}
                          </Text>
                        </View>

                        <Text className="text-[11px] text-gray-400">
                          {formatDuration(story.duration)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0">
        <BottomMenu />
      </View>

      <AIStoryModal
        visible={showAIModal}
        onClose={() => setShowAIModal(false)}
        onGenerate={handleAIGenerate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8ECF0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  categoryBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
  },
});
