export interface Slot {
  slot_id: string;
  routine_id: string;
  slot_type: string;
  start_time: string;
  duration_minutes: number;
  context: string;
  is_active: boolean;
}
