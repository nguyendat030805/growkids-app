import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity } from "react-native";
interface IntroProps {
  onStart: () => void;
}

const GradientText = ({ children }: { children: string }) => {
  return (
    <MaskedView
      maskElement={
        <Text className="text-[15px] font-bold bg-transparent">{children}</Text>
      }
    >
      <LinearGradient
        colors={["#FFB81F", "#A8D400"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text className="text-[15px] font-bold opacity-0">{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const IntroSection = ({ onStart }: IntroProps) => {
  return (
    <View className="items-center w-full mt-5">
      <View className="items-center px-10">
        <Text className="text-2xl font-bold text-[#4A55A2] mb-3">
          Hello parents 👋
        </Text>
        <Text className="text-center text-[15px] text-gray-600 leading-[22px]">
          Im Koala — your companion.
        </Text>
        <View className="flex-row flex-wrap justify-center">
          <Text className="text-[15px] text-gray-600">
            Today, we will find the best{" "}
          </Text>
          <GradientText>golden time</GradientText>
          <Text className="text-[15px] text-gray-600">
            {" "}
            to learn English with your child!
          </Text>
        </View>
        <View className="flex-row items-center bg-transparent px-4 py-2 w-full">
          <View className="w-[5px] h-full bg-[#A8D400] rounded-full mr-4 pt-20" />
          <Text className="flex-1 text-[15px] text-gray-700 leading-6 ">
            💡 <Text className="font-bold">Tip:</Text> Be ready with your child
            daily schedule and your free time!
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onStart}
        className="bg-[#E1C12C] py-4 px-20 rounded-xl mt-2 "
      >
        <Text className="text-white text-lg font-bold">Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntroSection;
