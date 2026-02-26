import { useState } from "react";
import { goldenTimeService } from "../services/GoldenTime.service";
import { GoldenTimeSlot } from "../types/GoldenTimeType";

export const useSubmitGoldenTime = (
  data: GoldenTimeSlot[],
  activeSlots: number[],
  routineId: string,
) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (activeSlots.length === 0) {
      alert("Please select at least one golden time slot.");
      return;
    }

    try {
      setLoading(true);

      const selectedSlots = activeSlots.map((index) => data[index]);

      const payload = {
        routineId: routineId,
        slots: selectedSlots.map((slot) => ({
          slot_type: slot.slot_type,
          start_time: slot.start_time,
          duration_minutes: slot.duration_minutes,
          context: slot.context,
        })),
      };

      await goldenTimeService.submitGoldenTime(payload as any);

      alert("Golden time saved successfully!");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleConfirm,
    loading,
  };
};
