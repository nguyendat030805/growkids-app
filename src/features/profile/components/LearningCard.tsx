import { CircleIcon } from "@/src/core/components/CircleIcon";
import { LucideIcon } from "lucide-react-native";
import { View, Text } from "react-native";

interface Props {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: string;
}

export default function LearningCard({ icon, title, subtitle, color }: Props) {
  return (
    <View className="w-1/2 p-2">
      <View
        className="flex-row items-center rounded-xl p-3"
        style={{ backgroundColor: color }}
      >
        <CircleIcon
          icon={icon}
          size={34}
          iconSize={20}
          iconColor={color}
          backgroundColor="white"
        />

        <View className="ml-3">
          <Text className="font-semibold">{title}</Text>
          <Text className="text-xs text-gray-600">{subtitle}</Text>
        </View>
      </View>
    </View>
  );
}
