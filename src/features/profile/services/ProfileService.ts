import apiClient from "@/src/core/services/apiClient";
import { UpdateUserPayloadDto } from "../types/UpdateUserPayload.type";
import { UpdateChildPayloadDto } from "../types/UpdateChildPayload.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "@/src/core/constants";

export const ProfileService = {
  getProfile: async () => {
    const res = await apiClient.get("/users/me");
    return res.data;
  },

  updateUserInformation: async (payload: UpdateUserPayloadDto) => {
    const res = await apiClient.post("/users", payload);
    return res.data;
  },

  updateChildInformation: async (payload: UpdateChildPayloadDto) => {
    const childId = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CHILD_ID);
    const res = await apiClient.post(`/users/child/${childId}`, payload);
    return res.data;
  },
};
