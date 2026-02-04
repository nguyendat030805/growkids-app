// import { LoginRoute } from "../features/auth/routes/LoginRoute";
import { SongsRoute } from "../features/minisong/routes/SongsRoute";
// import SongDetailPage from "../features/minisong/pages/song-detail";
export default function AppNavigator() {
  return (
    <>
      {/* <LoginRoute /> */}
      <SongsRoute />
      {/* <SongDetailPage /> */}
    </>
  );
}
