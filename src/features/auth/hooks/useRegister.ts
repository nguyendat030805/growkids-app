import { useState } from "react";

import { register } from "../services/auth.service";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await register({ fullName, email, password });
      return response;
    } catch (error: any) {
      setError(error.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
};
