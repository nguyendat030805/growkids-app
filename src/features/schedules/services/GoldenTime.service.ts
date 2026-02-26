import apiClient from "@/src/core/services/apiClient";

import { SubmitGoldenTimePayload } from "../types/GoldenTimeType";

export const goldenTimeService = {
  getGoldenTime: async (childId: string) => {
    const res = await apiClient.get(`/golden-time/${childId}`);
    return res.data.data;
  },
  submitGoldenTime: async (payload: SubmitGoldenTimePayload[]) => {
    await apiClient.post(`/golden-time`, payload);
    return true;
  },
};
