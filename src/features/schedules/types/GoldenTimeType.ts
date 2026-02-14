export interface SubmitGoldenTimePayload {
  slot_type: string;
  start_time: string;
  duration_minutes: number;
  context: string;
  routineId: string;
}

export interface GoldenTimeSlot {
  slot_type: string;
  start_time: string;
  duration_minutes: number;
  context: string;
  suggestions?: string[];
}
