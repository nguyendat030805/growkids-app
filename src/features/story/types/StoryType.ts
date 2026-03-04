export interface StorySegment {
  segment_id: number;
  story_id: number;
  segment_order: number;
  content_text: string | null;
  image_url: string | null;
  audio_url: string | null;
  interaction_type: string | null;
  created_at: string;
}

export interface Story {
  story_id: number;
  topic_id: number | null;
  title: string;
  age_min: number | null;
  age_max: number | null;
  duration_seconds: number | null;
  cover_image_url: string | null;
  is_active: boolean;
  created_at: string;
  story_segments: StorySegment[];
}

export interface CreateStoryPayload {
  topic: string;
  minAge: number;
  maxAge: number;
  length: number;
  type: string;
  prompt?: string;
}
