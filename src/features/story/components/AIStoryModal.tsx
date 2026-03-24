import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Pencil } from "lucide-react-native";

const TOPICS = [
  { id: "animals", label: "Animals", emoji: "🐾" },
  { id: "family", label: "Family", emoji: "👨‍👩‍👧" },
  { id: "school", label: "School", emoji: "🏫" },
  { id: "daily_routine", label: "Daily Routine", emoji: "⏰" },
  { id: "feelings", label: "Feelings", emoji: "🎭" },
];

const AGE_OPTIONS = ["3-4.5", "4.5-6", "6-7.5", "7.5-9"];

const LENGTH_OPTIONS = ["1 min", "2 min", "3 min", "4 min"];

const STORY_TYPES = [
  { id: "fairy_tales", label: "Fairy Tales", emoji: "🧚", bg: "#E8E0F0" },
  { id: "life_lessons", label: "Life Lessons", emoji: "📖", bg: "#FFF3D0" },
  { id: "adventure", label: "Adventure", emoji: "🗺️", bg: "#E0F0FF" },
  { id: "fantasy", label: "Fantasy", emoji: "🦄", bg: "#E8F5E0" },
  { id: "other", label: "Other", emoji: "✨", bg: "#F0F0F0" },
];

const MAX_CUSTOM_TYPE_LENGTH = 50;
const MAX_PROMPT_LENGTH = 300;

export interface AIStoryParams {
  topic: string;
  age: string;
  length: string;
  type: string;
  customType: string;
  additionalPrompt: string;
}

interface AIStoryModalProps {
  visible: boolean;
  onClose: () => void;
  onGenerate: (params: AIStoryParams) => void;
}

