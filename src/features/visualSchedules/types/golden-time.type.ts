import { TimeSlot } from "./schedule.type";

export interface GoldenTimeSlotDto {
  slot_type: string;
  start_time: string;
  duration_minutes: number;
  context?: string;
}

export interface CustomizeModalProps {
  visible: boolean;
  routineId: string;
  slotData: TimeSlot | null;
  onClose: () => void;
  onSuccess: () => void;
}
