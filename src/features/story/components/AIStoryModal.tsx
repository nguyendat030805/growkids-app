import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { ChevronDown, Pencil } from "lucide-react-native";

const TOPICS = [
  { id: "animals", label: "Animals", emoji: "🐾" },
  { id: "family", label: "Family", emoji: "👨‍👩‍👧" },
  { id: "school", label: "School", emoji: "🏫" },
  { id: "daily_routine", label: "Daily Routine", emoji: "⏰" },
  { id: "feelings", label: "Feelings", emoji: "🎭" },
  { id: "other", label: "Other", emoji: "✨" },
];

const AGE_OPTIONS = ["1-3", "3-4", "4-5", "Other"];

const LENGTH_OPTIONS = ["1 min", "2 min", "3 min", "Other"];

const STORY_TYPES = [
  { id: "fairy_tales", label: "Fairy Tales", emoji: "🧚", bg: "#E8E0F0" },
  { id: "life_lessons", label: "Life Lessons", emoji: "📖", bg: "#FFF3D0" },
  { id: "adventure", label: "Adventure", emoji: "🗺️", bg: "#E0F0FF" },
  { id: "fantasy", label: "Fantasy", emoji: "🦄", bg: "#E8F5E0" },
  { id: "other", label: "Other", emoji: "✨", bg: "#F0F0F0" },
];

export interface AIStoryParams {
  topics: string[];
  customTopic: string;
  age: string;
  customAge: string;
  length: string;
  customLength: string;
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
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["animals"]);
  const [customTopic, setCustomTopic] = useState("");
  const [selectedAge, setSelectedAge] = useState("3-4");
  const [customAge, setCustomAge] = useState("");
  const [selectedLength, setSelectedLength] = useState("2 min");
  const [customLength, setCustomLength] = useState("");
  const [selectedType, setSelectedType] = useState("fairy_tales");
  const [customType, setCustomType] = useState("");
  const [additionalPrompt, setAdditionalPrompt] = useState("");

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const handleGenerate = () => {
    onGenerate({
      topics: selectedTopics,
      customTopic,
      age: selectedAge,
      customAge,
      length: selectedLength,
      customLength,
      type: selectedType,
      customType,
      additionalPrompt,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-[#F5F5F5] rounded-t-3xl max-h-[92%]">
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            <View className="items-center pt-4 pb-2">
              <Image
                source={require("@/public/assets/images/logoGrowKids.png")}
                className="h-20 w-40"
                resizeMode="contain"
              />
            </View>

            <View className="items-center mb-4 px-6">
              <Text className="text-2xl font-bold text-center">
                <Text className="text-[#4CAF50]">Create a </Text>
                <Text className="text-[#FF9800]">Story </Text>
                <Text className="text-[#4CAF50]">with </Text>
                <Text className="text-[#2196F3]">AI</Text>
              </Text>
            </View>

            <View className="px-6 mb-4">
              <Text className="text-base font-bold text-gray-800 mb-2">
                Topic
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {TOPICS.map((topic) => {
                  const isSelected = selectedTopics.includes(topic.id);
                  return (
                    <TouchableOpacity
                      key={topic.id}
                      onPress={() => toggleTopic(topic.id)}
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
              {selectedTopics.includes("other") && (
                <TextInput
                  value={customTopic}
                  onChangeText={setCustomTopic}
                  placeholder="Enter your topic..."
                  placeholderTextColor="#9CA3AF"
                  className="mt-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800"
                />
              )}
            </View>

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
                <View className="px-3 py-3 border-l border-gray-200">
                  <ChevronDown size={18} color="#9CA3AF" />
                </View>
              </View>
              {selectedAge === "Other" && (
                <TextInput
                  value={customAge}
                  onChangeText={setCustomAge}
                  placeholder="Enter age range (e.g. 5-6)..."
                  placeholderTextColor="#9CA3AF"
                  className="mt-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800"
                />
              )}
            </View>

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
              {selectedLength === "Other" && (
                <TextInput
                  value={customLength}
                  onChangeText={setCustomLength}
                  placeholder="Enter story length (e.g. 5 min)..."
                  placeholderTextColor="#9CA3AF"
                  className="mt-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800"
                />
              )}
            </View>

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
                      onPress={() => setSelectedType(type.id)}
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
                <TextInput
                  value={customType}
                  onChangeText={setCustomType}
                  placeholder="Enter story type..."
                  placeholderTextColor="#9CA3AF"
                  className="mt-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800"
                />
              )}
            </View>

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
                onChangeText={setAdditionalPrompt}
                placeholder="E.g. Include a dragon character, set in a forest..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 min-h-[80px]"
              />
            </View>

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

            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              className="items-center py-2"
            >
              <Text className="text-gray-400 text-sm font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
