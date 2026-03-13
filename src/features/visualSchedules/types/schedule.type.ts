export type ScheduleStatus =
  | "upcoming"
  | "completed"
  | "missed"
  | "in progress";

export interface TimeSlot {
  slot_id: string;
  title: string;
  time_range: string;
  activity_type: string;
  target_seconds: number;
  spent_seconds: number;
  progress_percent: number;
  status: ScheduleStatus;
  duration_label: string;
}

export interface DailyScheduleResponseDto {
  total_progress: number;
  schedules: TimeSlot[];
  routine_id: string;
}

export interface DailyScheduleApiResponse {
  success: boolean;
  message: string;
  data: DailyScheduleResponseDto;
}
