import { ImageSourcePropType } from "react-native";
export interface LyricLine {
  title: string;
  sub: string;
}
export interface Song {
  id: number;
  title: string;
  thumbnail: ImageSourcePropType;
  duration: number;
  views: number;
  category: "Body" | "School";
  videoUrl: string;
  lyrics: LyricLine[];
}
