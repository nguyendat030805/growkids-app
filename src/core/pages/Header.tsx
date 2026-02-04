import React from "react";
import { View, Image } from "react-native";

export const Header = () => {
  return (
    <View className="mb-8">
      <View className="flex-row items-center justify-between">
        {/* Logo GrowKids app */}
        <Image
          source={require("@/public/assets/images/logoGrowKids.png")}
          className="h-8 w-36 ml-3"
          resizeMode="contain"
        />
      </View>

      <View className="h-0.5 bg-[#B4D540] mt-3 rounded-full"></View>
    </View>
  );
};
