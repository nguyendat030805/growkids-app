export interface LyricLine {
  id: string;
  song_id: string;
  line_order: number;
  lyric_text: string;
  phonetic: string;
}

export interface Song {
  mini_song_id: string;
  title: string;
  thumbnail: string;
  duration: number;
  views: number;
  video_url: string;
  category: string;
  created_at: string;
  song_lyrics?: LyricLine[];
}
