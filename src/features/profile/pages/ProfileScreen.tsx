import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  AudioLines,
  BookOpen,
  LibraryBig,
  MessageSquareMore,
  Pencil,
  Volume2,
  ArrowLeft,
} from "lucide-react-native";
import LottieView from "lottie-react-native";
import ChildItem from "../components/ChildItem";
import LearningCard from "../components/LearningCard";
import EditUserModal from "../components/EditUserModal";
import EditChildModal from "../components/EditChildModal";
import { Header } from "@/src/core/pages/Header";
import { useProfile } from "../hooks/useProfile";
import { useNavigation } from "@react-navigation/native";

const calcAge = (birthDate: string) => {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const formatDateDisplay = (isoDate: string) => {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ProfileScreen() {
  const { profile, loading, fetchProfile, updateUser, updateChild } =
    useProfile();
  const navigation = useNavigation();
  const [showEditUser, setShowEditUser] = useState(false);
  const [showEditChild, setShowEditChild] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading && !profile) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#FB923C" />
      </View>
    );
  }

  const user = profile?.user ?? profile;
  const child = profile?.child ?? profile?.children?.[0];

  const userName = user?.full_name || user?.fullName || "No name";
  const userAvatar = user?.avatar_url ?? user?.avatar ?? null;
  const userGender = user?.gender || "Not set";
  const userAge = calcAge(user?.birth_date);
  const userAgeText = userAge !== null ? `${userAge} tuổi` : "Not set";

  const childName = child?.full_name || child?.name || "No name";
  const childAvatar = child?.avatar_url ?? child?.avatar ?? null;
  const childAge = calcAge(child?.birth_date) ?? child?.age ?? 0;

  const stats = profile?.data?.statistics ?? profile?.statistics;
  const totalSentences = stats?.totalSentences ?? null;
  const totalSongs = stats?.totalSongs ?? null;
  const totalConversations = stats?.totalConversations ?? null;
  const pronunciationScore = stats?.pronunciationScore ?? null;

  const getUserLottie = () => {
    if (userGender === "Female")
      return require("@/public/assets/animation/avatar - female.json");
    return require("@/public/assets/animation/avatar.json");
  };

  return (
    <View className="flex-1 bg-white pt-12">
      <Header />
      <ScrollView className="flex-1 bg-gray-100 px-4 pt-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center bg-white px-3 py-2 rounded-full"
            activeOpacity={0.7}
          >
            <ArrowLeft size={16} color="#1C2B6D" />
            <Text className="text-[#1C2B6D] font-semibold text-sm ml-2">
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View className="items-center mb-6">
          <View className="relative w-28 h-28">
            {userAvatar ? (
              <Image
                source={{ uri: userAvatar }}
                className="w-28 h-28 rounded-full"
              />
            ) : (
              <View
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: 56,
                  overflow: "hidden",
                }}
              >
                <LottieView
                  source={getUserLottie()}
                  autoPlay
                  loop
                  style={{
                    width: 200,
                    height: 200,
                    marginTop: -44,
                    marginLeft: -44,
                  }}
                />
              </View>
            )}
            <TouchableOpacity
              onPress={() => setShowEditUser(true)}
              className="absolute -bottom-2 -right-3 bg-orange-400 rounded-full p-2 border-2 border-white"
            >
              <Pencil size={14} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-bold mt-4">{userName}</Text>
          <Text className="text-gray-500">
            {userGender} · {userAgeText}
          </Text>
        </View>

        <Text className="font-bold mb-3">Child</Text>
        {child ? (
          <ChildItem
            name={childName}
            age={childAge}
            avatar={childAvatar}
            onEdit={() => setShowEditChild(true)}
          />
        ) : (
          <Text className="text-gray-400 text-sm">No child added</Text>
        )}

        <Text className="font-bold mt-6 mb-3">Learning data</Text>
        <View className="flex-row flex-wrap -mx-2">
          <LearningCard
            icon={BookOpen}
            title="Sentences"
            subtitle={
              totalSentences !== null
                ? `${totalSentences} sentences`
                : "No data"
            }
            color="#FECACA"
          />
          <LearningCard
            icon={Volume2}
            title="Pronunciation"
            subtitle={
              pronunciationScore !== null
                ? `Score ${pronunciationScore}%`
                : "No data"
            }
            color="#BBF7D0"
          />
          <LearningCard
            icon={MessageSquareMore}
            title="Conversations"
            subtitle={
              totalConversations !== null
                ? `${totalConversations} times`
                : "No data"
            }
            color="#C7D2FE"
          />
          <LearningCard
            icon={AudioLines}
            title="Songs"
            subtitle={totalSongs !== null ? `${totalSongs} songs` : "No data"}
            color="#FDE68A"
          />
          <LearningCard
            icon={LibraryBig}
            title="Stories"
            subtitle="No data"
            color="#E9D5FF"
          />
        </View>
      </ScrollView>

      {user && (
        <EditUserModal
          visible={showEditUser}
          onClose={() => setShowEditUser(false)}
          onSave={updateUser}
          user={{
            name: userName,
            birth_date: formatDateDisplay(user.birth_date ?? ""),
            gender: userGender === "Not set" ? "" : userGender,
            avatar: userAvatar ?? "",
          }}
        />
      )}

      <EditChildModal
        visible={showEditChild}
        onClose={() => setShowEditChild(false)}
        onSave={updateChild}
        child={{
          name: childName,
          birth_date: formatDateDisplay(child?.birth_date ?? ""),
          avatar: childAvatar,
        }}
      />
    </View>
  );
}
