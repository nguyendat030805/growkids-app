import { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Volume2, Mic, Sparkles, MicOff } from "lucide-react-native";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

import { Difficulty } from "../types/LibraryType";
import { AISentenceModal } from "../components/AISentenceModal";
import { useLibrary } from "../hooks/useLibrary";

const DIFFICULTIES: { key: Difficulty; label: string }[] = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "advanced", label: "Advanced" },
];

const LIBRARY_ICON = require("@/public/assets/images/imgLibraryIcon.png");

export default function LibraryScreen() {
  const {
    topics,
    sentences,
    loading,
    fetchTopics,
    fetchSentencesByTopic,
    checkPronunciation,
  } = useLibrary();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("easy");
  const [showAIModal, setShowAIModal] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [checkingPronunciation, setCheckingPronunciation] = useState<
    string | null
  >(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  useEffect(() => {
    if (topics.length > 0 && !selectedTopic) {
      setSelectedTopic(topics[0].topic_id || topics[0].id);
    }
  }, [topics, selectedTopic]);

  useEffect(() => {
    if (selectedTopic) {
      fetchSentencesByTopic(selectedTopic);
    }
  }, [selectedTopic, fetchSentencesByTopic]);

  const filteredSentences = (sentences || []).filter((s: any) => {
    const levelName =
      s.levels?.level_name?.toLowerCase() || s.difficulty?.toLowerCase() || "";
    const match = levelName === selectedDifficulty.toLowerCase();
    return match;
  });

  const handleSpeak = useCallback(async (sentence: any) => {
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      Speech.stop();
      setSpeakingId(null);
      return;
    }

    const sentenceId = sentence.sentence_id || sentence.id;
    const audioUrl = sentence.audio_url;
    const sentenceText =
      sentence.sentence_text || sentence.english_text || sentence.english;

    setSpeakingId(sentenceId);

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
          (status) => {
            if (status.isLoaded && status.didJustFinish) {
              setSpeakingId(null);
              sound.unloadAsync();
            }
          },
        );

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded === false && status.error) {
            setSpeakingId(null);
            sound.unloadAsync();
            Speech.speak(sentenceText, {
              language: "en-US",
              rate: 0.85,
              onDone: () => setSpeakingId(null),
              onError: () => setSpeakingId(null),
            });
          }
        });
      } catch (error) {
        Speech.speak(sentenceText, {
          language: "en-US",
          rate: 0.85,
          onDone: () => setSpeakingId(null),
          onError: () => setSpeakingId(null),
          onStopped: () => setSpeakingId(null),
        });
      }
    } else {
      Speech.speak(sentenceText, {
        language: "en-US",
        rate: 0.85,
        onDone: () => setSpeakingId(null),
        onError: () => setSpeakingId(null),
        onStopped: () => setSpeakingId(null),
      });
    }
  }, []);

  const handleTrySaying = useCallback(
    async (sentence: any) => {
      const sentenceId = sentence.sentence_id || sentence.id;
      const sentenceText =
        sentence.sentence_text || sentence.english_text || sentence.english;

      if (recordingId === sentenceId && recordingRef.current) {
        try {
          setCheckingPronunciation(sentenceId);
          await recordingRef.current.stopAndUnloadAsync();
          const uri = recordingRef.current.getURI();
          await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

          if (uri) {
            const result = await checkPronunciation(sentenceText, uri);

            if (result.success && result.data) {
              const accuracy = result.data.accuracy || 0;
              const feedback = result.data.feedback || "Good job!";
              const transcribedText = result.data.transcribedText || "";

              Alert.alert(
                accuracy >= 80
                  ? "Excellent! 🎉"
                  : accuracy >= 60
                    ? "Good! 👍"
                    : "Keep practicing! 💪",
                `Accuracy: ${accuracy}%\n\nYou said: "${transcribedText}"\n\n${feedback}`,
              );
            } else {
              Alert.alert(
                "Error",
                result.message || "Failed to check pronunciation",
              );
            }
          }
        } catch (error: any) {
          Alert.alert(
            "Error",
            error.message || "Failed to check pronunciation",
          );
        } finally {
          recordingRef.current = null;
          setRecordingId(null);
          setCheckingPronunciation(null);
        }
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
    [recordingId, checkPronunciation],
  );

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  if (loading && (topics.length === 0 || sentences.length === 0)) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#1C2B6D" />
        <Text className="text-gray-500 mt-4">Loading library...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 8,
          }}
        >
          {topics.map((topic: any) => {
            const topicId = topic.topic_id || topic.id;
            const isActive = selectedTopic === topicId;
            return (
              <TouchableOpacity
                key={topicId}
                onPress={() => handleTopicSelect(topicId)}
                activeOpacity={0.7}
                className={
                  isActive
                    ? "flex-row items-center rounded-full px-4 py-2.5 border bg-white border-[#1C2B6D]"
                    : "flex-row items-center rounded-full px-4 py-2.5 border bg-gray-50 border-gray-200"
                }
              >
                <Text className="text-base mr-1.5">{topic.emoji || "📚"}</Text>
                <Text
                  className={
                    isActive
                      ? "text-sm font-semibold text-[#1C2B6D]"
                      : "text-sm font-semibold text-gray-500"
                  }
                >
                  {topic.topic_name || topic.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

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

        <View className="px-4 mt-3">
          {loading && sentences.length === 0 ? (
            <View className="items-center py-12">
              <ActivityIndicator size="large" color="#1C2B6D" />
              <Text className="text-gray-500 mt-4">Loading sentences...</Text>
            </View>
          ) : filteredSentences.length > 0 ? (
            filteredSentences.map((sentence: any, index: number) => {
              const sentenceId = sentence.sentence_id || sentence.id;
              const isRecording = recordingId === sentenceId;
              const isSpeaking = speakingId === sentenceId;
              const isChecking = checkingPronunciation === sentenceId;
              const isNavy = index % 2 === 0;

              return (
                <View
                  key={sentenceId}
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
                      {sentence.sentence_text ||
                        sentence.english_text ||
                        sentence.english}
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
                    {sentence.meaning ||
                      sentence.vietnamese_text ||
                      sentence.vietnamese}
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
                      onPress={() => handleTrySaying(sentence)}
                      activeOpacity={0.8}
                      disabled={isChecking}
                      className={
                        isRecording
                          ? "flex-row items-center rounded-full px-4 py-2 bg-red-500"
                          : isNavy
                            ? "flex-row items-center rounded-full px-4 py-2 bg-[#9EC800]"
                            : "flex-row items-center rounded-full px-4 py-2 bg-[#FFB500]"
                      }
                    >
                      {isChecking ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : isRecording ? (
                        <MicOff size={16} color="#fff" />
                      ) : (
                        <Mic size={16} color="#fff" />
                      )}
                      <Text className="text-white font-semibold text-xs ml-1.5">
                        {isChecking
                          ? "Checking..."
                          : isRecording
                            ? "Stop"
                            : "Try saying"}
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
        onSuccess={() => {
          if (selectedTopic) {
            fetchSentencesByTopic(selectedTopic);
          }
        }}
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
