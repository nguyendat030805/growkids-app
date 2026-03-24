import { useState } from "react";
import { Alert } from "react-native";
import { goldenTimeService } from "../services/GoldenTimeService";
import { TimeSlot } from "../types/schedule.type";

export const useCustomizeSlot = (onRefresh: () => void) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const openCreate = () => {
    setSelectedSlot(null);
    setIsModalVisible(true);
  };

  const openEdit = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setIsModalVisible(true);
  };

  const handleDelete = async (slotId: string) => {
    Alert.alert(
      "Confirm deletion",
      "Are you sure you want to delete this time slot?",
      [
        { text: "Cancle", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await goldenTimeService.deleteSlot(slotId);
              onRefresh();
            } catch (error) {
              Alert.alert("Error", "Unable to delete data.");
            }
          },
        },
      ],
    );
  };

  return {
    isModalVisible,
    selectedSlot,
    setIsModalVisible,
    openCreate,
    openEdit,
    handleDelete,
  };
};
