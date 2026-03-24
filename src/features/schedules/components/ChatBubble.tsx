import { Text } from "react-native";
import Animated from "react-native-reanimated";

interface Props {
  text: {
    vi: string;
    en: string;
  };
  animatedStyle: any;
}

const ChatBubble = ({ animatedStyle, text }: Props) => {
  return (
    <Animated.View
      style={animatedStyle}
      className="bg-white px-4 py-3 rounded-[20px] border border-yellow-400 mx-5"
    >
      <Text className="text-[18px] text-center">{text.en}</Text>
    </Animated.View>
  );
};

export default ChatBubble;
