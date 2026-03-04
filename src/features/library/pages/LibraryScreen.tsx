import { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Volume2, Mic, Sparkles, MicOff } from "lucide-react-native";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

import { Difficulty, Sentence } from "../types/LibraryType";
import { TOPICS, SENTENCES } from "../data/mockSentences";
import { AISentenceModal } from "../components/AISentenceModal";

const DIFFICULTIES: { key: Difficulty; label: string }[] = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "advanced", label: "Advanced" },
];

const LIBRARY_ICON = require("@/public/assets/images/imgStory.png");

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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View
          style={{
            alignItems: "center",
            paddingTop: 16,
            paddingBottom: 8,
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text
                style={{ fontSize: 24, fontWeight: "800", color: "#1C2B6D" }}
              >
                Sentence Library
              </Text>
              <Text style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>
                Daily English Communication
              </Text>
            </View>
            <Image
              source={LIBRARY_ICON}
              style={{ width: 56, height: 56, borderRadius: 12 }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Topic Tabs */}
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
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 999,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderWidth: 1,
                  backgroundColor: isActive ? "#fff" : "#F9FAFB",
                  borderColor: isActive ? "#1C2B6D" : "#E5E7EB",
                }}
              >
                <Text style={{ fontSize: 16, marginRight: 6 }}>
                  {topic.emoji}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: isActive ? "#1C2B6D" : "#6B7280",
                  }}
                >
                  {topic.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Difficulty Tabs */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 16,
            marginTop: 4,
            backgroundColor: "#F3F4F6",
            borderRadius: 12,
            padding: 4,
          }}
        >
          {DIFFICULTIES.map((d) => {
            const isActive = selectedDifficulty === d.key;
            return (
              <TouchableOpacity
                key={d.key}
                onPress={() => setSelectedDifficulty(d.key)}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  backgroundColor: isActive ? "#1C2B6D" : "transparent",
                  ...(isActive
                    ? {
                        shadowColor: "#1C2B6D",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 3,
                      }
                    : {}),
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: isActive ? "#fff" : "#6B7280",
                  }}
                >
                  {d.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* AI Sentence Generator Button */}
        <View style={{ marginHorizontal: 16, marginTop: 16, marginBottom: 8 }}>
          <TouchableOpacity
            onPress={() => setShowAIModal(true)}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#FFB500",
              borderRadius: 999,
              paddingVertical: 12,
              paddingHorizontal: 24,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#FFB500",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.35,
              shadowRadius: 6,
              elevation: 5,
            }}
          >
            <Sparkles size={18} color="#fff" />
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 16,
                marginLeft: 8,
              }}
            >
              AI Sentence Generator
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sentence Cards */}
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          {filteredSentences.length > 0 ? (
            filteredSentences.map((sentence) => {
              const isRecording = recordingId === sentence.id;
              const isSpeaking = speakingId === sentence.id;

              return (
                <View
                  key={sentence.id}
                  style={{
                    backgroundColor: "#2B5DA0",
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 16,
                    shadowColor: "#2B5DA0",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 17,
                        fontWeight: "700",
                        flex: 1,
                        marginRight: 12,
                        lineHeight: 24,
                      }}
                    >
                      {sentence.english}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleSpeak(sentence)}
                      activeOpacity={0.7}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isSpeaking
                          ? "#FFB500"
                          : "rgba(255,255,255,0.2)",
                      }}
                    >
                      <Volume2 size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: 14,
                      lineHeight: 20,
                      marginBottom: 8,
                    }}
                  >
                    {sentence.vietnamese}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFB500",
                        fontSize: 13,
                        fontStyle: "italic",
                        flex: 1,
                        marginRight: 12,
                        lineHeight: 20,
                      }}
                    >
                      {sentence.phonetic}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleTrySaying(sentence.id)}
                      activeOpacity={0.8}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 999,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        backgroundColor: isRecording ? "#EF4444" : "#FF8C00",
                      }}
                    >
                      {isRecording ? (
                        <MicOff size={16} color="#fff" />
                      ) : (
                        <Mic size={16} color="#fff" />
                      )}
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          fontSize: 12,
                          marginLeft: 6,
                        }}
                      >
                        {isRecording ? "Stop" : "Try saying"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={{ alignItems: "center", paddingVertical: 48 }}>
              <Text style={{ color: "#9CA3AF", fontSize: 16 }}>
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
