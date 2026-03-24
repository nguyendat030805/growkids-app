import apiClient from "@/src/core/services/apiClient";
import {
  DailyScheduleApiResponse,
  DailyScheduleResponseDto,
} from "../types/schedule.type";

export const scheduleService = {
  getDailySchedule: async (): Promise<DailyScheduleResponseDto> => {
    const res =
      await apiClient.get<DailyScheduleApiResponse>(`/schedule/daily`);
    return res.data.data;
  },
};
