import { useEffect, useState } from "react";
import { Story } from "../types/StoryType";
import { storyService } from "../services/story.service";

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await storyService.getStories();
      setStories(data);
    } catch (err) {
      setError("Failed to load stories");
      console.error("fetchStories error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return { stories, loading, error, refetch: fetchStories };
};
