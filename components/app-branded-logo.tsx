import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";

type AppBrandedLogoProps = {
  iconName?: keyof typeof Ionicons.glyphMap;
  title?: string;
  subtitle?: string;
};

export function AppBrandedLogo({
  iconName = "fitness",
  title = "Fit Tracker",
  subtitle = "Frack your fitness journey\nand reach your goals"
}: AppBrandedLogoProps) {
  return (
    <View className="mb-8 items-center">
      <View className="mb-4 size-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
        <Ionicons name={iconName} size={40} color="white" />
      </View>
      <Text className="mb-2 text-3xl font-bold text-gray-900">{title}</Text>
      <Text className="text-center text-lg text-gray-600">{subtitle}</Text>
    </View>
  );
}
