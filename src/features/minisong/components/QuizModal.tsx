import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";

export const QuizModal = ({ visible, question, onCorrect, onClose }: any) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrected, setIsCorrected] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  if (!question) return null;

  const handleSubmit = () => {
    const selectedOption = question.images?.find(
      (img: any) => img.image_id === selectedId,
    );

    if (selectedOption?.is_correct) {
      setIsCorrected(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        onCorrect();
        setSelectedId(null);
        setIsCorrected(false);
        fadeAnim.setValue(0);
      }, 1200);
    } else {
      alert("That's wrong, please choose again!");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/60 px-6">
        <View className="bg-white rounded-[40px] p-6 w-full border-4 border-[#D4F063] relative overflow-hidden">
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-6 top-4 z-10 p-2"
          >
            <Text className="text-gray-400 text-2xl font-bold">✕</Text>
          </TouchableOpacity>

          <Text className="text-3xl font-black text-center text-[#CCDF25] mt-4 uppercase">
            {question.vocabulary}
          </Text>
          <Text className="text-gray-500 text-center font-bold mb-6">
            Choose the correct picture!
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {question.images?.map((img: any) => {
              const isSelected = selectedId === img.image_id;
              return (
                <Animated.View
                  key={img.image_id}
                  style={{
                    width: "48%",
                    aspectRatio: 1,
                    marginBottom: 16,
                    transform: [{ scale: isSelected ? scaleAnim : 1 }],
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedId(img.image_id);
                      scaleAnim.setValue(1);
                      Animated.spring(scaleAnim, {
                        toValue: 1.1,
                        friction: 3,
                        useNativeDriver: true,
                      }).start();
                    }}
                    className={`w-full h-full rounded-3xl overflow-hidden border-4 
                      ${isSelected ? (img.is_correct ? "border-green-500" : "border-red-500") : "border-yellow-100"}`}
                  >
                    <Image
                      source={{ uri: img.image_url }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!selectedId || isCorrected}
            className={`py-4 rounded-full mt-2 shadow-sm ${selectedId ? "bg-[#00C517]" : "bg-[#B6F4BD]"}`}
          >
            <Text className="text-white text-center font-black text-xl uppercase">
              Submit
            </Text>
          </TouchableOpacity>

          {isCorrected && (
            <Animated.View
              style={{
                opacity: fadeAnim,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999,
                backgroundColor: "rgba(255,255,255,0.7)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View className="bg-green-500 rounded-full w-24 h-24 justify-center items-center shadow-lg">
                <Text className="text-white text-6xl font-bold">✓</Text>
              </View>
              <Text className="text-green-600 text-3xl font-black mt-4 uppercase">
                Correct!
              </Text>
            </Animated.View>
          )}
        </View>
      </View>
    </Modal>
  );
};
