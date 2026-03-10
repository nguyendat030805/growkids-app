export type ScheduleStatus = "upcoming" | "completed" | "missed";
export interface TimeSlot {
  id: string;
  title: string;
  subtitle?: string;
  time: string;
  duration: number;
  status: ScheduleStatus;
  progress: number;
}
