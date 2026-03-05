import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../core/navigation/NavigationService";
import NotFoundScreen from "../core/pages/PageNotFound";
import MainTabsScreen from "../core/pages/MainTabsScreen";
import LoginScreen from "../features/auth/pages/LoginScreen";
import SongsRoute from "../features/minisong/routes/SongRoute";
import RegisterScreen from "../features/auth/pages/RegisterScreen";
import OnboardingPage from "../features/schedules/pages/OnboardingPage";
import GoldenTimeScreen from "../features/schedules/pages/GoldenTimeScreen";
import GoldenTimeSummaryScreen from "../features/schedules/pages/GoldenTimeSummaryScreen";

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
    </Stack.Navigator>
  );
}
