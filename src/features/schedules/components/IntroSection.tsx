import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface IntroProps {
  onStart: () => void;
}

const IntroSection = ({ onStart }: IntroProps) => {
  return (
    <View className="items-center w-full mt-5">
      <View className="items-center px-10">
        <Text className="text-2xl font-bold text-[#4A55A2] mb-3">
          Hello parents 👋
        </Text>
        <Text className="text-center text-[15px] text-gray-600 leading-[22px]">
          Im Panda — your companion. Today, we will find the best golden time to
          learn English with your child!
        </Text>
      </View>

      <TouchableOpacity
        onPress={onStart}
        className="bg-[#E1C12C] py-4 px-20 rounded-xl mt-2"
      >
        <Text className="text-white text-lg font-bold">Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntroSection;
