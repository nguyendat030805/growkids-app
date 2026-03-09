import { useEffect, useState, useMemo } from "react";
import { SongsService } from "../services/SongService";
import { Song } from "../types/Song.type";

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadSongs = async () => {
    try {
      setLoading(true);
      const data = await SongsService.getSongs();
      setSongs(data);
    } catch (err) {
      setError("Failed to fetch songs");
    } finally {
      setLoading(false);
    }
  };

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songs;
    return songs.filter((song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [songs, searchQuery]);

  useEffect(() => {
    loadSongs();
  }, []);

  const refetch = () => {
    loadSongs();
  };

  return {
    songs: filteredSongs,
    loading,
    error,
    refetch,
    searchQuery,
    setSearchQuery,
  };
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
