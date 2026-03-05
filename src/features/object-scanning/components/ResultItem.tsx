import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  en: string;
  vi: string;
  onPlay: () => void;
}

export const ResultItem = ({ en, vi, onPlay }: Props) => (
  <View style={styles.card}>
    <View style={{ flex: 1 }}>
      <Text style={styles.en}>{en}</Text>
      <Text style={styles.vi}>{vi}</Text>
    </View>
    <TouchableOpacity onPress={onPlay}>
      <Ionicons name="volume-medium" size={24} color="#FF9F1C" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#F5F7FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  en: { fontSize: 16, fontWeight: "600", color: "#2D3436" },
  vi: { fontSize: 14, color: "#636E72", marginTop: 4 },
});
