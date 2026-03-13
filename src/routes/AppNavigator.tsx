import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../core/navigation/NavigationService";
import NotFoundScreen from "../core/pages/PageNotFound";
import MainTabsScreen from "../core/pages/MainTabsScreen";
import LoginScreen from "../features/auth/pages/LoginScreen";
import OnboardingPage from "../features/schedules/pages/OnboardingPage";
import GoldenTimeSummaryScreen from "../features/schedules/pages/GoldenTimeSummaryScreen";
import HomepageScreen from "../features/homepage/pages/HomepageScreen";

import VisualScheduleScreen from "../features/visualSchedules/pages/VisualSheduleScreen";

import GoldenTimeScreen from "../features/schedules/pages/GoldenTimeScreen";
import ScanScreen from "../features/object-scanning/pages/ScanScreen";
import ResultScreen from "../features/object-scanning/pages/ResultScreen";
import SongDetailPlayScreen from "../features/minisong/pages/DetailPlayScreen";
import MiniSongScreen from "../features/minisong/pages/MiniSongScreen";
import RegisterScreen from "../features/auth/pages/RegisterScreen";
import NotificationsScreen from "../features/notifications/pages/NotificationsScreen";
import { useRegisterNotifications } from "../features/notifications/hooks/useRegisterNotifications";
import { NotificationProvider } from "../features/notifications/context/NotificationContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigatorContent() {
  useRegisterNotifications();

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
      <Stack.Screen name="Homepage" component={HomepageScreen} />
      <Stack.Screen name="Songs" component={MiniSongScreen} />
      <Stack.Screen name="DetailPlay" component={SongDetailPlayScreen} />
      <Stack.Screen name="MainTabs" component={MainTabsScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="VisualSchedule" component={VisualScheduleScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NotificationProvider>
      <AppNavigatorContent />
    </NotificationProvider>
  );
}
