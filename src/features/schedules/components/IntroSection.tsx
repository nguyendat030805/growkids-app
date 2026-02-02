import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface IntroProps {
  onStart: () => void;
}

const IntroSection = ({ onStart }: IntroProps) => (
  <View style={styles.container}>
    <View style={styles.textGroup}>
      <Text style={styles.title}>Hello parents 👋</Text>
      <Text style={styles.description}>
        Im Panda — your companion. Today, we will find the best golden time to
        learn English with your child!
      </Text>
    </View>

    <TouchableOpacity style={styles.button} onPress={onStart}>
      <Text style={styles.buttonText}>Start</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: "center", width: "100%", marginTop: 20 },
  textGroup: { alignItems: "center", paddingHorizontal: 40 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A55A2",
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#E1C12C",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 12,
    marginTop: 5,
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});

export default IntroSection;
