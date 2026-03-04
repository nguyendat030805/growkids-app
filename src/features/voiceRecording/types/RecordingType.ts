export interface SuggestionItem {
  english: string;
  vietnamese: string;
  phonetic: string;
  audioBase64?: string;
}

export interface AIResultData {
  conversation_id?: string;
  user_id: string;
  conversation_type: string;
  input_text: string;
  output_text: string;
  english: string;
  phonetic?: string;
  audioBase64?: string;
  suggestions: SuggestionItem[];
}

export interface APIResponse {
  success: boolean;
  message: string;
  data: AIResultData;
}
