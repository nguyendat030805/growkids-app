import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SongsPage from "../pages/index";
import SongDetailPage from "../pages/song-detail";

const Stack = createNativeStackNavigator();

export const SongsRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Songs" component={SongsPage} />
      <Stack.Screen name="SongDetail" component={SongDetailPage} />
    </Stack.Navigator>
  );
};
