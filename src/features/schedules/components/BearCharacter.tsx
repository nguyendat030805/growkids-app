import React from "react";
import { Image, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface Props {
  animatedStyle: any;
}

const BearCharacter = ({ animatedStyle }: Props) => {
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={require("../../../core/assets/hinh-anh-gau-truc-hoat-hinh-de-thuong_121845289.jpg")}
        style={styles.image}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    top: 135,
  },
  image: { width: 120, height: 120, resizeMode: "contain" },
});

export default BearCharacter;
