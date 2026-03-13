import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { User, LogOut } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import { STORAGE_KEYS } from "../constants";

interface UserData {
  fullName?: string;
  email?: string;
  avatar?: string;
}

export const Header = () => {
  const navigation = useNavigation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadUserFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (token) {
          const decoded: UserData = jwtDecode(token);
          setUserData(decoded);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    };
    loadUserFromToken();
  }, []);

  const displayName = userData?.fullName || "User";
  const avatarUri = userData?.avatar;

  const handleLogout = useCallback(async () => {
    setShowDropdown(false);

    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER,
    ]);

    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "Login" }] }),
    );
  }, [navigation]);

  const handleProfile = useCallback(() => {
    setShowDropdown(false);
    navigation.navigate("VisualSchedule" as never);
  }, [navigation]);

  return (
    <View>
      <View className="flex-row items-center justify-between px-3">
        <Image
          source={require("@/public/assets/images/logoGrowKids.png")}
          className="h-8 w-36"
          resizeMode="contain"
        />

        <TouchableOpacity
          className="flex-row items-center"
          activeOpacity={0.7}
          onPress={() => setShowDropdown((prev) => !prev)}
        >
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              className="w-8 h-8 rounded-full mr-2"
            />
          ) : (
            <View className="w-8 h-8 rounded-full bg-[#FFE4C4] items-center justify-center mr-2">
              <Text className="text-base">👦</Text>
            </View>
          )}

          <Text className="text-sm font-semibold text-[#1C2B6D]">
            {displayName}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="h-[2px] bg-[#B4D540] mt-3 rounded-full" />

      <Modal
        transparent
        visible={showDropdown}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <View className="flex-1">
          <Pressable
            className="absolute inset-0"
            onPress={() => setShowDropdown(false)}
          />

          <View
            style={{ top: insets.top + 48 }}
            className="absolute right-4 w-44 bg-white rounded-xl border border-gray-200 py-1 shadow-lg"
          >
            <TouchableOpacity
              className="flex-row items-center px-4 py-3"
              onPress={handleProfile}
              activeOpacity={0.7}
            >
              <User size={18} color="#1C2B6D" />
              <Text className="ml-3 text-sm font-medium text-[#1C2B6D]">
                Visual Schedule
              </Text>
            </TouchableOpacity>

            <View className="h-px bg-gray-100 mx-3" />

            <TouchableOpacity
              className="flex-row items-center px-4 py-3"
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <LogOut size={18} color="#EF4444" />
              <Text className="ml-3 text-sm font-medium text-red-500">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
