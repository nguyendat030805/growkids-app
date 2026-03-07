import { Song } from "@/src/features/minisong/types/Song.type";
import {
  createNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding: { childId: string };
  MainHome: undefined;
  Experience: undefined;
  Story: undefined;
  StoryPlayer: {
    storyId: number;
    title: string;
    duration: string;
  };
  GoldenTime: undefined;
  RecordingScreen: undefined;
  NotFound: undefined;
  GoldenTimeSummary: { selectedSlots: any[] };
  Songs: undefined;
  DetailPlay: { song: Song };
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const NavigationService = {
  navigate(name: keyof RootStackParamList, params?: object) {
    if (navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate(name, params);
    }
  },
  reset(name: string) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name }] }),
      );
    } else {
      console.warn("Navigation is not ready yet!");
    }
  },
};
