import { STORAGE_KEYS } from "@/src/core/constants";
import apiClient from "@/src/core/services/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SentencePayloadDto } from "../types/SentencePayload";

export const LibraryService = {
  getTopics: async () => {
    const childId = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CHILD_ID);
    const res = await apiClient.get(
      `/sentence-library/children/${childId}/topics`,
    );
    return res.data;
  },
  getSentencesByTopic: async (topicId: string) => {
    const childId = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CHILD_ID);
    const res = await apiClient.get(`/sentence-library/${childId}/${topicId}`);
    return res.data;
  },
  checkPronunciation: async (sentence: string, audioUri: string) => {
    const formData = new FormData();

    formData.append("audio", {
      uri: audioUri,
      type: "audio/m4a",
      name: "pronunciation.m4a",
    } as any);

    formData.append("sentence", sentence);

    const response = await apiClient.post(
      "/sentence-library/pronunciation-checks",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },
  createSentenceSet: async (payload: SentencePayloadDto) => {
    const { data } = await apiClient.post("/sentence-library", payload);
    return data;
  },
};
