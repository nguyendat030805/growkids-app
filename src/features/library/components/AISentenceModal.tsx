import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { X, Sparkles, Volume2, ChevronLeft, Pen } from "lucide-react-native";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

import { Sentence, Difficulty } from "../types/LibraryType";
import { useLibrary } from "../hooks/useLibrary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "@/src/core/constants";

interface AISentenceModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const LEVEL_OPTIONS: { key: Difficulty; label: string }[] = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "advanced", label: "Advanced" },
];

export function AISentenceModal({
  visible,
  onClose,
  onSuccess,
}: AISentenceModalProps) {
  const { createSentenceSet, loading: apiLoading } = useLibrary();
  const [topic, setTopic] = useState("");
  const [quantity, setQuantity] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [showResults, setShowResults] = useState(false);
  const handleGenerate = async () => {
    const childId = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CHILD_ID);

    setLoading(true);
    setSentences([]);

    try {
      const payload = {
        topic: topic,
        quantity: parseInt(quantity) || 3,
        goal: goal || "No",
        childId: childId || "",
      };

      const result = await createSentenceSet(payload);
      console.log("Create sentence set response:", result);

      if (result.success && result.data?.sentences) {
        const generatedSentences: Sentence[] = result.data.sentences.map(
          (item: any, index: number) => ({
            id: item.sentence_id || `gen-${index}`,
            english: item.sentence_text || "",
            vietnamese: item.meaning || "",
            phonetic: item.phonetic || "",
            difficulty: item.levels?.level_name?.toLowerCase() || "medium",
            topicId: item.topic_id,
            audio_url: item.audio_url,
          }),
        );

        console.log("Generated sentences:", generatedSentences);
        setSentences(generatedSentences);
        setShowResults(true);

        if (onSuccess) {
          onSuccess();
        }
      } else {
        Alert.alert("Error", "Failed to generate sentences");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to generate sentences");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = async (text: string, audioUrl?: string) => {
    if (audioUrl && audioUrl.startsWith("http")) {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true },
        );

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (error) {
        console.log("Audio playback error:", error);
        Speech.speak(text, { language: "en-US", rate: 0.85 });
      }
    } else {
      Speech.speak(text, { language: "en-US", rate: 0.85 });
    }
  };

  const handleClose = () => {
    setTopic("");
    setQuantity("");
    setGoal("");
    setSentences([]);
    setShowResults(false);
    setLoading(false);
    onClose();
  };

  const handleBackToForm = () => {
    setShowResults(false);
    setSentences([]);
  };

  const canGenerate = topic.trim().length > 0 && !loading && !apiLoading;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-[#F0F7F0] rounded-t-3xl max-h-[90%] min-h-[60%]">
            <View className="flex-row items-center px-5 pt-5 pb-3">
              {showResults && (
                <TouchableOpacity onPress={handleBackToForm} className="mr-2">
                  <ChevronLeft size={24} color="#1C2B6D" />
                </TouchableOpacity>
              )}
              <Text className="text-xl font-bold text-[#1C2B6D] flex-1">
                {showResults ? "Results" : "Create sentence patterns"}
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                className="w-8 h-8 rounded-full bg-black/10 items-center justify-center"
              >
                <X size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 40,
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {!showResults ? (
                <View className="bg-white rounded-[20px] p-5 shadow-sm shadow-black/5">
                  <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                    Topic:
                  </Text>
                  <View className="flex-row items-center border border-gray-200 rounded-full px-4 py-1 mb-1">
                    <Pen size={16} color="#9CA3AF" />
                    <TextInput
                      value={topic}
                      onChangeText={setTopic}
                      placeholder="Enter your topic..."
                      placeholderTextColor="#9CA3AF"
                      maxLength={50}
                      className="flex-1 text-[15px] text-gray-800 py-2.5 ml-2.5"
                    />
                  </View>
                  <Text className="text-gray-400 text-xs self-end mr-4 mb-4">
                    {topic.length}/50
                  </Text>

                  <View className="flex-row mb-5 gap-3">
                    <View className="flex-1">
                      <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                        Quantity:
                      </Text>
                      <TextInput
                        value={quantity}
                        onChangeText={setQuantity}
                        placeholder="Enter quantity..."
                        placeholderTextColor="#9CA3AF"
                        keyboardType="number-pad"
                        maxLength={2}
                        className="border border-gray-200 rounded-full px-4 py-3.5 text-[15px] text-gray-800"
                      />
                    </View>
                  </View>

                  <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                    Goal:
                  </Text>
                  <View className="flex-row items-start border border-gray-200 rounded-2xl px-4 py-1 min-h-[100px] mb-1">
                    <TextInput
                      value={goal}
                      onChangeText={setGoal}
                      placeholder="Enter your goal..."
                      placeholderTextColor="#9CA3AF"
                      multiline
                      maxLength={200}
                      textAlignVertical="top"
                      className="flex-1 text-[15px] text-gray-800 py-2.5 ml-1 min-h-[90px]"
                    />
                  </View>
                  <Text className="text-gray-400 text-xs self-end mr-4 mb-5">
                    {goal.length}/200
                  </Text>

                  <TouchableOpacity
                    onPress={handleGenerate}
                    disabled={!canGenerate}
                    activeOpacity={0.8}
                    className={`self-center rounded-full py-3.5 px-8 flex-row items-center justify-center shadow-md shadow-[#FFB500]/30 ${
                      canGenerate ? "bg-[#FFB500]" : "bg-[#FFB500]/50"
                    }`}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <>
                        <Sparkles size={20} color="#fff" />
                        <Text className="text-white font-bold text-base ml-2">
                          Generate
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  {loading && (
                    <View className="items-center py-8">
                      <ActivityIndicator size="large" color="#7C3AED" />
                      <Text className="mt-3 text-[#7C3AED] font-semibold">
                        AI đang tạo mẫu câu...
                      </Text>
                    </View>
                  )}

                  {sentences.map((sentence) => (
                    <View
                      key={sentence.id}
                      className="bg-[#2B5DA0] rounded-2xl p-4 mb-3 shadow-md shadow-[#2B5DA0]/20"
                    >
                      <View className="flex-row items-start justify-between mb-1.5">
                        <Text className="text-base font-bold text-white flex-1 mr-2.5 leading-[22px]">
                          {sentence.english}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            handleSpeak(sentence.english, sentence.audio_url)
                          }
                          className="w-9 h-9 rounded-full bg-white/20 items-center justify-center"
                        >
                          <Volume2 size={18} color="#fff" />
                        </TouchableOpacity>
                      </View>
                      <Text className="text-sm text-white/80 mt-0.5">
                        {sentence.vietnamese}
                      </Text>
                      <Text className="text-xs text-[#FFB500] mt-1.5 italic">
                        {sentence.phonetic}
                      </Text>
                    </View>
                  ))}

                  {sentences.length > 0 && (
                    <TouchableOpacity
                      onPress={handleBackToForm}
                      activeOpacity={0.8}
                      className="self-center rounded-full py-3.5 px-8 flex-row items-center justify-center bg-[#7C3AED] mt-2 shadow-md shadow-[#FFB500]/30"
                    >
                      <Sparkles size={20} color="#fff" />
                      <Text className="text-white font-bold text-base ml-2">
                        Tạo lại
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
