import { useEffect, useState } from "react";
import { StorySegment } from "../types/StoryType";
import { storyService } from "../services/story.service";

export const useStorySegments = (storyId: number) => {
  const [segments, setSegments] = useState<StorySegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await storyService.getStorySegments(storyId);
        setSegments(data);
      } catch (err) {
        setError("Failed to load story segments");
        console.error("fetchSegments error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSegments();
  }, [storyId]);

  return { segments, loading, error };
};
