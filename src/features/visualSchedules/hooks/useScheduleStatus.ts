import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { TimeSlot } from "../types/schedule.type";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface StatusConfig {
  icon: IoniconName;
  iconColor: string;
  badgeStyle: string;
}

export const useScheduleStatus = (status: TimeSlot["status"]): StatusConfig => {
  const statusConfig: Record<TimeSlot["status"], StatusConfig> = {
    upcoming: {
      icon: "time-outline",
      iconColor: "#F59E0B",
      badgeStyle: "bg-yellow-50 border border-yellow-400",
    },
    completed: {
      icon: "checkmark-circle",
      iconColor: "#00C517",
      badgeStyle: "bg-green-50 border border-green-400",
    },
    missed: {
      icon: "warning-outline",
      iconColor: "#FF6200",
      badgeStyle: "bg-orange-50 border border-orange-400",
    },

    "in progress": {
      icon: "play-circle-outline",
      iconColor: "#FFB81F",
      badgeStyle: "bg-orange-50 border border-orange-200",
    },
  };

  return (
    statusConfig[status] ||
    statusConfig.upcoming ||
    statusConfig["in progress"] ||
    statusConfig.completed ||
    statusConfig.missed
  );
};
