import apiClient from "@/src/core/services/apiClient";

export const scheduleService = {
  getScheduleStatus: async () => {
    const res = await apiClient.get(`/schedule`);
    return res.data;
  },

  submitInitialSchedule: async (payload: any) => {
    const res = await apiClient.post(`/schedule`, payload);
    return res.data;
  },
};
