import { Song } from "../types/Song";

export const SongsService = {
  fetchSongs: async (): Promise<Song[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "Head Shoulders Knees And Toes",
            thumbnail: require("../../../../public/assets/images/song-body.png"),
            duration: "4 min",
            views: "132M views",
            category: "Body",
          },
          {
            id: 2,
            title: "ABC song for Kids",
            thumbnail: require("../../../../public/assets/images/song-mid.png"),
            duration: "4.5 min",
            views: "227M views",
            category: "School",
          },
        ]);
      }, 1000);
    });
  },
};
