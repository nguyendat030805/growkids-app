import React from "react";
import { View } from "react-native";

export const ScannerOverlay = () => {
  return (
    <View pointerEvents="none" className="items-center justify-center">
      <View className="relative h-72 w-72">
        <View className="absolute left-0 top-0 h-12 w-12 rounded-tl-[30px] border-l-4 border-t-4 border-white" />
        <View className="absolute right-0 top-0 h-12 w-12 rounded-tr-[30px] border-r-4 border-t-4 border-white" />
        <View className="absolute bottom-0 left-0 h-12 w-12 rounded-bl-[30px] border-b-4 border-l-4 border-white" />
        <View className="absolute bottom-0 right-0 h-12 w-12 rounded-br-[30px] border-b-4 border-r-4 border-white" />
      </View>
    </View>
  );
};
