import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "../core/navigation/NavigationService";
import NotFoundScreen from "../core/pages/PageNotFound";
import LoginScreen from "../features/auth/pages/LoginScreen";
import OnboardingPage from "../features/schedules/pages/OnboardingPage";
import HomepageScreen from "../features/homepage/pages/HomepageScreen";
import ExperienceScreen from "../features/experiences/pages/ExperienceScreen";
import RegisterScreen from "../features/auth/pages/RegisterScreen";
import StoryScreen from "../features/story/pages/StoryScreen";

const Stack = createStackNavigator<RootStackParamList>();

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
      <Stack.Screen name="MainHome" component={HomepageScreen} />
      <Stack.Screen name="Experience" component={ExperienceScreen} />
      <Stack.Screen name="GoldenTime" component={NotFoundScreen} />
      <Stack.Screen name="Story" component={StoryScreen} />
    </Stack.Navigator>
  );
}
