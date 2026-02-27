import apiClient from "@/src/core/services/apiClient";

import { APIResponse } from "../types/recording.type";

export const recordingService = {
  transcribeAudio: async (uri: string): Promise<APIResponse> => {
    const formData = new FormData();
    formData.append("audio", {
      uri,
      name: "recording.m4a",
      type: "audio/m4a",
    } as any);

    const res = await apiClient.post("/voice/transcribe", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000,
    });

    return res.data;
  },
};
