import { useEffect, useState, useCallback } from "react";
import { HomepageService } from "../services/HomepageService";

export const useUserData = () => {
  const [dailyStats, setDailyStats] = useState<any>(null);
  const [streak, setStreak] = useState<any>(null);
  const [contentStats, setContentStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await HomepageService.updateStreak();

      const [dailyRes, streakRes, contentStats] = await Promise.all([
        HomepageService.getDailyStats(),
        HomepageService.getUserStreak(),
        HomepageService.getContentStats(),
      ]);

      setDailyStats(dailyRes);
      setStreak(streakRes);
      setContentStats(contentStats);
      console.log("alo: ", contentStats);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    dailyStats,
    streak,
    contentStats,
    loading,
    error,
    refetch: fetchUserData,
  };
};
