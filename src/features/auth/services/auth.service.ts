import apiClient from "../../../core/services/apiClient";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const res = await apiClient.post("/auth/login", payload);
  return res.data;
};
