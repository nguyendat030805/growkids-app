import { useState, useEffect } from "react";
import { View, Dimensions, TouchableOpacity, Text, Alert } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import BearCharacter from "../components/BearCharacter";
import ChatBubble from "../components/ChatBubble";
import IntroSection from "../components/IntroSection";
import QuestionCard from "../components/QuestionCard";
import { useSetupLogic } from "../hooks/useSetupSchedule";
import { scheduleService } from "../services/ScheduleService";

const { height } = Dimensions.get("window");

const OnboardingPage = ({ navigation }: any) => {
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const animationProgress = useSharedValue(0);

  const {
    stepData,
    handleSelectTime,
    next,
    back,
    selections,
    isStepCompleted,
    currentStep,
    chatText,
    options,
    isLastStep,
    getFormatPayload,
  } = useSetupLogic();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await scheduleService.getScheduleStatus();
        if (res.hasSchedule) {
          navigation.reset({
            index: 0,
            routes: [{ name: "MainHome" }],
          });
        } else {
          setIsChecking(false);
        }
      } catch (error) {
        setIsChecking(false);
      }
    };
    checkStatus();
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    animationProgress.value = withSpring(1, { damping: 15 });
  };

  const handleNextAction = async () => {
    const isFinished = next();

    if (isFinished) {
      try {
        setLoading(true);
        const payload = getFormatPayload();

        await scheduleService.submitInitialSchedule(payload);

        Alert.alert("Success", "Baby's daily schedule has been saved!");
        navigation.reset({
          index: 0,
          routes: [{ name: "MainHome" }],
        });
      } catch (error: any) {
        Alert.alert("Error", "Could not save the schedule. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const bearAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animationProgress.value,
          [0, 1],
          [0, -height * 0.15],
        ),
      },
      { scale: interpolate(animationProgress.value, [0, 1], [1, 0.85]) },
    ],
    top: height * 0.15,
    position: "absolute",
    zIndex: 10,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(animationProgress.value, { duration: 150 }),
    transform: [
      { translateY: interpolate(animationProgress.value, [0, 1], [30, 0]) },
    ],
  }));
  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Data Loading...</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <BearCharacter animatedStyle={bearAnimatedStyle} />

      {!isStarted ? (
        <IntroSection onStart={handleStart} />
      ) : (
        <Animated.View
          style={contentAnimatedStyle}
          className="w-full items-center flex-1 pt-[30%]"
        >
          <View className="w-[100%] items-center mb-4">
            <ChatBubble text={chatText} animatedStyle={contentAnimatedStyle} />
          </View>

          <QuestionCard
            stepData={stepData}
            selections={selections}
            onSelect={handleSelectTime}
            options={options}
          />

          <View className="flex-row justify-between w-[90%] absolute bottom-10 items-center">
            <TouchableOpacity
              onPress={back}
              disabled={currentStep === 0 || loading}
              className="bg-gray-100 py-3.5 px-10 rounded-xl shadow-sm"
            >
              <Text className="text-gray-600 font-semibold text-[20px]">
                Back
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNextAction}
              disabled={!isStepCompleted || loading}
              className={`py-3.5 px-10 rounded-xl ${
                isStepCompleted ? "bg-lime-500" : "bg-lime-300/40"
              }`}
            >
              <Text className="text-white font-bold text-[20px]">
                {loading ? "..." : isLastStep ? "View suggestions" : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default OnboardingPage;
