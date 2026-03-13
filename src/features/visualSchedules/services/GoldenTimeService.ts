import apiClient from "@/src/core/services/apiClient";
import { GoldenTimeSlotDto } from "../types/golden-time.type";

export const goldenTimeService = {
  createManual: async (routineId: string, data: GoldenTimeSlotDto) => {
    const res = await apiClient.post(`/golden-time/${routineId}`, data);
    return res.data;
  },

  updateSlot: async (slotId: string, data: Partial<GoldenTimeSlotDto>) => {
    const res = await apiClient.patch(`/golden-time/${slotId}`, data);
    return res.data;
  },

  deleteSlot: async (slotId: string) => {
    return await apiClient.delete(`/golden-time/${slotId}`);
  },
};
