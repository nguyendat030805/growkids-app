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
    chatText: stepData.chat || stepData.question,
    progress: (currentStep + 1) / SETUP_STEPS.length,
  };
};
