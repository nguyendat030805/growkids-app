import { Song } from "@/src/features/minisong/types/Song.type";
import { router } from "expo-router";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding: { childId: string };
  MainTabs: undefined;
  GoldenTime: undefined;
  GoldenTimeSummary: { selectedSlots: any[] };
  Songs: undefined;
  DetailPlay: { songId: number };
  ScanScreen: undefined;
  ResultScreen: { imageBase64: string };
  NotFound: undefined;
  VisualSchedule: undefined;
  Homepage: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ExperienceTab: undefined;
  ScanTab: undefined;
  VoiceTab: undefined;
  LibraryTab: undefined;
};

export type ExperienceStackParamList = {
  ExperienceMain: undefined;
  Story: undefined;
  StoryPlayer: {
    storyId: number;
  };
  GoldenTime: undefined;
  RecordingScreen: undefined;
  NotFound: undefined;
  VisualSchedule: undefined;
  GoldenTimeSummary: { selectedSlots: any[] };
  Songs: undefined;
  DetailPlay: { song: Song };
  ScanScreen: undefined;
  ResultScreen: { imageBase64: string };
};

export const NavigationService = {
  navigate(name: keyof RootStackParamList, params?: Record<string, any>) {
    try {
      if (params) {
        router.push({ pathname: `/${name.toLowerCase()}`, params });
      } else {
        router.push(`/${name.toLowerCase()}`);
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  },

  reset(name: keyof RootStackParamList) {
    try {
      router.replace(`/${name.toLowerCase()}`);
    } catch (error) {
      console.error("Navigation reset error:", error);
    }
  },

  handleNotificationNavigation(data: any) {
    try {
      if (data?.screen) {
        switch (data.screen) {
          case "notifications":
            router.push("/notifications");
            break;
          case "golden-time":
            router.push("/goldentime");
            break;
          case "songs":
            router.push("/songs");
            break;
          case "main-tabs":
            router.push("/maintabs");
            break;
          default:
            console.log("Unknown notification screen:", data.screen);
        }
      } else {
        router.push("/notifications");
      }
    } catch (error) {
      console.error("Error handling notification navigation:", error);
    }
  },
};
