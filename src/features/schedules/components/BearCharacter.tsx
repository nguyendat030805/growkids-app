import React from "react";
import { Image } from "react-native";
import Animated from "react-native-reanimated";

interface Props {
  animatedStyle: any;
}

const BearCharacter = ({ animatedStyle }: Props) => {
  return (
    <Animated.View
      style={animatedStyle}
      className="items-center justify-center h-[120px] top-[135px]"
    >
      <Image
        source={require("@/assets/anh gau.png")}
        className="w-[120px] h-[120px] resize-contain"
      />
    </Animated.View>
  );
};

export default BearCharacter;
