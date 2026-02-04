import { ImageSourcePropType } from "react-native/Libraries/Image/Image";

export interface Song {
  id: number;
  title: string;
  thumbnail: ImageSourcePropType;
  duration: string;
  views: string;
  category: "Body" | "School";
}
