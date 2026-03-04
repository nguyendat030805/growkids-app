import { Audio } from "expo-av";
import { useState, useEffect, useRef } from "react";

export const useRecording = () => {
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    return () => {
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync().catch(() => {});
      }
    };
  }, []);

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      recordingRef.current = recording;
      setIsRecording(true);
    } catch (err) {
      console.error("Lỗi khởi động ghi âm:", err);
    }
  }

  async function stopRecording() {
    if (!recordingRef.current) return null;

    try {
      setIsRecording(false);

      await recordingRef.current.stopAndUnloadAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      const uri = recordingRef.current.getURI();
      recordingRef.current = null;

      return uri;
    } catch (err) {
      console.error("Lỗi khi dừng ghi âm:", err);
      const uri = recordingRef.current?.getURI() || null;
      recordingRef.current = null;
      return uri;
    }
  }

  return { isRecording, startRecording, stopRecording };
};
