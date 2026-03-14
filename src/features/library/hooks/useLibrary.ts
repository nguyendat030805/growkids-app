import { useState, useCallback } from "react";
import { LibraryService } from "../services/LibraryService";
import { SentencePayloadDto } from "../types/SentencePayload";

export const useLibrary = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [sentences, setSentences] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await LibraryService.getTopics();
      const topicsData = res?.data || res || [];
      setTopics(topicsData);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch topics");
      setTopics([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSentencesByTopic = useCallback(async (topicId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await LibraryService.getSentencesByTopic(topicId);
      const sentencesData = res?.data || res || [];
      setSentences(sentencesData);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch sentences");
      setSentences([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkPronunciation = useCallback(
    async (sentence: string, audioUri: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await LibraryService.checkPronunciation(sentence, audioUri);

        return res;
      } catch (err: any) {
        setError(err?.message || "Pronunciation check failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createSentenceSet = useCallback(async (payload: SentencePayloadDto) => {
    try {
      setLoading(true);
      setError(null);

      const res = await LibraryService.createSentenceSet(payload);
      console.log("Create sentence set response:", res);
      return res;
    } catch (err: any) {
      setError(err?.message || "Create sentence set failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    topics,
    sentences,
    loading,
    error,
    fetchTopics,
    fetchSentencesByTopic,
    checkPronunciation,
    createSentenceSet,
  };
};
