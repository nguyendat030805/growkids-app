import apiClient from "@/src/core/services/apiClient";
import { Story, CreateStoryPayload } from "../types/StoryType";

export const storyService = {
  getStories: async (): Promise<Story[]> => {
    const res = await apiClient.get("/stories");
    return res.data.data;
  },

  createStory: async (payload: CreateStoryPayload): Promise<Story> => {
    const res = await apiClient.post("/stories", payload);
    return res.data.data;
  },
};
