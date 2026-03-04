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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#F0F7F0",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: "90%",
              minHeight: "60%",
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 12,
              }}
            >
              {showResults ? (
                <TouchableOpacity
                  onPress={handleBackToForm}
                  style={{ marginRight: 8 }}
                >
                  <ChevronLeft size={24} color="#1C2B6D" />
                </TouchableOpacity>
              ) : null}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#1C2B6D",
                  flex: 1,
                }}
              >
                {showResults ? "Results" : "Create sentence patterns"}
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "rgba(0,0,0,0.08)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
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
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    padding: 20,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  {/* Topic */}
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: 8,
                    }}
                  >
                    Topic:
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                      borderRadius: 999,
                      paddingHorizontal: 16,
                      paddingVertical: 4,
                      marginBottom: 20,
                    }}
                  >
                    <Pen size={16} color="#9CA3AF" />
                    <TextInput
                      value={topic}
                      onChangeText={setTopic}
                      placeholder="Enter your topic..."
                      placeholderTextColor="#9CA3AF"
                      style={{
                        flex: 1,
                        fontSize: 15,
                        color: "#1F2937",
                        paddingVertical: 10,
                        marginLeft: 10,
                      }}
                    />
                  </View>

                  {/* Level & Quantity */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 12,
                      marginBottom: 20,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          color: "#374151",
                          marginBottom: 8,
                        }}
                      >
                        Level:
                      </Text>
                      <TouchableOpacity
                        onPress={() => setShowLevelPicker(!showLevelPicker)}
                        activeOpacity={0.7}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderWidth: 1,
                          borderColor: "#E5E7EB",
                          borderRadius: 999,
                          paddingHorizontal: 16,
                          paddingVertical: 14,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            color: level ? "#1F2937" : "#9CA3AF",
                            fontWeight: level ? "500" : "400",
                          }}
                        >
                          {selectedLevelLabel}
                        </Text>
                        <ChevronDown size={18} color="#9CA3AF" />
                      </TouchableOpacity>

                      {showLevelPicker && (
                        <View
                          style={{
                            position: "absolute",
                            top: 80,
                            left: 0,
                            right: 0,
                            backgroundColor: "#fff",
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: "#E5E7EB",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.12,
                            shadowRadius: 8,
                            elevation: 8,
                            zIndex: 10,
                          }}
                        >
                          {LEVEL_OPTIONS.map((opt) => (
                            <TouchableOpacity
                              key={opt.key}
                              onPress={() => {
                                setLevel(opt.key);
                                setShowLevelPicker(false);
                              }}
                              style={{
                                paddingHorizontal: 16,
                                paddingVertical: 12,
                                backgroundColor:
                                  level === opt.key ? "#EFF6FF" : "transparent",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 15,
                                  color:
                                    level === opt.key ? "#1C2B6D" : "#374151",
                                  fontWeight: level === opt.key ? "600" : "400",
                                }}
                              >
                                {opt.label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          color: "#374151",
                          marginBottom: 8,
                        }}
                      >
                        Quantity:
                      </Text>
                      <TextInput
                        value={quantity}
                        onChangeText={setQuantity}
                        placeholder="Enter quantity..."
                        placeholderTextColor="#9CA3AF"
                        keyboardType="number-pad"
                        style={{
                          borderWidth: 1,
                          borderColor: "#E5E7EB",
                          borderRadius: 999,
                          paddingHorizontal: 16,
                          paddingVertical: 14,
                          fontSize: 15,
                          color: "#1F2937",
                        }}
                      />
                    </View>
                  </View>

                  {/* Goal */}
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: 8,
                    }}
                  >
                    Goal:
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                      borderRadius: 16,
                      paddingHorizontal: 16,
                      paddingVertical: 4,
                      minHeight: 100,
                      marginBottom: 24,
                    }}
                  >
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
                      style={{
                        flex: 1,
                        fontSize: 15,
                        color: "#1F2937",
                        paddingVertical: 10,
                        marginLeft: 10,
                        minHeight: 90,
                      }}
                    />
                  </View>

                  {/* Generate Button */}
                  <TouchableOpacity
                    onPress={handleGenerate}
                    disabled={loading || !topic.trim()}
                    activeOpacity={0.8}
                    style={{
                      borderRadius: 999,
                      paddingVertical: 14,
                      paddingHorizontal: 32,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",
                      backgroundColor:
                        loading || !topic.trim() ? "#C4B5FD" : "#7C3AED",
                      shadowColor: "#7C3AED",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 5,
                    }}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <>
                        <Sparkles size={20} color="#fff" />
                        <Text
                          style={{
                            color: "#fff",
                            fontWeight: "700",
                            fontSize: 16,
                            marginLeft: 8,
                          }}
                        >
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
                    <View style={{ alignItems: "center", paddingVertical: 32 }}>
                      <ActivityIndicator size="large" color="#7C3AED" />
                      <Text
                        style={{
                          marginTop: 12,
                          color: "#7C3AED",
                          fontWeight: "600",
                        }}
                      >
                        AI đang tạo mẫu câu...
                      </Text>
                    </View>
                  )}

                  {sentences.map((sentence) => (
                    <View
                      key={sentence.id}
                      style={{
                        backgroundColor: "#2B5DA0",
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 12,
                        shadowColor: "#2B5DA0",
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.2,
                        shadowRadius: 6,
                        elevation: 4,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          marginBottom: 6,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "700",
                            color: "#fff",
                            flex: 1,
                            marginRight: 10,
                            lineHeight: 22,
                          }}
                        >
                          {sentence.english}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleSpeak(sentence.english)}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            backgroundColor: "rgba(255,255,255,0.2)",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Volume2 size={18} color="#fff" />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,0.8)",
                          marginTop: 2,
                        }}
                      >
                        {sentence.vietnamese}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#FFB500",
                          marginTop: 6,
                          fontStyle: "italic",
                        }}
                      >
                        {sentence.phonetic}
                      </Text>
                    </View>
                  ))}

                  {sentences.length > 0 && (
                    <TouchableOpacity
                      onPress={handleBackToForm}
                      activeOpacity={0.8}
                      style={{
                        borderRadius: 999,
                        paddingVertical: 14,
                        paddingHorizontal: 32,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        marginTop: 8,
                        backgroundColor: "#7C3AED",
                        shadowColor: "#7C3AED",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 5,
                      }}
                    >
                      <Sparkles size={20} color="#fff" />
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                          fontSize: 16,
                          marginLeft: 8,
                        }}
                      >
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
