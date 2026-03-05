import { Song } from "../types/Song.type";

export const SongsService = {
  fetchSongs: async (): Promise<Song[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "Head Shoulders Knees And Toes",
            thumbnail: require("../../../../public/assets/images/song-body.png"),
            duration: 4,
            views: 132000000,
            category: "Body",
            videoUrl: "https://youtube.com/watch?v=abc123",
            lyrics: [
              {
                title: "Head and shoulders knees and toes",
                sub: "/hed ænd ˈʃoʊldərz niːz ænd toʊz/",
              },
              { title: "Knees and toes", sub: "/niːz ænd toʊz/" },
              {
                title: "Head and shoulders knees and toes",
                sub: "/hed ænd ˈʃoʊldərz niːz ænd toʊz/",
              },
              { title: "Knees and toes", sub: "/niːz ænd toʊz/" },
            ],
          },
          {
            id: 2,
            title: "ABC song for Kids",
            thumbnail: require("../../../../public/assets/images/song-mid.png"),
            duration: 4.5,
            views: 227000000,
            category: "School",
            videoUrl: "https://youtube.com/watch?v=abc123",
            lyrics: [
              {
                title: "Head and shoulders knees and toes",
                sub: "/hed ænd ˈʃoʊldərz niːz ænd toʊz/",
              },
              { title: "Knees and toes", sub: "/niːz ænd toʊz/" },
              {
                title: "Head and shoulders knees and toes",
                sub: "/hed ænd ˈʃoʊldərz niːz ænd toʊz/",
              },
              { title: "Knees and toes", sub: "/niːz ænd toʊz/" },
            ],
          },
        ]);
      }, 1000);
    });
  },
};
