import LottieView from "lottie-react-native";
import React from "react";
import { View, Text } from "react-native";

interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="mt-10 items-center">
      <View className="w-64 h-20 mt-[15px] items-center justify-center">
        <LottieView
          source={require("../../../../public/assets/animation/welcome baby.json")}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      </View>

      <Text className="mt-10 text-3xl font-bold text-white">{title}</Text>

      <Text className="text-white/80 mt-1">{subtitle}</Text>
    </View>
  );
};

export default AuthHeader;
