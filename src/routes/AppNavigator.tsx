import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../core/navigation/NavigationService";
import NotFoundScreen from "../core/pages/PageNotFound";
import LoginScreen from "../features/auth/pages/LoginScreen";
import OnboardingPage from "../features/schedules/pages/OnboardingPage";
import RecordingScreen from "../features/voiceRecording/pages/RecordingScreen";
import GoldenTimeSummaryScreen from "../features/schedules/pages/GoldenTimeSummaryScreen";
import HomepageScreen from "../features/homepage/pages/HomepageScreen";
import VisualScheduleScreen from "../features/visualSchedules/pages/VisualSheduleScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingPage} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
      <Stack.Screen name="MainHome" component={HomepageScreen} />
      <Stack.Screen name="GoldenTime" component={NotFoundScreen} />
      <Stack.Screen name="RecordingScreen" component={RecordingScreen} />
      <Stack.Screen
        name="GoldenTimeSummary"
        component={GoldenTimeSummaryScreen}
      />
      <Stack.Screen name="VisualSchedule" component={VisualScheduleScreen} />
    </Stack.Navigator>
  );
}
