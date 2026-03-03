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
  NotFound: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ExperienceTab: undefined;
  VoiceTab: undefined;
  LibraryTab: undefined;
  ProfileTab: undefined;
};

export type ExperienceStackParamList = {
  ExperienceMain: undefined;
  Story: undefined;
  StoryPlayer: {
    storyId: number;
    title: string;
    duration: string;
  };
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
