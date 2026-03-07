import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import { STORAGE_KEYS } from "../../../core/constants";
import { login } from "../services/auth.service";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await login({ email, password });

      await AsyncStorage.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        res.data.accessToken,
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.REFRESH_TOKEN,
        res.data.refreshToken,
      );

      if (res.data.user) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(res.data.user),
        );
      }

      return true;
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    error,
  };
};
