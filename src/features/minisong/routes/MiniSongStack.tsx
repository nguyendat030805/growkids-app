import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CompletedScreen from "../pages/CompletedScreen";
import DetailPlayScreen from "../pages/DetailPlayScreen";

export type MiniSongStackParamList = {
  DetailPlay: undefined;
  Completed: undefined;
};

const Stack = createNativeStackNavigator<MiniSongStackParamList>();

export default function MiniSongStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DetailPlay" component={DetailPlayScreen} />
      <Stack.Screen name="Completed" component={CompletedScreen} />
    </Stack.Navigator>
  );
}
