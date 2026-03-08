import { useMemo } from "react";
import { Story } from "../types/StoryType";

export const useStorySegments = (story: Story | undefined) => {
  const segments = useMemo(() => {
    if (!story?.story_segments) return [];
    return [...story.story_segments].sort(
      (a, b) => a.segment_order - b.segment_order,
    );
  }, [story]);

  return { segments };
};
