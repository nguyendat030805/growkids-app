import apiClient from "@/src/core/services/apiClient";
import { ObjectScanningResult } from "../types/scanningResult.type";

export const ObjectScanningService = {
  identify: async (imageBase64: string): Promise<ObjectScanningResult> => {
    const res = await apiClient.post(
      "/object-scanning/identify",
      {
        imageBase64,
      },
      {
        timeout: 30000,
      },
    );
    return res.data;
  },
};
