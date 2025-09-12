import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type AccountSettingsProps = {
  children: React.ReactNode;
};

export function AccountSettings({ children }: AccountSettingsProps) {
  return (
    <View className="mb-6 px-6">
      <Text className="mb-4 text-lg font-semibold text-gray-900">Account Settings</Text>
      <View className="rounded-2xl border border-gray-100 bg-white shadow-sm">{children}</View>
    </View>
  );
}

export function SettingsOption({
  label,
  icon,
  onPress
}: {
  icon: React.ReactElement;
  label: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between border-b border-gray-100 p-4">
      <View className="flex-row items-center gap-x-3">
        {icon}
        <Text className="font-medium text-gray-900">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#3b82f6" />
    </TouchableOpacity>
  );
}
