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
      badgeStyle: "border border-[#00C517] bg-transparent",
    },
    completed: {
      icon: "checkmark-circle",
      iconColor: "#00C517",
      badgeStyle: "bg-[#00C517]/20 border border-[#0F5E47]",
    },
    missed: {
      icon: "warning-outline",
      iconColor: "#FF6200",
      badgeStyle: "bg-[#FF6200] border border-[#FF6200]/20",
    },
  };
  return statusConfig[status];
};
