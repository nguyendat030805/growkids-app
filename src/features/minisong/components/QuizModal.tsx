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
  const [status, setStatus] = useState<"none" | "correct" | "wrong">("none");

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  if (!question) return null;

  const startShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSubmit = () => {
    const selectedOption = question.images?.find(
      (img: any) => img.image_id === selectedId,
    );

    if (selectedOption?.is_correct) {
      setStatus("correct");
      setTimeout(() => {
        onCorrect();
        resetModal();
      }, 1200);
    } else {
      setStatus("wrong");
      startShake();
      setTimeout(() => {
        setStatus("none");
        setSelectedId(null);
      }, 1000);
    }
  };

  const resetModal = () => {
    setSelectedId(null);
    setStatus("none");
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/60 px-6">
        <Animated.View
          style={{ transform: [{ translateX: shakeAnim }] }}
          className="bg-white rounded-[40px] p-6 w-full border-4 border-[#D4F063] relative overflow-hidden"
        >
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
                      if (status !== "none") return;
                      setSelectedId(img.image_id);
                      scaleAnim.setValue(1);
                      Animated.spring(scaleAnim, {
                        toValue: 1.1,
                        friction: 3,
                        useNativeDriver: true,
                      }).start();
                    }}
                    className={`w-full h-full rounded-3xl overflow-hidden border-4 ${isSelected ? (img.is_correct ? "border-green-500" : "border-red-500") : "border-yellow-100"} relative`}
                  >
                    <Image
                      source={{ uri: img.image_url }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />

                    {isSelected && status !== "none" && (
                      <View
                        className={`absolute inset-0 justify-center items-center ${status === "correct" ? "bg-green-500/40" : "bg-red-500/40"}`}
                      >
                        <View
                          className={`w-16 h-16 rounded-full items-center justify-center border-4 border-white shadow-lg ${status === "correct" ? "bg-green-500" : "bg-red-500"}`}
                        >
                          <Text className="text-white text-4xl font-black shadow-sm">
                            {status === "correct" ? "✓" : "✕"}
                          </Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!selectedId || status !== "none"}
            className={`py-4 rounded-full mt-2 ${selectedId ? "bg-[#00C517]" : "bg-[#B6F4BD]"}`}
          >
            <Text className="text-white text-center font-black text-xl uppercase">
              Submit
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
