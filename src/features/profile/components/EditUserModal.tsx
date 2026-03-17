import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { X } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";
import { UpdateUserPayloadDto } from "../types/UpdateUserPayload.type";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (payload: UpdateUserPayloadDto) => Promise<void>;
  user: {
    name: string;
    birth_date?: string;
    gender: string;
    avatar?: string | null;
  };
}

const GENDER_OPTIONS = ["Male", "Female", "Other"];

const formatDateInput = (text: string) => {
  const digits = text.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

const stripBase64Prefix = (base64: string) =>
  base64.replace(/^data:image\/\w+;base64,/, "");

export default function EditUserModal({
  visible,
  onClose,
  onSave,
  user,
}: Props) {
  const [name, setName] = useState(user.name);
  const [birthDate, setBirthDate] = useState(user.birth_date ?? "");
  const [gender, setGender] = useState(user.gender);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(user.avatar ?? null);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [saving, setSaving] = useState(false);

  const hasChanged =
    name !== user.name ||
    birthDate !== (user.birth_date ?? "") ||
    gender !== user.gender ||
    avatarChanged;

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please allow access to your photo library.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true,
      exif: false,
      width: 300,
      height: 300,
    });
    if (!result.canceled && result.assets[0]) {
      setAvatar(`data:image/jpeg;base64,${result.assets[0].base64}`);
      setAvatarChanged(true);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const [day, month, year] = birthDate.split("/");
      const parsedDate = new Date(`${year}-${month}-${day}`);
      await onSave({
        fullName: name,
        bird_date: parsedDate,
        gender,
        avatar_base64:
          avatarChanged && avatar ? stripBase64Prefix(avatar) : undefined,
      });
      onClose();
    } catch {
      Alert.alert("Error", "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end bg-black/40"
      >
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
        >
          <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-bold">Edit Profile</Text>
              <TouchableOpacity onPress={onClose}>
                <X size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View className="items-center mb-5">
              <View style={{ width: 96, height: 96 }}>
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <View
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 48,
                      overflow: "hidden",
                    }}
                  >
                    <LottieView
                      source={
                        gender === "Female"
                          ? require("@/public/assets/animation/avatar - female.json")
                          : require("@/public/assets/animation/avatar.json")
                      }
                      autoPlay
                      loop
                      style={{
                        width: 200,
                        height: 200,
                        marginTop: -52,
                        marginLeft: -52,
                      }}
                    />
                  </View>
                )}
              </View>
              <TouchableOpacity className="mt-2" onPress={handlePickImage}>
                <Text className="text-blue-500 text-sm">Change photo</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-sm text-gray-500 mb-1">Full name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
            />

            <Text className="text-sm text-gray-500 mb-1">Date of birth</Text>
            <TextInput
              value={birthDate}
              onChangeText={(t) => setBirthDate(formatDateInput(t))}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              maxLength={10}
              className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
            />

            <Text className="text-sm text-gray-500 mb-1">Gender</Text>
            <View className="mb-6">
              <TouchableOpacity
                onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                className="bg-gray-100 rounded-xl px-4 py-3 flex-row justify-between items-center"
              >
                <Text className={gender ? "text-black" : "text-gray-400"}>
                  {gender || "Select gender"}
                </Text>
                <Text className="text-gray-400">
                  {showGenderDropdown ? "▲" : "▼"}
                </Text>
              </TouchableOpacity>
              {showGenderDropdown && (
                <View className="bg-white border border-gray-200 rounded-xl mt-1 overflow-hidden shadow-sm">
                  {GENDER_OPTIONS.map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => {
                        setGender(option);
                        setShowGenderDropdown(false);
                      }}
                      className={`px-4 py-3 ${gender === option ? "bg-orange-50" : "bg-white"}`}
                    >
                      <Text
                        className={`text-sm ${
                          gender === option
                            ? "text-orange-400 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSave}
              disabled={saving || !hasChanged}
              className={`rounded-2xl py-4 items-center ${hasChanged ? "bg-orange-400" : "bg-gray-200"}`}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  className={`font-bold ${hasChanged ? "text-white" : "text-gray-400"}`}
                >
                  Save
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
