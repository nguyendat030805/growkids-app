import { Song } from "@/src/features/minisong/types/Song.type";
import {
  createNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";

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

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const NavigationService = {
  navigate(name: keyof RootStackParamList, params?: object) {
    if (navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate(name, params);
    }
  },
  reset(name: keyof RootStackParamList) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name }] }),
      );
    } else {
      console.warn("Navigation is not ready yet!");
    }
  },
};
