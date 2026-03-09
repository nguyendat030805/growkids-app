import { useState } from "react";
import { Alert } from "react-native";
import { storyService } from "../services/story.service";
import { Story, CreateStoryPayload } from "../types/StoryType";
import { AIStoryParams } from "../components/AIStoryModal";

const parseAgeRange = (age: string): { minAge: number; maxAge: number } => {
  const [min, max] = age.split("-").map(Number);
  return { minAge: min || 3, maxAge: max || 6 };
};

const parseLengthToSeconds = (length: string): number => {
  const minutes = parseInt(length, 10);
  return isNaN(minutes) ? 120 : minutes * 60;
};

export const useCreateStory = (onSuccess?: (story: Story) => void) => {
  const [loading, setLoading] = useState(false);

  const createStory = async (params: AIStoryParams) => {
    const { minAge, maxAge } = parseAgeRange(params.age);
    const storyType =
      params.type === "other" && params.customType
        ? params.customType
        : params.type;

    const payload: CreateStoryPayload = {
      topic: params.topic,
      minAge,
      maxAge,
      length: parseLengthToSeconds(params.length),
      type: storyType,
      prompt: params.additionalPrompt || undefined,
    };

    try {
      setLoading(true);
      const story = await storyService.createStory(payload);
      Alert.alert("Success", "Story created successfully!");
      onSuccess?.(story);
    } catch (err) {
      console.error("createStory error:", err);
      Alert.alert("Error", "Failed to create story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { createStory, loading };
};
