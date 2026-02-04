import { useState, useMemo } from "react";

import { SETUP_STEPS, TIME_OPTIONS } from "../../../core/constants/SetUp";

export const useSetupLogic = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const stepData = useMemo(() => SETUP_STEPS[currentStep], [currentStep]);

  const options = useMemo(() => {
    if (stepData.customOptions) return stepData.customOptions;
    const type = stepData.type as keyof typeof TIME_OPTIONS;
    return TIME_OPTIONS[type] || TIME_OPTIONS.morning;
  }, [stepData]);

  const isStepCompleted = !!selections[stepData.id];
  const isLastStep = currentStep === SETUP_STEPS.length - 1;

  // Hàm helper tính toán thời gian kết thúc
  const calculateEndTime = (startTime: string, durationMinutes: number) => {
    if (!startTime) return "";
    const [hours, mins] = startTime.split(":").map(Number);
    const totalMins = hours * 60 + mins + durationMinutes;
    const h = Math.floor(totalMins / 60) % 24;
    const m = totalMins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const handleSelectTime = (value: string) => {
    setSelections((prev) => ({ ...prev, [stepData.id]: value }));
  };

  const next = (): boolean => {
    if (currentStep < SETUP_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return false;
    }
    return true;
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // Hàm format dữ liệu để gửi lên Backend
  const getFormatPayload = (childId: string) => {
    const keyToType: Record<string, string> = {
      wake_up: "WAKE_UP",
      breakfast: "BREAKFAST",
      nap: "NAP",
      bath: "BATH",
      sleep: "SLEEP",
    };

    const time_blocks = Object.entries(selections)
      .filter(([key]) => keyToType[key]) // Chỉ lấy các key nằm trong map
      .map(([key, value]) => ({
        activity_type: keyToType[key],
        start_time: value,
        end_time: calculateEndTime(value, 30),
      }));

    return {
      child_id: childId, // Bây giờ là chuỗi UUID
      time_blocks: time_blocks,
    };
  };

  return {
    currentStep,
    stepData,
    options,
    handleSelectTime,
    next,
    back,
    selections,
    isStepCompleted,
    isLastStep,
    getFormatPayload,
    chatText: stepData.chat || stepData.question,
    progress: (currentStep + 1) / SETUP_STEPS.length,
  };
};
