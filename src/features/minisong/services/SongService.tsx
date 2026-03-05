import { Song } from "../types/Song.type";
import apiClient from "@/src/core/services/apiClient";

export const SongsService = {
  getSongs: async (): Promise<Song[]> => {
    const res = await apiClient.get("/mini-songs");
    return res.data.data;
  },
  getSongById: async (songId: string): Promise<Song> => {
    const res = await apiClient.get(`/mini-songs/${songId}`);
    return res.data.data;
  },
};
