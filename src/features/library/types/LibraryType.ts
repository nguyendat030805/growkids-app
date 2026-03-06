export type Difficulty = "easy" | "medium" | "advanced";

export interface Topic {
  id: string;
  name: string;
  emoji: string;
}

export interface Sentence {
  id: string;
  topicId: string;
  difficulty: Difficulty;
  english: string;
  vietnamese: string;
  phonetic: string;
}
