import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "../core/navigation/NavigationService";
import NotFoundScreen from "../core/pages/PageNotFound";
import LoginScreen from "../features/auth/pages/LoginScreen";
import SongsRoute from "../features/minisong/routes/SongRoute";
import OnboardingPage from "../features/schedules/pages/OnboardingPage";
const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Songs"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingPage} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
      <Stack.Screen name="MainHome" component={NotFoundScreen} />
      <Stack.Screen name="GoldenTime" component={NotFoundScreen} />
      <Stack.Screen name="Songs" component={SongsRoute} />
    </Stack.Navigator>
  );
}
