import { useState } from "react";
import { Audio } from "expo-av";
import { ObjectScanningService } from "../services/ObjectScanningService";
import { ObjectScanningResult } from "../types/scanningResult.type";

export const useObjectScanning = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ObjectScanningResult | null>(null);

  const handleScan = async (imageBase64: string) => {
    setLoading(true);
    try {
      const response: any = await ObjectScanningService.identify(imageBase64);

      const actualData = response.data;

      setResult(actualData);

      if (actualData?.audioNameBase64) {
        await playSound(actualData.audioNameBase64);
      }
      return actualData;
    } catch {
      console.error("Lỗi quét đối tượng:");
    } finally {
      setLoading(false);
    }
  };

  const playSound = async (base64: string) => {
    if (!base64) return;
    try {
      const cleanBase64 = base64.trim().replace(/\s/g, "");
      const uri = cleanBase64.startsWith("data:audio")
        ? cleanBase64
        : `data:audio/mp3;base64,${cleanBase64}`;

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true, volume: 1.0 },
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch {
      console.error("Lỗi phát âm thanh:");
    }
  };

  return { loading, result, handleScan, playSound };
};
