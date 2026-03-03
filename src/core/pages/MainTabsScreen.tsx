import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  MainTabParamList,
  ExperienceStackParamList,
} from "../navigation/NavigationService";
import { Header } from "./Header";
import { BottomMenu } from "./BottomMenu";

import HomepageScreen from "@/src/features/homepage/pages/HomepageScreen";
import ExperienceScreen from "@/src/features/experiences/pages/ExperienceScreen";
import StoryScreen from "@/src/features/story/pages/StoryScreen";
import StoryPlayerScreen from "@/src/features/story/pages/StoryPlayerScreen";
import RecordingScreen from "@/src/features/voiceRecording/pages/RecordingScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();
const ExperienceStack = createNativeStackNavigator<ExperienceStackParamList>();

function ExperienceStackScreen() {
  return (
    <ExperienceStack.Navigator screenOptions={{ headerShown: false }}>
      <ExperienceStack.Screen
        name="ExperienceMain"
        component={ExperienceScreen}
      />
      <ExperienceStack.Screen name="Story" component={StoryScreen} />
      <ExperienceStack.Screen
        name="StoryPlayer"
        component={StoryPlayerScreen}
      />
    </ExperienceStack.Navigator>
  );
}

function PlaceholderScreen() {
  return <View className="flex-1 bg-white" />;
}

export default function MainTabsScreen() {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView edges={["top"]} className="bg-white">
        <Header />
      </SafeAreaView>

      <Tab.Navigator
        tabBar={(props) => <BottomMenu {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="HomeTab" component={HomepageScreen} />
        <Tab.Screen name="ExperienceTab" component={ExperienceStackScreen} />
        <Tab.Screen name="VoiceTab" component={RecordingScreen} />
        <Tab.Screen name="LibraryTab" component={PlaceholderScreen} />
        <Tab.Screen name="ProfileTab" component={PlaceholderScreen} />
      </Tab.Navigator>
    </View>
  );
}
