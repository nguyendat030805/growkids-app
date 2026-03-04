import {
  createNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  Onboarding: { childId: string };
  MainHome: undefined;
  GoldenTime: undefined;
  RecordingScreen: undefined;
  NotFound: undefined;
  VisualSchedule: undefined;
  GoldenTimeSummary: { selectedSlots: any[] };
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
