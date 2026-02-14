import { useState } from "react";
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

  const handleStart = () => {
    setIsStarted(true);
    animationProgress.value = withSpring(1, { damping: 15 });
  };

  const handleNextAction = async () => {
    const isFinished = next();

    if (isFinished) {
      try {
        setLoading(true);
        const childId = "3f2a9c7e-8d41-4f9a-9c6d-1b2f8a7c4e90";
        const payload = getFormatPayload();
        console.log("Payload gửi lên:", payload);
        await scheduleService.submitInitialSchedule(childId, payload);
        Alert.alert("Thành công", "Lịch sinh hoạt của bé đã được lưu!");
        navigation.replace("GoldenTime", {
          childId,
          timeBlocks: payload.time_blocks,
        });
      } catch (error: any) {
        console.error("Lỗi setup:", error);
        Alert.alert("Lỗi", "Không thể lưu lịch. Vui lòng thử lại.");
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
