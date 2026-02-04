import apiClient from "@/src/core/services/apiClient";

export const scheduleService = {
  submitInitialSchedule: async (payload: any) => {
    const res = await apiClient.post("/schedules/setup", payload);
    return res.data;
  },
};
