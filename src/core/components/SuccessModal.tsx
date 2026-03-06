import LottieView from "lottie-react-native";
import { useRef } from "react";
import { Modal, Text, View } from "react-native";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessModal({
  visible,
  onClose,
  title = "Great Job!",
  message = "You completed the song!",
}: SuccessModalProps) {
  const animationRef = useRef<LottieView>(null);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-3xl p-8 items-center">
          <LottieView
            ref={animationRef}
            source={require("../../../public/assets/animation/success circle check.json")}
            autoPlay
            loop={false}
            style={{ width: 150, height: 150 }}
            onAnimationFinish={() => {
              setTimeout(() => {
                onClose();
              }, 2000);
            }}
          />

          <Text className="text-xl font-bold text-green-600 mt-4">{title}</Text>
          <Text className="text-gray-600 text-center mt-2">{message}</Text>
        </View>
      </View>
    </Modal>
  );
}
