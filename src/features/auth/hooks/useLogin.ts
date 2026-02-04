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

      const data = await login({ email, password });

      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);

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
