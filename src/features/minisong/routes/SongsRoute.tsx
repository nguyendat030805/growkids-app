import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CompletedScreen from "../pages/CompletedScreen";
import SongDetailPlayPage from "../pages/DetailPlayScreen";
import SongDetailPage from "../pages/DetailScreen";
import SongsPage from "../pages/MiniSongScreen";
import { Song } from "../types/Song";

export type MiniSongStackParamList = {
  Songs: undefined;
  SongDetail: { song: Song };
  SongDetailPlay: { song: Song };
  SongComplete: { song: Song };
};

const Stack = createNativeStackNavigator<MiniSongStackParamList>();

export default function SongsRoute() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Songs" component={SongsPage} />
      <Stack.Screen name="SongDetail" component={SongDetailPage} />
      <Stack.Screen name="SongDetailPlay" component={SongDetailPlayPage} />
      <Stack.Screen name="SongComplete" component={CompletedScreen} />
    </Stack.Navigator>
  );
}
