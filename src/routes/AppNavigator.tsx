import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../core/navigation/NavigationService";
import NotFoundScreen from "../core/pages/PageNotFound";
import MainTabsScreen from "../core/pages/MainTabsScreen";
import LoginScreen from "../features/auth/pages/LoginScreen";
import SongsRoute from "../features/minisong/routes/SongRoute";
import RegisterScreen from "../features/auth/pages/RegisterScreen";
import OnboardingPage from "../features/schedules/pages/OnboardingPage";
import GoldenTimeSummaryScreen from "../features/schedules/pages/GoldenTimeSummaryScreen";
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
      <Stack.Screen name="GoldenTime" component={GoldenTimeScreen} />
      <Stack.Screen
        name="GoldenTimeSummary"
        component={GoldenTimeSummaryScreen}
      />
      <Stack.Screen name="Songs" component={SongsRoute} />
      <Stack.Screen name="MainTabs" component={MainTabsScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
}
