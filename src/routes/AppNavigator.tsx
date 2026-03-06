import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../core/navigation/NavigationService";
import NotFoundScreen from "../core/pages/PageNotFound";
import LoginScreen from "../features/auth/pages/LoginScreen";
import SongsRoute from "../features/minisong/routes/SongRoute";
import OnboardingPage from "../features/schedules/pages/OnboardingPage";
import RecordingScreen from "../features/voiceRecording/pages/RecordingScreen";
import ExperienceScreen from "../features/experiences/pages/ExperienceScreen";
import RegisterScreen from "../features/auth/pages/RegisterScreen";
import StoryScreen from "../features/story/pages/StoryScreen";
import StoryPlayerScreen from "../features/story/pages/StoryPlayerScreen";
import GoldenTimeSummaryScreen from "../features/schedules/pages/GoldenTimeSummaryScreen";
import HomepageScreen from "../features/homepage/pages/HomepageScreen";
import GoldenTimeScreen from "../features/schedules/pages/GoldenTimeScreen";
import ScanScreen from "../features/object-scanning/pages/ScanScreen";
import ResultScreen from "../features/object-scanning/pages/ResultScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingPage} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
      <Stack.Screen name="RecordingScreen" component={RecordingScreen} />
      <Stack.Screen name="MainHome" component={HomepageScreen} />
      <Stack.Screen name="Experience" component={ExperienceScreen} />
      <Stack.Screen name="Story" component={StoryScreen} />
      <Stack.Screen name="StoryPlayer" component={StoryPlayerScreen} />
      <Stack.Screen name="GoldenTime" component={GoldenTimeScreen} />
      <Stack.Screen
        name="GoldenTimeSummary"
        component={GoldenTimeSummaryScreen}
      />
      <Stack.Screen name="Songs" component={SongsRoute} />
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
}
