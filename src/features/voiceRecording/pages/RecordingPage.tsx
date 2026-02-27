import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Audio } from "expo-av";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";

import { ResultCard } from "../components/ResultCard";
import { useRecording } from "../hooks/useRecording";
import { recordingService } from "../services/RecordingService";
import { AIResultData, SuggestionItem } from "../types/recording.type";

export default function RecordingPage() {
  const { isRecording, startRecording, stopRecording } = useRecording();
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState<AIResultData | null>(null);

  const playSound = async (base64String?: string) => {
    if (!base64String) return;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: `data:audio/mp3;base64,${base64String}` },
        { shouldPlay: true },
      );

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Lỗi phát âm thanh:", error);
    }
  };

  const handleSTTProcess = async () => {
    if (isRecording) {
      const uri = await stopRecording();
      if (!uri) return;
      setLoading(true);
      try {
        const response = await recordingService.transcribeAudio(uri);
        if (response && response.success && response.data) {
          setAiData(response.data);
          if (response.data.audioBase64) {
            await playSound(response.data.audioBase64);
          }
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 401) {
            Alert.alert(
              "Thông báo",
              "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.",
            );
          } else {
            Alert.alert("Lỗi kết nối", "Vui lòng kiểm tra Server!");
          }
        } else {
          console.error("Lỗi không xác định:", e);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setAiData(null);
      await startRecording();
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-100"
      contentContainerStyle={{ padding: 20, paddingTop: 50 }}
    >
      <View className="flex-row items-center mb-5 h-16">
        <TouchableOpacity className="p-1 z-10">
          <Ionicons name="chevron-back" size={28} color="#1E293B" />
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center justify-center relative h-full">
          <Text className="text-4xl font-extrabold text-slate-800">
            Nói & Học
          </Text>
          <Image
            source={require("../../../../assets/tải xuống (1).png")}
            className="w-16 h-16 rounded-full absolute right-0"
            resizeMode="contain"
          />
        </View>
      </View>

      <Text className="text-center text-slate-500 font-medium mb-6">
        Nói tiếng Việt và cùng nhau luyện tập Tiếng Anh
      </Text>

      <View className="bg-white p-8 rounded-[30px] items-center mb-6 shadow-sm border border-slate-50">
        <Text className="text-2xl font-bold text-slate-700 mb-6">
          Ghi âm giọng nói
        </Text>
        <TouchableOpacity
          className={`w-24 h-24 rounded-full justify-center items-center shadow-lg ${isRecording ? "bg-red-500 shadow-red-200" : "bg-amber-400 shadow-amber-200"}`}
          onPress={handleSTTProcess}
        >
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={44}
            color="white"
          />
        </TouchableOpacity>
        <Text className="mt-5 text-slate-400 text-center text-sm leading-5 px-4">
          {isRecording
            ? "Đang lắng nghe bé..."
            : "Nhấn nút để bắt đầu dịch nhé!"}
        </Text>
      </View>

      {loading && (
        <View className="my-6 items-center">
          <ActivityIndicator size="large" color="#FFB800" />
          <Text className="mt-3 text-amber-500 font-bold">
            AI đang chuẩn bị bài học...
          </Text>
        </View>
      )}

      {aiData && (
        <View className="mb-10">
          <ResultCard label="Bé đã nói:" content={aiData.input_text} />

          <ResultCard
            label="Tiếng Anh nói là:"
            content={aiData.english}
            sub={aiData.phonetic}
            isAI
            onPressSpeak={() => playSound(aiData.audioBase64)}
          />

          {aiData.suggestions &&
            Array.isArray(aiData.suggestions) &&
            aiData.suggestions.length > 0 && (
              <View className="mt-6">
                <Text className="text-xl font-bold mb-4 text-slate-800">
                  Các cách nói khác (Nhấn để nghe)
                </Text>

                {aiData.suggestions.map(
                  (item: SuggestionItem, index: number) => (
                    <TouchableOpacity
                      key={`suggest-${index}`}
                      className="bg-white p-5 rounded-3xl mb-4 border border-slate-200 shadow-sm active:opacity-70"
                      onPress={() => playSound(item.audioBase64)}
                    >
                      <View className="flex-row justify-between items-start mb-1">
                        <View className="flex-1">
                          <Text>Tiếng Anh</Text>
                          <Text className="text-lg font-bold text-indigo-600">
                            {item.english}
                          </Text>
                          <Text className="text-slate-400 text-sm italic">
                            {item.phonetic}
                          </Text>
                        </View>
                        <View className="bg-amber-100 p-2 rounded-full ml-2">
                          <Ionicons
                            name="volume-high"
                            size={18}
                            color="#FFB800"
                          />
                        </View>
                      </View>

                      <View className="mt-2 pt-2 border-t border-slate-50">
                        <Text>Bản dịch</Text>
                        <Text className="text-slate-600 text-lg font-bold mt-1 ">
                          {item.vietnamese}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            )}
        </View>
      )}
    </ScrollView>
  );
}
