import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title = "Songs",
  subtitle = "Let’s enjoy the music!",
  showBack = true,
  onBackPress,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View className="bg-white px-4 pt-4 pb-3 shadow-sm rounded-b-2xl">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {showBack && (
            <TouchableOpacity onPress={handleBack} className="mr-2">
              <ArrowLeft size={24} color="#1C2B6D" />
            </TouchableOpacity>
          )}

          <Text className="text-[18px] font-bold text-[#1C2B6D]">{title}</Text>
        </View>

        <Image
          source={require("@/public/assets/images/song-logo.png")}
          className="w-8 h-8"
          resizeMode="contain"
        />
      </View>
      {subtitle && (
        <Text className="text-xs text-gray-500 mt-1 ml-8">{subtitle}</Text>
      )}
    </View>
  );
};

export default ScreenHeader;
