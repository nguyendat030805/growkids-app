import { Suggestion } from "./scanningSuggestion.type";

export interface ObjectScanningResult {
  nameEn: string;
  nameVi: string;
  phonetic: string;
  suggestions: Suggestion[];
  audioNameBase64: string;
  audioSuggestionBase64: string;
}