export function AIStoryModal({
  visible,
  onClose,
  onGenerate,
}: AIStoryModalProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const [selectedTopic, setSelectedTopic] = useState("animals");
  const [selectedAge, setSelectedAge] = useState("3-4.5");
  const [selectedLength, setSelectedLength] = useState("2 min");
  const [selectedType, setSelectedType] = useState("fairy_tales");
  const [customType, setCustomType] = useState("");
  const [customTypeError, setCustomTypeError] = useState("");
  const [additionalPrompt, setAdditionalPrompt] = useState("");
  const [promptError, setPromptError] = useState("");

  const resetForm = () => {
    setSelectedTopic("animals");
    setSelectedAge("3-4.5");
    setSelectedLength("2 min");
    setSelectedType("fairy_tales");
    setCustomType("");
    setCustomTypeError("");
    setAdditionalPrompt("");
    setPromptError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateCustomType = (value: string): boolean => {
    if (selectedType !== "other") return true;

    const trimmed = value.trim();
    if (!trimmed) {
      setCustomTypeError("Please enter a story type");
      return false;
    }
    if (trimmed.length < 2) {
      setCustomTypeError("Story type must be at least 2 characters");
      return false;
    }
    if (trimmed.length > MAX_CUSTOM_TYPE_LENGTH) {
      setCustomTypeError(`Maximum ${MAX_CUSTOM_TYPE_LENGTH} characters`);
      return false;
    }
    if (!/^[a-zA-Z\s\S]+$/.test(trimmed)) {
      setCustomTypeError("Please enter a valid story type");
      return false;
    }
    setCustomTypeError("");
    return true;
  };

  const validatePrompt = (value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) return true;

    if (trimmed.length < 3) {
      setPromptError("Prompt must be at least 3 characters");
      return false;
    }
    if (trimmed.length > MAX_PROMPT_LENGTH) {
      setPromptError(`Maximum ${MAX_PROMPT_LENGTH} characters`);
      return false;
    }
    setPromptError("");
    return true;
  };

  const handleCustomTypeChange = (value: string) => {
    const filtered = value.replace(/[0-9]/g, "");
    if (filtered.length <= MAX_CUSTOM_TYPE_LENGTH) {
      setCustomType(filtered);
      if (customTypeError) validateCustomType(filtered);
    }
  };

  const handlePromptChange = (value: string) => {
    if (value.length <= MAX_PROMPT_LENGTH) {
      setAdditionalPrompt(value);
      if (promptError) validatePrompt(value);
    }
  };

  const handleGenerate = () => {
    const isCustomTypeValid = validateCustomType(customType);
    const isPromptValid = validatePrompt(additionalPrompt);

    if (!isCustomTypeValid || !isPromptValid) {
      Alert.alert(
        "Please check your input",
        "Fix the highlighted errors before generating.",
      );
      return;
    }

    onGenerate({
      topic: selectedTopic,
      age: selectedAge,
      length: selectedLength,
      type: selectedType,
      customType: selectedType === "other" ? customType.trim() : "",
      additionalPrompt: additionalPrompt.trim(),
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="max-h-[92%]"
        >
          <View className="bg-[#F5F5F5] rounded-t-3xl">
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              bounces={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 30 }}
            >
              {/* Header */}
              <View className="items-center pt-4 pb-2">
                <Image
                  source={require("@/public/assets/images/logoGrowKids.png")}
                  className="h-20 w-40"
                  resizeMode="contain"
                />
              </View>

              {/* Title */}
              <View className="items-center mb-4 px-6">
                <Text className="text-2xl font-bold text-center">
                  <Text className="text-[#4CAF50]">Create a </Text>
                  <Text className="text-[#FF9800]">Story </Text>
                  <Text className="text-[#4CAF50]">with </Text>
                  <Text className="text-[#2196F3]">AI</Text>
                </Text>
              </View>

              {/* Topic Selection - single select */}
              <View className="px-6 mb-4">
                <Text className="text-base font-bold text-gray-800 mb-2">
                  Topic
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {TOPICS.map((topic) => {
                    const isSelected = selectedTopic === topic.id;
                    return (
                      <TouchableOpacity
                        key={topic.id}
                        onPress={() => setSelectedTopic(topic.id)}
                        activeOpacity={0.7}
                        className={`flex-row items-center rounded-full px-4 py-2 border ${
                          isSelected
                            ? "bg-[#E8F5E9] border-[#4CAF50]"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <Text className="text-base mr-1.5">{topic.emoji}</Text>
                        <Text
                          className={`text-sm font-semibold ${
                            isSelected ? "text-[#4CAF50]" : "text-gray-600"
                          }`}
                        >
                          {topic.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Age Selection - no Other */}
              <View className="px-6 mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-base font-bold text-gray-800">
                    Age Selection
                  </Text>
                  <Text className="text-sm text-gray-400">Years old</Text>
                </View>
                <View className="flex-row items-center bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {AGE_OPTIONS.map((age, idx) => {
                    const isSelected = selectedAge === age;
                    return (
                      <TouchableOpacity
                        key={age}
                        onPress={() => setSelectedAge(age)}
                        activeOpacity={0.7}
                        className={`flex-1 py-3 items-center ${
                          isSelected ? "bg-[#E8F5E9]" : ""
                        } ${idx < AGE_OPTIONS.length - 1 ? "border-r border-gray-100" : ""}`}
                      >
                        <Text
                          className={`text-sm font-bold ${
                            isSelected ? "text-[#4CAF50]" : "text-gray-500"
                          }`}
                        >
                          {age}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Story Length - no Other */}
              <View className="px-6 mb-4">
                <Text className="text-base font-bold text-gray-800 mb-2">
                  Story Length
                </Text>
                <View className="flex-row gap-2">
                  {LENGTH_OPTIONS.map((len) => {
                    const isSelected = selectedLength === len;
                    return (
                      <TouchableOpacity
                        key={len}
                        onPress={() => setSelectedLength(len)}
                        activeOpacity={0.7}
                        className={`flex-1 py-3 items-center rounded-xl border ${
                          isSelected
                            ? "bg-white border-[#4CAF50]"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <Text
                          className={`text-sm font-bold ${
                            isSelected ? "text-[#4CAF50]" : "text-gray-500"
                          }`}
                        >
                          {len}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Story Type */}
              <View className="px-6 mb-4">
                <Text className="text-base font-bold text-gray-800 mb-3">
                  Story Type
                </Text>
                <View className="flex-row flex-wrap justify-between">
                  {STORY_TYPES.map((type) => {
                    const isSelected = selectedType === type.id;
                    return (
                      <TouchableOpacity
                        key={type.id}
                        onPress={() => {
                          setSelectedType(type.id);
                          if (type.id !== "other") setCustomTypeError("");
                        }}
                        activeOpacity={0.7}
                        className="items-center mb-3"
                        style={{ width: "19%" }}
                      >
                        <View
                          className={`w-14 h-14 rounded-2xl items-center justify-center mb-1.5 ${
                            isSelected ? "border-2 border-[#4CAF50]" : ""
                          }`}
                          style={{ backgroundColor: type.bg }}
                        >
                          <Text className="text-xl">{type.emoji}</Text>
                        </View>
                        <Text
                          className={`text-[10px] font-semibold text-center ${
                            isSelected ? "text-[#4CAF50]" : "text-gray-500"
                          }`}
                          numberOfLines={2}
                        >
                          {type.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {selectedType === "other" && (
                  <View className="mt-1">
                    <TextInput
                      value={customType}
                      onChangeText={handleCustomTypeChange}
                      onBlur={() => validateCustomType(customType)}
                      onFocus={() =>
                        setTimeout(
                          () =>
                            scrollViewRef.current?.scrollToEnd({
                              animated: true,
                            }),
                          300,
                        )
                      }
                      placeholder="Enter story type..."
                      placeholderTextColor="#9CA3AF"
                      maxLength={MAX_CUSTOM_TYPE_LENGTH}
                      autoCorrect={false}
                      className={`bg-white border rounded-xl px-4 py-2.5 text-sm text-gray-800 ${
                        customTypeError ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    <View className="flex-row justify-between mt-1 px-1">
                      {customTypeError ? (
                        <Text className="text-xs text-red-500">
                          {customTypeError}
                        </Text>
                      ) : (
                        <View />
                      )}
                      <Text className="text-xs text-gray-400">
                        {customType.length}/{MAX_CUSTOM_TYPE_LENGTH}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Additional Prompt */}
              <View className="px-6 mb-5">
                <View className="flex-row items-center mb-2">
                  <Pencil size={16} color="#4CAF50" />
                  <Text className="text-base font-bold text-gray-800 ml-1.5">
                    Additional Prompt
                  </Text>
                  <Text className="text-xs text-gray-400 ml-1">(optional)</Text>
                </View>
                <TextInput
                  value={additionalPrompt}
                  onChangeText={handlePromptChange}
                  onBlur={() => validatePrompt(additionalPrompt)}
                  onFocus={() =>
                    setTimeout(
                      () =>
                        scrollViewRef.current?.scrollToEnd({ animated: true }),
                      300,
                    )
                  }
                  placeholder="E.g. Include a dragon character, set in a forest..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  maxLength={MAX_PROMPT_LENGTH}
                  className={`bg-white border rounded-xl px-4 py-3 text-sm text-gray-800 min-h-[80px] ${
                    promptError ? "border-red-400" : "border-gray-200"
                  }`}
                />
                <View className="flex-row justify-between mt-1 px-1">
                  {promptError ? (
                    <Text className="text-xs text-red-500">{promptError}</Text>
                  ) : (
                    <View />
                  )}
                  <Text className="text-xs text-gray-400">
                    {additionalPrompt.length}/{MAX_PROMPT_LENGTH}
                  </Text>
                </View>
              </View>

              {/* Generate Button */}
              <View className="px-6 mb-3">
                <TouchableOpacity
                  onPress={handleGenerate}
                  activeOpacity={0.8}
                  className="bg-[#4CAF50] rounded-full py-4 items-center"
                >
                  <Text className="text-white font-bold text-base">
                    Generate Story
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Cancel */}
              <TouchableOpacity
                onPress={handleClose}
                activeOpacity={0.7}
                className="items-center py-2"
              >
                <Text className="text-gray-400 text-sm font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
