import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";

interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
  image: ImageSourcePropType;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, image }) => {
  return (
    <View className="mt-10 items-center">
      <View className="w-32 h-14 rounded-full items-center justify-center">
        <Image source={image} className="w-64 h-64" resizeMode="contain" />
      </View>

      <Text className="mt-6 text-3xl font-bold text-white">{title}</Text>

      <Text className="text-white/80 mt-1">{subtitle}</Text>
    </View>
  );
};

export default AuthHeader;
