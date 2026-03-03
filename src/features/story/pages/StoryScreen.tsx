import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import { ChevronLeft, Star } from "lucide-react-native";
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
  difficulty: string;
  duration: string;
  content: string;
  image: ImageSourcePropType;
}

interface Topic {
  name: string;
  stories: Story[];
}

const topicsData: Topic[] = [
  {
    name: "Animals",
    stories: [
      {
        id: 1,
        title: "The Lion & Mouse",
        difficulty: "Easy",
        duration: "120",
        content:
          "Once upon a time, a tiny mouse was playing. A big lion was sleeping nearby. The mouse accidentally ran across the lion's nose and woke him up. The lion caught the mouse, but the mouse begged for mercy. The lion laughed and let the mouse go. Later, the lion was caught in a hunter's net. The tiny mouse heard his roar and came to help. She gnawed through the ropes and set the lion free. From that day on, they became the best of friends.",
        image: require("@/public/assets/images/imgStory.png"),
      },
      {
        id: 2,
        title: "The Magic Garden",
        difficulty: "Easy",
        duration: "90",
        content:
          "In a small village, there was a garden that bloomed only at night. A curious girl named Lily discovered it one evening. The flowers glowed with golden light and whispered secrets of kindness. Lily learned that the garden grew brighter when someone did a good deed. She started helping everyone in the village, and the garden became the most beautiful place in the world.",
        image: require("@/public/assets/images/imgStory.png"),
      },
      {
        id: 3,
        title: "Red Riding Hood",
        difficulty: "Easy",
        duration: "150",
        content:
          "Once there was a sweet little girl who always wore a red riding hood. One day, her mother asked her to take food to her grandmother. On the way through the forest, she met a wolf. The wolf tricked her and ran to grandmother's house first. But a brave woodcutter saved them both. Red Riding Hood learned to always stay on the safe path.",
        image: require("@/public/assets/images/imgStory.png"),
      },
      {
        id: 4,
        title: "Save the Little Bird",
        difficulty: "Easy",
        duration: "80",
        content:
          "A little bird fell from its nest during a storm. A kind boy named Tom found it shivering under a bush. He carefully picked it up and made a warm nest in a box. Every day, he fed the bird and talked to it gently. Soon the bird was strong enough to fly again. It sang a beautiful song for Tom before flying home.",
        image: require("@/public/assets/images/imgStory.png"),
      },
      {
        id: 5,
        title: "Save the Little Bird",
        difficulty: "Easy",
        duration: "80",
        content:
          "A little bird fell from its nest during a storm. A kind boy named Tom found it shivering under a bush. He carefully picked it up and made a warm nest in a box. Every day, he fed the bird and talked to it gently. Soon the bird was strong enough to fly again. It sang a beautiful song for Tom before flying home.",
        image: require("@/public/assets/images/imgStory.png"),
      },
      {
        id: 6,
        title: "Help Bunny Find Home",
        difficulty: "Easy",
        duration: "60",
        content:
          "Bunny was lost in the big meadow. He hopped left and right but could not find his home. A friendly squirrel offered to help. Together they crossed the stream and passed the tall oak tree. Finally, they found the cozy burrow under the hill. Bunny was so happy he shared his carrots with his new friend.",
        image: require("@/public/assets/images/imgStory.png"),
      },
    ],
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_GAP = 12;
const HORIZONTAL_PADDING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

export default function StoryScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showAIModal, setShowAIModal] = useState(false);

  const handleAIGenerate = (params: AIStoryParams) => {
    setShowAIModal(false);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
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

          {topicsData.map((topic, topicIdx) => (
            <View key={topicIdx} className="px-4 mb-6">
              <View className="flex-row flex-wrap" style={{ gap: CARD_GAP }}>
                {topic.stories.map((story) => (
                  <TouchableOpacity
                    key={story.id}
                    activeOpacity={0.85}
                    style={{ width: CARD_WIDTH }}
                    className="rounded-2xl overflow-hidden"
                    onPress={() =>
                      navigation.navigate("StoryPlayer", {
                        storyId: story.id,
                        title: story.title,
                        duration: story.duration,
                      })
                    }
                  >
                    <View
                      className="relative"
                      style={{ height: CARD_WIDTH * 1.15 }}
                    >
                      <Image
                        source={story.image}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />

                      <View
                        className="absolute inset-0"
                        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                      />

                      <View className="absolute top-0 left-0 right-0 p-2.5">
                        <Text
                          className="text-white font-extrabold text-sm"
                          style={{
                            textShadowColor: "rgba(0,0,0,0.6)",
                            textShadowOffset: { width: 0, height: 1 },
                            textShadowRadius: 3,
                          }}
                          numberOfLines={2}
                        >
                          {story.title}
                        </Text>
                      </View>

                      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between p-2.5">
                        <View className="bg-[#9EC800] rounded-full px-3 py-1">
                          <Text className="text-white text-xs font-bold">
                            {story.difficulty}
                          </Text>
                        </View>
                        <View className="bg-[#9EC800] rounded-full px-3 py-1">
                          <Text className="text-white text-xs font-bold">
                            {story.duration}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
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
