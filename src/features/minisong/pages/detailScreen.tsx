import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Play } from "lucide-react-native";
import { Image, ScrollView, Text, View } from "react-native";

import { CircleIcon } from "../../../core/components/CircleIcon";
import HeaderChild from "../../../core/components/ScreenHeader";
import { MiniSongStackParamList } from "../routes/SongRoute";

type RouteProps = RouteProp<MiniSongStackParamList, "SongDetail">;

type NavigationProp = NativeStackNavigationProp<MiniSongStackParamList>;

const SongDetailPage = () => {
  const { params } = useRoute<RouteProps>();
  const { song } = params;

  const navigation = useNavigation<NavigationProp>();

  const handlePlay = () => {
    navigation.navigate("SongDetailPlay", { song });
  };

  return (
    <View className="flex-1 bg-[#F5F6FA]">
      <View className="mx-4 mt-4">
        <HeaderChild title="song" subtitle="Let’s sing together 🎵" showBack />
      </View>

      <ScrollView className="mt-2 px-4" showsVerticalScrollIndicator={false}>
        <View className="relative mb-4 overflow-hidden rounded-2xl bg-white shadow-md">
          <Image
            source={song.thumbnail}
            className="h-[200px] w-full"
            resizeMode="cover"
          />

          <View className="absolute inset-0 items-center justify-center">
            <CircleIcon
              icon={Play}
              size={64}
              iconSize={28}
              backgroundColor="#22C55E"
              onPress={handlePlay}
            />
          </View>
        </View>
        <Text className="text-lg font-bold mb-3">
          Head Shoulders Knees And Toes
        </Text>
        {[
          {
            title: "Head and shoulders knees and toes",
            sub: "/hed ænd ˈʃoʊldərz niːz ænd toʊz/",
          },
          {
            title: "Knees and toes",
            sub: "/niːz ænd toʊz/",
          },
          {
            title: "Head and shoulders knees and toes",
            sub: "/hed ænd ˈʃoʊldərz niːz ænd toʊz/",
          },
          {
            title: "Knees and toes",
            sub: "/niːz ænd toʊz/",
          },
        ].map((item, index) => (
          <View
            key={index}
            className="mb-3 flex-row items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm"
          >
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold text-gray-800">
                {item.title}
              </Text>
              <Text className="mt-1 text-xs text-orange-500">{item.sub}</Text>
            </View>

            <CircleIcon
              icon={Play}
              size={36}
              iconSize={16}
              backgroundColor="#22C55E"
              onPress={handlePlay}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SongDetailPage;
