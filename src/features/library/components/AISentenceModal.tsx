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
  StyleSheet,
} from "react-native";
import {
  X,
  Sparkles,
  Volume2,
  ChevronLeft,
  ChevronDown,
  Pen,
  Target,
} from "lucide-react-native";
import * as Speech from "expo-speech";

import { Sentence, Difficulty } from "../types/LibraryType";
import { AI_MOCK_SENTENCES } from "../data/mockSentences";

interface AISentenceModalProps {
  visible: boolean;
  onClose: () => void;
}

const LEVEL_OPTIONS: { key: Difficulty; label: string }[] = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "advanced", label: "Advanced" },
];

export function AISentenceModal({ visible, onClose }: AISentenceModalProps) {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState<Difficulty | null>(null);
  const [quantity, setQuantity] = useState("");
  const [goal, setGoal] = useState("");
  const [showLevelPicker, setShowLevelPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setSentences([]);
    setTimeout(() => {
      const count = parseInt(quantity) || 3;
      const mockResults: Sentence[] = AI_MOCK_SENTENCES.slice(
        0,
        Math.min(count, AI_MOCK_SENTENCES.length),
      );
      setSentences(mockResults);
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const handleSpeak = (text: string) => {
    Speech.speak(text, { language: "en-US", rate: 0.85 });
  };

  const handleClose = () => {
    setTopic("");
    setLevel(null);
    setQuantity("");
    setGoal("");
    setSentences([]);
    setShowResults(false);
    setShowLevelPicker(false);
    setLoading(false);
    onClose();
  };

  const handleBackToForm = () => {
    setShowResults(false);
    setSentences([]);
  };

  const selectedLevelLabel =
    LEVEL_OPTIONS.find((l) => l.key === level)?.label ?? "Level";
  const canGenerate = topic.trim().length > 0 && !loading;

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
            {/* Header */}
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
                <View
                  className="bg-white rounded-[20px] p-5"
                  style={styles.formCard}
                >
                  {/* Topic */}
                  <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                    Topic:
                  </Text>
                  <View className="flex-row items-center border border-gray-200 rounded-full px-4 py-1 mb-5">
                    <Pen size={16} color="#9CA3AF" />
                    <TextInput
                      value={topic}
                      onChangeText={setTopic}
                      placeholder="Enter your topic..."
                      placeholderTextColor="#9CA3AF"
                      className="flex-1 text-[15px] text-gray-800 py-2.5 ml-2.5"
                    />
                  </View>

                  {/* Level & Quantity */}
                  <View className="flex-row mb-5" style={{ gap: 12 }}>
                    <View className="flex-1">
                      <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                        Level:
                      </Text>
                      <TouchableOpacity
                        onPress={() => setShowLevelPicker(!showLevelPicker)}
                        activeOpacity={0.7}
                        className="flex-row items-center justify-between border border-gray-200 rounded-full px-4 py-3.5"
                      >
                        <Text
                          className={
                            level
                              ? "text-[15px] text-gray-800 font-medium"
                              : "text-[15px] text-gray-400"
                          }
                        >
                          {selectedLevelLabel}
                        </Text>
                        <ChevronDown size={18} color="#9CA3AF" />
                      </TouchableOpacity>

                      {showLevelPicker && (
                        <View
                          className="absolute top-20 left-0 right-0 bg-white rounded-xl border border-gray-200 z-10"
                          style={styles.dropdown}
                        >
                          {LEVEL_OPTIONS.map((opt) => (
                            <TouchableOpacity
                              key={opt.key}
                              onPress={() => {
                                setLevel(opt.key);
                                setShowLevelPicker(false);
                              }}
                              className={
                                level === opt.key
                                  ? "px-4 py-3 bg-blue-50"
                                  : "px-4 py-3 bg-transparent"
                              }
                            >
                              <Text
                                className={
                                  level === opt.key
                                    ? "text-[15px] text-[#1C2B6D] font-semibold"
                                    : "text-[15px] text-gray-700"
                                }
                              >
                                {opt.label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>

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
                        className="border border-gray-200 rounded-full px-4 py-3.5 text-[15px] text-gray-800"
                      />
                    </View>
                  </View>

                  {/* Goal */}
                  <Text className="text-[15px] font-semibold text-gray-700 mb-2">
                    Goal:
                  </Text>
                  <View className="flex-row items-start border border-gray-200 rounded-2xl px-4 py-1 min-h-[100px] mb-6">
                    <Target
                      size={16}
                      color="#9CA3AF"
                      style={{ marginTop: 14 }}
                    />
                    <TextInput
                      value={goal}
                      onChangeText={setGoal}
                      placeholder="Enter your goal..."
                      placeholderTextColor="#9CA3AF"
                      multiline
                      textAlignVertical="top"
                      className="flex-1 text-[15px] text-gray-800 py-2.5 ml-2.5 min-h-[90px]"
                    />
                  </View>

                  {/* Generate Button */}
                  <TouchableOpacity
                    onPress={handleGenerate}
                    disabled={!canGenerate}
                    activeOpacity={0.8}
                    className={
                      canGenerate
                        ? "self-center rounded-full py-3.5 px-8 flex-row items-center justify-center bg-[#FFB500]"
                        : "self-center rounded-full py-3.5 px-8 flex-row items-center justify-center bg-[#FFB500]/50"
                    }
                    style={styles.generateShadow}
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
                /* Results */
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
                      className="bg-[#2B5DA0] rounded-2xl p-4 mb-3"
                      style={styles.resultCardShadow}
                    >
                      <View className="flex-row items-start justify-between mb-1.5">
                        <Text className="text-base font-bold text-white flex-1 mr-2.5 leading-[22px]">
                          {sentence.english}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleSpeak(sentence.english)}
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
                      className="self-center rounded-full py-3.5 px-8 flex-row items-center justify-center bg-[#7C3AED] mt-2"
                      style={styles.generateShadow}
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

const styles = StyleSheet.create({
  formCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  dropdown: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  generateShadow: {
    shadowColor: "#FFB500",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resultCardShadow: {
    shadowColor: "#2B5DA0",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
});
