import { ImageSourcePropType } from "react-native";

export interface Story {
  id: number;
  title: string;
  author: string;
  category: string;
  categoryColor: string;
  duration: string;
  content: string;
  image: ImageSourcePropType;
  isFavorite?: boolean;
}

export interface StorySegment {
  text: string;
  image: ImageSourcePropType;
  startTime: number;
  endTime: number;
}
