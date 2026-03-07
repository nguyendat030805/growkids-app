export interface LyricLine {
  id: string;
  song_id: string;
  line_order: number;
  lyric_text: string;
  phonetic: string;
  start_time: number | null;
}

export interface LearningLog {
  learning_log_id: number;
  child_id: string;
  mini_song_id: string;
  story_id: string | null;
  slot_id: string;
  progress_percent: number;
  time_spent_seconds: number;
  last_position_seconds: number;
  is_completed: boolean;
  started_at: string;
  completed_at: string | null;
  last_accessed_at: string;
}

export interface Song {
  mini_song_id: string;
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  views: number;
  video_url: string;
  category: string;
  is_completed: boolean;
  last_listen_position: number;
  learningLogId: number;
  created_at: string;
  song_lyrics?: LyricLine[];
  learningLog?: LearningLog;
}
