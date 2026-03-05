import { useState } from "react";
import { Audio } from "expo-av";
import { ObjectScanningService } from "../services/ObjectScanningService";
import { ObjectScanningResult } from "../types/scanningResult.type";

export const useObjectScanning = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ObjectScanningResult | null>(null);

  const handleScan = async (imageBase64: string) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await ObjectScanningService.identify(imageBase64);
      setResult(data);
      return data;
    } catch (error) {
      console.error("Lỗi quét vật thể:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const playSound = async (base64: string) => {
    if (!base64) return;
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: `data:audio/mp3;base64,${base64}` },
        { shouldPlay: true },
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Lỗi phát âm thanh:", error);
    }
  };

  return { loading, result, handleScan, playSound };
};
