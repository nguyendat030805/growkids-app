import AsyncStorage from "@react-native-async-storage/async-storage";
import { Song } from "../types/Song.type";
import apiClient from "@/src/core/services/apiClient";
import { STORAGE_KEYS } from "@/src/core/constants";

export const SongsService = {
  getSongs: async (): Promise<Song[]> => {
    const childId = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CHILD_ID);
    const res = await apiClient.get(`/mini-songs?childId=${childId}`);
    return res.data.data;
  },
  getSongById: async (songId: string): Promise<Song> => {
    const childId = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CHILD_ID);
    const res = await apiClient.get(`/mini-songs/${songId}?childId=${childId}`);
    return res.data.data;
  },
  updateLearningLog: async (
    learningLogId: string,
    timeSpentSeconds: number,
    lastPositionSeconds: number,
    isCompleted: boolean,
  ) => {
    try {
      const response = await apiClient.patch(
        `/mini-songs/learning-log/${learningLogId}`,
        {
          time_spent_seconds: timeSpentSeconds,
          last_position_seconds: lastPositionSeconds,
          isCompleted,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update learning log:", error);
      throw error;
    }
  },
};
