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

      const response = await login({ email, password });

      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);

      return { success: true, error: null };
    } catch (e: any) {
      const errorMessage = e?.response?.data?.message ?? "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
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
