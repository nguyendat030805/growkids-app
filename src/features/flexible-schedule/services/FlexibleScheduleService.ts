import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "@/src/core/services/apiClient";
import { STORAGE_KEYS } from "@/src/core/constants";
import { Slot } from "../types/FlexibleScheduleType";

export const FlexibleService = {
  checkMissed: async (): Promise<Slot[]> => {
    try {
      const childId = await AsyncStorage.getItem(
        STORAGE_KEYS.SELECTED_CHILD_ID,
      );
      if (!childId) throw new Error("No child selected");

      const res = await apiClient.get(`/flexible-schedule/check/${childId}`);
      return res.data.data;
    } catch (error) {
      console.error("Failed to check missed slots:", error);
      return [];
    }
  },

  reschedule: async (slotId: string, routineId: string): Promise<Slot> => {
    try {
      const res = await apiClient.post(`/flexible-schedule/reschedule`, {
        slotId,
        routineId,
      });
      return res.data.data;
    } catch (error) {
      console.error("Failed to reschedule slot:", error);
      throw error;
    }
  },
};
