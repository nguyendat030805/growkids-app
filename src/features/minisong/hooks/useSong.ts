import { useEffect, useState } from "react";
import { SongsService } from "../services/SongService";
import { Song } from "../types/Song.type";

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSongs = async () => {
      try {
        const data = await SongsService.getSongs();
        if (isMounted) {
          setSongs(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch songs");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSongs();

    return () => {
      isMounted = false;
    };
  }, []);

  return { songs, loading, error };
};

export const useSongById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSongById = async (songId: string): Promise<Song | null> => {
    setLoading(true);
    setError(null);
    try {
      const song = await SongsService.getSongById(songId);
      return song;
    } catch (err) {
      setError("Failed to fetch song");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getSongById, loading, error };
};
