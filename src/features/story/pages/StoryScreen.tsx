import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ChevronLeft, Heart, Star } from "lucide-react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ExperienceStackParamList } from "@/src/core/navigation/NavigationService";
import {
  AIStoryModal,
  AIStoryParams,
} from "@/src/features/story/components/AIStoryModal";
import { useStories } from "@/src/features/story/hooks/useStories";
import { useCreateStory } from "@/src/features/story/hooks/useCreateStory";
import { Story } from "@/src/features/story/types/StoryType";

const FALLBACK_IMAGE = require("@/public/assets/images/imgStory.png");

const formatDuration = (seconds: number | null) => {
  if (!seconds) return "";
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  if (min === 0) return `${sec}s`;
  if (sec === 0) return `${min} min`;
  return `${min} min ${sec}s`;
};

const getCoverImage = (story: Story) => {
  if (story.cover_image_url) return { uri: story.cover_image_url };
  const firstSegment = story.story_segments?.[0];
  if (firstSegment?.image_url) return { uri: firstSegment.image_url };
  return FALLBACK_IMAGE;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_GAP = 14;
const HORIZONTAL_PADDING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;
const IMAGE_HEIGHT = CARD_WIDTH * 0.85;

export default function StoryScreen() {
  const navigation = useNavigation<NavigationProp<ExperienceStackParamList>>();
  const { stories, loading, refetch } = useStories();
  const { createStory, loading: creating } = useCreateStory(() => {
    setShowAIModal(false);
    refetch();
  });
  const [showAIModal, setShowAIModal] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAIGenerate = (params: AIStoryParams) => {
    createStory(params);
  };

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
            {loading ? (
              <View className="items-center py-12">
                <ActivityIndicator size="large" color="#FFB500" />
              </View>
            ) : (
              <View className="flex-row flex-wrap" style={{ gap: CARD_GAP }}>
                {stories.map((story) => {
                  const isFav = favorites.has(story.story_id);
                  return (
                    <TouchableOpacity
                      key={story.story_id}
                      activeOpacity={0.9}
                      style={[styles.card, { width: CARD_WIDTH }]}
                      onPress={() =>
                        navigation.navigate("StoryPlayer", {
                          storyId: story.story_id,
                        })
                      }
                    >
                      <Image
                        source={getCoverImage(story)}
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
                              toggleFavorite(story.story_id);
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
                          {story.age_min != null && story.age_max != null && (
                            <View
                              style={[
                                styles.ageBadge,
                                { backgroundColor: "#A855F718" },
                              ]}
                            >
                              <Text
                                style={[styles.ageText, { color: "#A855F7" }]}
                              >
                                {story.age_min}–{story.age_max} tuổi
                              </Text>
                            </View>
                          )}

                          <Text className="text-[11px] text-gray-400">
                            {formatDuration(story.duration_seconds)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

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
  ageBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ageText: {
    fontSize: 11,
    fontWeight: "700",
  },
});
