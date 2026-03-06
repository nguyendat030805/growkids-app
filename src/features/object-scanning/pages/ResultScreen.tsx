import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useObjectScanning } from "../hooks/useObjectScanning";
import { ResultItem } from "../components/ResultItem";

export default function ResultScreen({ route, navigation }: any) {
  const { imageBase64 } = route.params;
  const { loading, result, handleScan, playSound } = useObjectScanning();
  const hasScanned = React.useRef(false);
  useEffect(() => {
    if (imageBase64 && !hasScanned.current) {
      handleScan(imageBase64);
      hasScanned.current = true;
    }
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-[30px] font-bold text-[#2E3A59]">Result</Text>
        <TouchableOpacity
          onPress={() => handleScan(imageBase64)}
          className="bg-[#A8D400] p-2 rounded-full shadow-md"
        >
          <Ionicons name="refresh" size={25} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-6">
        {loading ? (
          <View className="my-6 items-center">
            <ActivityIndicator size="large" color="#ffb500" />
            <Text className="mt-3 text-[#ffb500] font-bold">
              AI is analyzing the image...
            </Text>
          </View>
        ) : (
          <>
            <View className="w-full h-64 bg-white border border-gray-100 rounded-[30px] overflow-hidden shadow-sm my-4">
              <Image
                source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => playSound(result?.audioNameBase64 || "")}
              className="flex-row items-center justify-between mt-4 mb-6 bg-white p-6 rounded-[25px] shadow-sm border border-gray-50"
            >
              <View className="flex-1">
                <Text className="text-[36px] font-bold text-gray-900">
                  {result?.nameEn}
                </Text>
                <Text className="text-[18px] text-gray-400 font-medium">
                  {result?.phonetic || "/.../"}
                </Text>
              </View>
              <View className="bg-[#ffb500] w-14 h-14 items-center justify-center rounded-full shadow-lg">
                <Ionicons name="volume-high" size={30} color="white" />
              </View>
            </TouchableOpacity>

            {result?.suggestion && (
              <ResultItem
                en={result.suggestion.textEn}
                vi={result.suggestion.textVi}
                phonetic={result.suggestion.phonetic}
                keyword={result.nameEn}
                onPlay={() => playSound(result.audioSuggestionBase64)}
              />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
