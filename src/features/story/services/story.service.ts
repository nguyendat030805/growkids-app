import { Story, StorySegment } from "../types/StoryType";
import { MOCK_STORIES, MOCK_STORY_SEGMENTS } from "../mocks/storyMock";

const SIMULATED_DELAY_MS = 300;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const storyService = {
  getStories: async (): Promise<Story[]> => {
    await delay(SIMULATED_DELAY_MS);
    return MOCK_STORIES;
  },

  getStorySegments: async (storyId: number): Promise<StorySegment[]> => {
    await delay(SIMULATED_DELAY_MS);
    return MOCK_STORY_SEGMENTS[storyId] ?? [];
  },
};
