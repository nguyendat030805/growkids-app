import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CompletedScreen from "../pages/CompletedScreen";
import SongDetailPage from "../pages/DetailScreen";
import SongDetailPlayPage from "../pages/DetailPlayScreen";
import SongsPage from "../pages/MiniSongScreen";
import { Song } from "../types/Song.type";

export type MiniSongStackParamList = {
  Songs: undefined;
  Detail: { song: Song };
  DetailPlay: { song: Song };
  Complete: { song: Song };
};

const Stack = createNativeStackNavigator<MiniSongStackParamList>();

export default function SongsRoute() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Songs" component={SongsPage} />
      <Stack.Screen name="Detail" component={SongDetailPage} />
      <Stack.Screen name="DetailPlay" component={SongDetailPlayPage} />
      <Stack.Screen name="Complete" component={CompletedScreen} />
    </Stack.Navigator>
  );
}
