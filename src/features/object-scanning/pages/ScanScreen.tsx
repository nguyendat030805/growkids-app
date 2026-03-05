import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions, FlashMode } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ScannerOverlay } from "../components/ScannerOverlay";

export default function ScanScreen() {
  const navigation = useNavigation<any>();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState<FlashMode>("off");

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-6">
        <Text className="text-center text-gray-600 font-medium">
          Bé ơi, mở Camera để cùng khám phá nhé! 📸
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="mt-6 rounded-2xl bg-[#A2D900] px-8 py-4 shadow-sm"
        >
          <Text className="font-bold text-white">Cho phép truy cập</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCapture = async () => {
    if (cameraRef.current && !loading) {
      setLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.5,
        });
        if (photo?.base64) {
          navigation.navigate("ResultPage", { imageBase64: photo.base64 });
        }
      } catch (error) {
        console.error("Lỗi chụp ảnh:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      navigation.navigate("ResultPage", {
        imageBase64: result.assets[0].base64,
      });
    }
  };

  const toggleFlash = () => {
    setFlash((current) => (current === "off" ? "on" : "off"));
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        flash={flash}
      />

      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-6 pt-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-11 w-11 items-center justify-center rounded-full bg-black/40"
          >
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleFlash}
            className={`h-11 w-11 items-center justify-center rounded-full ${flash === "on" ? "bg-orange-400" : "bg-black/40"}`}
          >
            <Ionicons
              name={flash === "on" ? "flash" : "flash-outline"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center justify-center">
          <ScannerOverlay />
        </View>

        <View className="mb-10 flex-row items-center justify-around px-8">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="h-14 w-14 items-center justify-center rounded-full bg-white/20"
          >
            <Ionicons name="home-outline" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCapture}
            disabled={loading}
            className={`h-24 w-24 items-center justify-center rounded-full border-4 border-white shadow-2xl ${loading ? "opacity-50" : ""}`}
          >
            <View className="h-20 w-20 rounded-full bg-[#A8D400]" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickImage}
            className="h-14 w-14 items-center justify-center rounded-full bg-white/20"
          >
            <Ionicons name="images-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading && (
        <View
          style={StyleSheet.absoluteFillObject}
          className="items-center justify-center bg-black/80"
        >
          <ActivityIndicator size="large" color="#A2D900" />
          <Text
            style={{
              shadowColor: "#A2D900",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
            }}
            className="mt-4 text-xl font-black text-[#A2D900]"
          >
            ĐANG NHẬN DIỆN...
          </Text>
        </View>
      )}
    </View>
  );
}
