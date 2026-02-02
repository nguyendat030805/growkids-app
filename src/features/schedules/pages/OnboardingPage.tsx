import { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
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

const { height } = Dimensions.get("window");

const OnboardingPage = () => {
  const [isStarted, setIsStarted] = useState(false);
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
  } = useSetupLogic();

  const handleStart = () => {
    setIsStarted(true);
    animationProgress.value = withSpring(1, { damping: 15 });
  };

  const bearAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animationProgress.value,
          [0, 1],
          [0, -height * 0.19],
        ),
      },
      { scale: interpolate(animationProgress.value, [0, 1], [1, 0.85]) },
    ],
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
    <View style={styles.container}>
      <BearCharacter animatedStyle={bearAnimatedStyle} />

      {!isStarted ? (
        <IntroSection onStart={handleStart} />
      ) : (
        <Animated.View style={[styles.setupContent, contentAnimatedStyle]}>
          <View style={styles.chatPosition}>
            <ChatBubble text={chatText} animatedStyle={contentAnimatedStyle} />
          </View>

          <QuestionCard
            stepData={stepData}
            selections={selections}
            onSelect={handleSelectTime}
            options={options}
          />

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={back}
              disabled={currentStep === 0}
              style={styles.BackButton}
            >
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.continueButton,
                !isStepCompleted && styles.disabledButton,
              ]}
              onPress={() => {
                if (next()) {
                  console.log("Navigating to AI...");
                }
              }}
              disabled={!isStepCompleted}
            >
              <Text style={styles.continueText}>
                {isLastStep ? "View suggestions" : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  setupContent: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    paddingTop: height * 0.2,
  },
  chatPosition: { width: "90%", alignItems: "center", marginBottom: 10 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#D4E157",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  BackButton: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  disabledButton: { backgroundColor: "#d3e15766" },
  continueText: { color: "#FFF", fontWeight: "bold" },
  backText: { color: "#757575", fontWeight: "600" },
});

export default OnboardingPage;
