import { useState, useCallback } from "react";
import { Slot } from "../types/FlexibleScheduleType";
import { FlexibleService } from "../services/FlexibleScheduleService";

export const useFlexibleFlow = (onRefresh: () => void) => {
  const [missedSlots, setMissedSlots] = useState<Slot[]>([]);
  const [suggestion, setSuggestion] = useState<Slot | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);

  const runCheck = useCallback(async () => {
    const data = await FlexibleService.checkMissed();
    setMissedSlots(data);
  }, []);

  const handleGetAi = async () => {
    if (missedSlots.length === 0) return;
    setLoadingAi(true);
    try {
      const data = await FlexibleService.reschedule(
        missedSlots[0].slot_id,
        missedSlots[0].routine_id,
      );
      setSuggestion(data);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    setMissedSlots([]);
    setSuggestion(null);
    onRefresh();
  };

  return {
    missedSlots,
    suggestion,
    isModalVisible,
    loadingAi,
    setIsModalVisible,
    runCheck,
    handleGetAi,
    handleConfirm,
  };
};
