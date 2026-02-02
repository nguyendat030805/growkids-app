import React from "react";
import { Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface Props {
  text: {
    vi: string;
    en: string;
  };
  animatedStyle: any;
}

const ChatBubble = ({ animatedStyle }: Props) => {
  return (
    <Animated.View style={[styles.bubble, animatedStyle]}>
      <Text style={styles.text}>Now, tell me about your daily schedule!</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFD700",
    marginHorizontal: 20,
  },
  text: { fontSize: 13, textAlign: "center" },
});

export default ChatBubble;
