import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import SongsPage from "../pages/indexMiniSongScreen";
// import SongDetailPage from "../pages/detailScreen";
// import songDetailPlayPage from "../pages/detailPlayScreen"
import CompletedScreen from "../pages/completedScreen";

const Stack = createNativeStackNavigator();

export const SongsRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Songs" component={SongsPage} /> */}
      {/* <Stack.Screen name="SongDetail" component={SongDetailPage} /> */}
      <Stack.Screen name="CompleteSong" component={CompletedScreen} />
      {/* <Stack.Screen name="SongDetailPlay" component={songDetailPlayPage}/> */}
    </Stack.Navigator>
  );
};
