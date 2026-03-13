import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { goldenTimeService } from "../services/GoldenTimeService";
import { TimeSlot } from "../types/schedule.type";

interface CustomizeSlotModalProps {
  visible: boolean;
  routineId: string;
  slotData: TimeSlot | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface SlotForm {
  slot_type: string;
  start_time: string;
  duration_minutes: number;
  context: string;
}

export const CustomizeSlotModal: React.FC<CustomizeSlotModalProps> = ({
  visible,
  routineId,
  slotData,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState<SlotForm>({
    slot_type: "",
    start_time: "",
    duration_minutes: 30,
    context: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (visible) {
      if (slotData) {
        const startTime = slotData.time_range?.split(" - ")[0] || "";
        setForm({
          slot_type: slotData.title || "",
          start_time: startTime,
          duration_minutes: 30,
          context: slotData.activity_type || "",
        });
      } else {
        setForm({
          slot_type: "",
          start_time: "",
          duration_minutes: 30,
          context: "",
        });
      }
    }
  }, [visible, slotData]);

  const validateForm = (): boolean => {
    if (!form.slot_type.trim()) {
      Alert.alert("Oops!", "Please give this activity a fun name!");
      return false;
    }
    const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!timeRegex.test(form.start_time)) {
      Alert.alert("Wait!", "Check the clock again (e.g., 08:30)");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (slotData?.slot_id) {
        await goldenTimeService.updateSlot(slotData.slot_id, form);
      } else {
        if (!routineId) {
          Alert.alert("Sorry!", "We couldn't find your schedule information.");
          return;
        }
        await goldenTimeService.createManual(routineId, form);
      }
      onSuccess();
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Let's try again!";
      Alert.alert("Oh no!", Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center bg-black/60 px-6">
          <View className="bg-white p-8 rounded-[40px] shadow-2xl border-4 border-[#ffb500]/20">
            <View className="items-center mb-6">
              <View className="bg-[#ffb500]/20 p-4 rounded-full mb-2">
                <Ionicons
                  name={slotData ? "color-wand" : "rocket"}
                  size={40}
                  color="#ffb500"
                />
              </View>
              <Text className="text-2xl font-black text-[#1F2937] text-center p-4">
                {slotData ? "Edit Schedule" : "New Adventure"}
              </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mb-4">
                <View className="flex-row items-center mb-2 ml-1">
                  <Ionicons name="star" size={20} color="#ffb500" />
                  <Text className="text-[#4B5563] font-bold ml-1 text-[15px] tracking-widest">
                    Activity Name
                  </Text>
                </View>
                <TextInput
                  className="bg-[#F3F4F6] p-4 rounded-2xl text-gray-800 text-base border-2 border-transparent focus:border-[#FFB81F]"
                  value={form.slot_type}
                  onChangeText={(v) => setForm({ ...form, slot_type: v })}
                  placeholder="e.g. Magic Reading Time"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View className="mb-4">
                <View className="flex-row items-center mb-2 ml-1">
                  <Ionicons name="bulb" size={20} color="#60A5FA" />
                  <Text className="text-[#4B5563] font-bold ml-1 text-[15px] tracking-widest">
                    Learning Goal
                  </Text>
                </View>
                <TextInput
                  className="bg-[#F3F4F6] p-4 rounded-2xl text-gray-800 text-base min-h-[80px]"
                  value={form.context}
                  onChangeText={(v) => setForm({ ...form, context: v })}
                  placeholder="e.g. Learn 5 new animal words"
                  placeholderTextColor="#9CA3AF"
                  multiline={true}
                  numberOfLines={2}
                />
              </View>

              <View className="mb-8">
                <View className="flex-row items-center mb-2 ml-1">
                  <Ionicons name="time" size={20} color="#F87171" />
                  <Text className="text-[#4B5563] font-bold ml-1 text-[15px] tracking-widest">
                    Start Time
                  </Text>
                </View>
                <TextInput
                  className="bg-[#F3F4F6] p-4 rounded-2xl text-gray-800 text-center text-xl font-bold border-2 border-dashed border-gray-300"
                  value={form.start_time}
                  onChangeText={(v) => setForm({ ...form, start_time: v })}
                  placeholder="08:00"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numbers-and-punctuation"
                />
              </View>

              <View
                className="flex-row justify-between items-center mt-6"
                style={{ gap: 16 }}
              >
                <TouchableOpacity
                  onPress={onClose}
                  disabled={isSubmitting}
                  className="flex-1 bg-white border-2 border-gray-200 p-4 rounded-3xl items-center"
                >
                  <Text className="font-black text-gray-400">CLOSE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSave}
                  disabled={isSubmitting}
                  style={{ elevation: 5 }}
                  className={`flex-1 p-4 rounded-3xl items-center shadow-lg ${
                    isSubmitting ? "bg-gray-400" : "bg-[#ffb500]"
                  }`}
                >
                  <Text className="text-white font-black tracking-widest">
                    {isSubmitting ? "WAIT..." : "READY!"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
