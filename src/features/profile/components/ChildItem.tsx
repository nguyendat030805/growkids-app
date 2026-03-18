import { View, Text, Image, TouchableOpacity } from "react-native";
import { Pencil } from "lucide-react-native";
import LottieView from "lottie-react-native";

interface Props {
  name: string;
  age: number;
  avatar?: string | null;
  onEdit: () => void;
}

export default function ChildItem({ name, age, avatar, onEdit }: Props) {
  return (
    <View className="flex-row items-center bg-white rounded-xl p-3 mb-3 shadow">
      {avatar ? (
        <Image source={{ uri: avatar }} className="w-12 h-12 rounded-full" />
      ) : (
        <LottieView
          source={require("@/public/assets/animation/dog avatar.json")}
          autoPlay
          loop
          style={{ width: 48, height: 48 }}
        />
      )}

      <View className="flex-1 ml-3">
        <Text className="font-semibold">{name}</Text>
        <Text className="text-gray-500">Age: {age}</Text>
      </View>

      <TouchableOpacity onPress={onEdit} className="mr-3">
        <Pencil size={20} color="#FB923C" />
      </TouchableOpacity>
    </View>
  );
}
