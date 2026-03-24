import { Modal, View, Text, TouchableOpacity } from "react-native";

interface PronunciationResultModalProps {
  visible: boolean;
  onClose: () => void;
  result: {
    accuracy: number;
    feedback: string;
    transcribedText: string;
  } | null;
}

export default function PronunciationResultModal({
  visible,
  onClose,
  result,
}: PronunciationResultModalProps) {
  if (!result) return null;

  const { accuracy, feedback, transcribedText } = result;

  const getTitle = () => {
    if (accuracy >= 80) return "Excellent 🎉";
    if (accuracy >= 60) return "Good 👍";
    return "Keep practicing 💪";
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        <View className="bg-white rounded-2xl p-6 w-full">
          <Text className="text-xl font-bold text-center mb-3">
            {getTitle()}
          </Text>

          <Text className="text-center text-lg font-semibold text-[#1C2B6D]">
            Accuracy: {accuracy}%
          </Text>

          <Text className="text-gray-500 mt-4">You said:</Text>

          <Text className="text-base italic mb-3">
            {`"${transcribedText}"`}
          </Text>

          <Text className="text-gray-700">{feedback}</Text>

          <TouchableOpacity
            onPress={onClose}
            className="bg-[#1C2B6D] rounded-full py-3 mt-6"
          >
            <Text className="text-white text-center font-semibold">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
