import { useEffect, useState } from "react";

import { SongsService } from "../services/SongService";
import { Song } from "../types/Song.type";

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSongs = async () => {
      const data = await SongsService.fetchSongs();
      setSongs(data);
      setLoading(false);
    };

    loadSongs();
  }, []);

  return { songs, loading };
};
