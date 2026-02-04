import { ArrowLeft } from "lucide-react-native";
// eslint-disable-next-line import/order
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SongCard } from "../components/SongCard";
import { useSongs } from "../hooks/useSongs";

const SongsPage = () => {
  const { songs, loading } = useSongs();

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Songs</Text>
      <ArrowLeft size={24} color="#000" />
      <Text style={styles.sub}>Let’s enjoy the music!</Text>

      <TextInput placeholder="Search" style={styles.search} />

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SongCard song={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SongsPage;

/* ✅ BẮT BUỘC PHẢI CÓ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F6FA",
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
  },
  sub: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
  },
  loading: {
    marginTop: 40,
    textAlign: "center",
  },
});
