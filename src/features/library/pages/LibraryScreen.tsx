import { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { Volume2, Mic, Sparkles, MicOff } from "lucide-react-native";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

import { Difficulty, Sentence } from "../types/LibraryType";
import { TOPICS, SENTENCES } from "../datas/mockSentences";
import { AISentenceModal } from "../components/AISentenceModal";

const DIFFICULTIES: { key: Difficulty; label: string }[] = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "advanced", label: "Advanced" },
];

const LIBRARY_ICON = require("@/public/assets/images/imgLibraryIcon.png");

export default function LibraryScreen() {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0].id);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("advanced");
  const [showAIModal, setShowAIModal] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const filteredSentences = SENTENCES.filter(
    (s) => s.topicId === selectedTopic && s.difficulty === selectedDifficulty,
  );

  const handleSpeak = useCallback(async (sentence: Sentence) => {
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      Speech.stop();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(sentence.id);
    Speech.speak(sentence.english, {
      language: "en-US",
      rate: 0.85,
      onDone: () => setSpeakingId(null),
      onError: () => setSpeakingId(null),
      onStopped: () => setSpeakingId(null),
    });
  }, []);

  const handleTrySaying = useCallback(
    async (sentenceId: string) => {
      if (recordingId === sentenceId && recordingRef.current) {
        try {
          await recordingRef.current.stopAndUnloadAsync();
          await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
        } catch {}
        recordingRef.current = null;
        setRecordingId(null);
        Alert.alert(
          "Great job! 🎉",
          "Phát âm tốt lắm! Hãy tiếp tục luyện tập nhé!",
        );
        return;
      }

      if (recordingRef.current) {
        try {
          await recordingRef.current.stopAndUnloadAsync();
          await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
        } catch {}
        recordingRef.current = null;
        setRecordingId(null);
      }

      try {
        const perm = await Audio.requestPermissionsAsync();
        if (!perm.granted) {
          Alert.alert("Permission", "Cần quyền truy cập microphone để ghi âm");
          return;
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY,
        );
        recordingRef.current = recording;
        setRecordingId(sentenceId);
      } catch {
        Alert.alert("Error", "Không thể bắt đầu ghi âm");
      }
    },
    [recordingId],
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="items-center pt-4 pb-2 px-4">
          <View className="flex-row items-center justify-center">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-[#1C2B6D]">
                Sentence Library
              </Text>
              <Text className="text-sm text-gray-400 mt-1">
                Daily English Communication
              </Text>
            </View>
            <Image
              source={LIBRARY_ICON}
              className="w-14 h-14 rounded-xl"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Topic Tabs - dùng ScrollView thay FlatList để tránh conflict */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 8,
          }}
        >
          {TOPICS.map((topic) => {
            const isActive = selectedTopic === topic.id;
            return (
              <TouchableOpacity
                key={topic.id}
                onPress={() => setSelectedTopic(topic.id)}
                activeOpacity={0.7}
                className={
                  isActive
                    ? "flex-row items-center rounded-full px-4 py-2.5 border bg-white border-[#1C2B6D]"
                    : "flex-row items-center rounded-full px-4 py-2.5 border bg-gray-50 border-gray-200"
                }
              >
                <Text className="text-base mr-1.5">{topic.emoji}</Text>
                <Text
                  className={
                    isActive
                      ? "text-sm font-semibold text-[#1C2B6D]"
                      : "text-sm font-semibold text-gray-500"
                  }
                >
                  {topic.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Difficulty Tabs */}
        <View className="flex-row mx-4 mt-1 bg-gray-100 rounded-xl p-1">
          {DIFFICULTIES.map((d) => {
            const isActive = selectedDifficulty === d.key;
            return (
              <TouchableOpacity
                key={d.key}
                onPress={() => setSelectedDifficulty(d.key)}
                activeOpacity={0.8}
                className={
                  isActive
                    ? "flex-1 py-2.5 rounded-lg items-center bg-[#1C2B6D]/90"
                    : "flex-1 py-2.5 rounded-lg items-center bg-transparent"
                }
                style={isActive ? styles.difficultyActiveShadow : undefined}
              >
                <Text
                  className={
                    isActive
                      ? "text-sm font-semibold text-white"
                      : "text-sm font-semibold text-gray-500"
                  }
                >
                  {d.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* AI Sentence Generator Button */}
        <View className="mx-4 mt-4 mb-2">
          <TouchableOpacity
            onPress={() => setShowAIModal(true)}
            activeOpacity={0.8}
            className="bg-[#FFB500] rounded-full py-3 px-6 flex-row items-center justify-center"
            style={styles.aiButtonShadow}
          >
            <Sparkles size={18} color="#fff" />
            <Text className="text-white font-bold text-base ml-2">
              AI Sentence Generator
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sentence Cards */}
        <View className="px-4 mt-3">
          {filteredSentences.length > 0 ? (
            filteredSentences.map((sentence, index) => {
              const isRecording = recordingId === sentence.id;
              const isSpeaking = speakingId === sentence.id;
              const isNavy = index % 2 === 0;

              return (
                <View
                  key={sentence.id}
                  className={
                    isNavy
                      ? "bg-[#9EC800]/10 rounded-2xl p-4 mb-4"
                      : "bg-[#FFB500]/10 rounded-2xl p-4 mb-4"
                  }
                  style={styles.cardShadow}
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <Text
                      className={
                        isNavy
                          ? "text-black/80 text-[17px] font-bold flex-1 mr-3 leading-6"
                          : "text-black/80 text-[17px] font-bold flex-1 mr-3 leading-6"
                      }
                    >
                      {sentence.english}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleSpeak(sentence)}
                      activeOpacity={0.7}
                      className={
                        isSpeaking
                          ? "w-10 h-10 rounded-full items-center justify-center bg-[#FFB500]"
                          : isNavy
                            ? "w-10 h-10 rounded-full items-center justify-center bg-[#9EC800]"
                            : "w-10 h-10 rounded-full items-center justify-center bg-[#FFB500]"
                      }
                    >
                      <Volume2 size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <Text className="text-gray-700 text-sm leading-5 mb-2">
                    {sentence.vietnamese}
                  </Text>

                  <View className="flex-row items-end justify-between">
                    <Text
                      className={
                        isNavy
                          ? "text-[#9EC800] text-[13px] italic flex-1 mr-3 leading-5"
                          : "text-[#FFB500] text-[13px] italic flex-1 mr-3 leading-5"
                      }
                    >
                      {sentence.phonetic}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleTrySaying(sentence.id)}
                      activeOpacity={0.8}
                      className={
                        isRecording
                          ? "flex-row items-center rounded-full px-4 py-2 bg-red-500"
                          : isNavy
                            ? "flex-row items-center rounded-full px-4 py-2 bg-[#9EC800]"
                            : "flex-row items-center rounded-full px-4 py-2 bg-[#FFB500]"
                      }
                    >
                      {isRecording ? (
                        <MicOff size={16} color="#fff" />
                      ) : (
                        <Mic size={16} color="#fff" />
                      )}
                      <Text className="text-white font-semibold text-xs ml-1.5">
                        {isRecording ? "Stop" : "Try saying"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : (
            <View className="items-center py-12">
              <Text className="text-gray-400 text-base">
                Chưa có mẫu câu cho chủ đề này
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <AISentenceModal
        visible={showAIModal}
        onClose={() => setShowAIModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  difficultyActiveShadow: {
    shadowColor: "#1C2B6D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  aiButtonShadow: {
    shadowColor: "#FFB500",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },
  cardShadow: {
    shadowColor: "#2B5DA0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
});
