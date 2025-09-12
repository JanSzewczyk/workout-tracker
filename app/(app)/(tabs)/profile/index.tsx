import { Text, ScrollView, View, ActivityIndicator, Image } from "react-native";
import { SignOutButton } from "~/components/sign-out-button";
import React from "react";
import { useWorkoutsQuery } from "~/lib/react-query/hooks/workout";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDuration } from "~/utils/duration";
import { AccountSettings, SettingsOption } from "~/components/account-settings";
import { Ionicons } from "@expo/vector-icons";

export default function IndexProfileScreen() {
  const { user } = useUser();
  const { isLoading, data: workouts } = useWorkoutsQuery(user?.id);

  function formatJoinDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-4 text-gray-600">Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((sum, workout) => sum + (workout?.duration || 0), 0);
  const averageDuration = totalWorkouts ? Math.round(totalDuration / totalWorkouts) : 0;

  const joinDate = user?.createdAt ? new Date(user.createdAt) : new Date();
  const daysSinceJoining = Math.floor((new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <SafeAreaView className="flex flex-1" edges={["top", "left", "right"]}>
      <ScrollView className="flex-1">
        {/*  Header  */}
        <View className="px-6 pb-6 pt-8">
          <Text className="text-3xl font-bold text-gray-900">Profile</Text>
          <Text className="mt-1 text-lg text-gray-600">Manage your account and stats</Text>
        </View>

        {/*  User Info Card  */}
        <View className="mb-6 px-6">
          <View className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <View className="mb-4 flex-row items-center">
              <View className="mr-4 size-20 items-center justify-center rounded-xl bg-blue-600">
                <Image
                  source={{
                    uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl
                  }}
                  className="size-20 rounded-xl"
                />
              </View>

              <View className="flex-1">
                <Text className="text-xl font-semibold text-gray-900">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.firstName || "Unknown"}
                </Text>
                <Text className="text-gray-600">{user?.emailAddresses?.[0].emailAddress}</Text>
                <Text className="mt-1 text-sm text-gray-500">Member since {formatJoinDate(joinDate)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/*  Stats Overview  */}
        <View className="px-6 pb-6">
          <View className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-900">Your Fitness Stats</Text>

            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-blue-600">{totalWorkouts}</Text>
                <Text className="text-center text-sm text-gray-600">Total{"\n"}Workouts</Text>
              </View>

              <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-green-600">{formatDuration(totalDuration)}</Text>
                <Text className="text-center text-sm text-gray-600">Total{"\n"}Time</Text>
              </View>

              <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-purple-600">{daysSinceJoining}</Text>
                <Text className="text-center text-sm text-gray-600">Days{"\n"}Since Joining</Text>
              </View>
            </View>

            {totalWorkouts ? (
              <View className="mt-4 border-t border-gray-100 pt-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-600">Average workout duration:</Text>
                  <Text className="font-semibold text-gray-900">{formatDuration(averageDuration)}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>

        <AccountSettings>
          <SettingsOption
            label="Edit Profile"
            icon={
              <View className="size-10 items-center justify-center rounded-full bg-blue-100">
                <Ionicons name="person-outline" size={20} color="#3b82f6" />
              </View>
            }
          />
          <SettingsOption
            label="Notifications"
            icon={
              <View className="size-10 items-center justify-center rounded-full bg-green-100">
                <Ionicons name="notifications-outline" size={20} color="#10b981" />
              </View>
            }
          />
          <SettingsOption
            label="Preferences"
            icon={
              <View className="size-10 items-center justify-center rounded-full bg-purple-100">
                <Ionicons name="settings-outline" size={20} color="#8b5cf6" />
              </View>
            }
          />
          <SettingsOption
            label="Preferences"
            icon={
              <View className="size-10 items-center justify-center rounded-full bg-orange-100">
                <Ionicons name="help-circle-outline" size={20} color="#f59e0b" />
              </View>
            }
          />
        </AccountSettings>

        <View className="mb-8 px-6">
          <SignOutButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
