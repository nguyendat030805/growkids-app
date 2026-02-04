import { useRoute } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
export default function SongDetailPage() {
  const route = useRoute<any>();
  const { song } = route.params;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image
        source={song.thumbnail}
        style={{ width: "100%", height: 220, borderRadius: 16 }}
      />

      <Text style={{ fontSize: 22, fontWeight: "800", marginTop: 12 }}>
        {song.title}
      </Text>

      <Text>
        {song.duration} · {song.views}
      </Text>

      <Text>Category: {song.category}</Text>
    </View>
  );
}
