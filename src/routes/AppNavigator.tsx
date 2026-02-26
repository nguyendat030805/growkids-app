import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "../core/navigation/NavigationService";
import NotFoundScreen from "../core/pages/PageNotFound";
import LoginScreen from "../features/auth/pages/LoginScreen";
import OnboardingPage from "../features/schedules/pages/OnboardingPage";
import GoldenTimeSummaryScreen from "../features/schedules/pages/GoldenTimeSummaryScreen";
import GoldenTimeScreen from "../features/schedules/pages/GoldenTimeScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingPage} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
      <Stack.Screen name="MainHome" component={NotFoundScreen} />
      <Stack.Screen name="GoldenTime" component={GoldenTimeScreen} />
      <Stack.Screen
        name="GoldenTimeSummary"
        component={GoldenTimeSummaryScreen}
      />
    </Stack.Navigator>
  );
}
