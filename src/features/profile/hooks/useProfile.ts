import { useState, useCallback } from "react";
import { ProfileService } from "../services/ProfileService";
import { UpdateUserPayloadDto } from "../types/UpdateUserPayload.type";
import { UpdateChildPayloadDto } from "../types/UpdateChildPayload.type";

export const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await ProfileService.getProfile();
      setProfile(res?.data ?? res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(
    async (payload: UpdateUserPayloadDto) => {
      try {
        setLoading(true);
        setError(null);
        const res = await ProfileService.updateUserInformation(payload);
        await fetchProfile();
        return res;
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to update user");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchProfile],
  );

  const updateChild = useCallback(
    async (payload: UpdateChildPayloadDto) => {
      try {
        setLoading(true);
        setError(null);
        const res = await ProfileService.updateChildInformation(payload);
        await fetchProfile();
        return res;
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to update child");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchProfile],
  );

  return { profile, loading, error, fetchProfile, updateUser, updateChild };
};
