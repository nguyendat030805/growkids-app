import apiClient from "@/src/core/services/apiClient";

export const HomepageService = {
  getDailyStats: async () => {
    const res = await apiClient.get("/users/daily-stats");
    return res.data.data;
  },

  getUserStreak: async () => {
    const res = await apiClient.get("/users/streak");
    return res.data.data;
  },

  updateStreak: async () => {
    const res = await apiClient.post("/users/streak");
    return res.data;
  },

  getContentStats: async () => {
    const res = await apiClient.get("/users/content-stats");
    return res.data.data;
  },
};
