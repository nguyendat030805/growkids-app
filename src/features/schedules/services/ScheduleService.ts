import apiClient from "@/src/core/services/apiClient";

export const scheduleService = {
  submitInitialSchedule: async (childId: string, payload: any) => {
    const res = await apiClient.post(`/children/${childId}/schedule`, payload);
    return res.data;
  },
};
