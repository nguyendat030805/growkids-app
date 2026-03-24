import { useNavigation, CommonActions } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

export default function NotFoundScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-6xl font-bold text-lime-500">404</Text>
      <Text className="text-xl font-semibold text-gray-800 mt-4">
        Không tìm thấy trang
      </Text>
      <Text className="text-gray-500 text-center mt-2 mb-8">
        Có vẻ như đường dẫn này không tồn tại hoặc bạn không có quyền truy cập.
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: "MainTabs" }] }),
          )
        }
        className="bg-lime-500 px-10 py-3 rounded-xl shadow-md"
      >
        <Text className="text-white font-bold text-lg">Quay về trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
}
