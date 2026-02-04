import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Song } from "../types/Song";

export const SongCard = ({ song }: { song: Song }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        router.push({
          pathname: "/minisong/song-detail",
          params: {
            song: JSON.stringify(song),
          },
        })
      }
    >
      <View style={styles.card}>
        <Image source={song.thumbnail} style={styles.image} />

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{song.category}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{song.title}</Text>
            <Ionicons name="heart-outline" size={20} color="#888" />
          </View>

          <Text style={styles.meta}>
            {song.duration} · <Text style={styles.views}>{song.views}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/* ✅ BẮT BUỘC PHẢI CÓ */
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 26,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FFA726",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  content: {
    padding: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    marginRight: 8,
  },
  meta: {
    marginTop: 9,
    fontSize: 12,
    color: "#777",
  },
  views: {
    color: "#FF6200",
    fontWeight: "600",
  },
});
