import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useWorkoutsQuery } from "~/lib/react-query/hooks/workout";
import { useUser } from "@clerk/clerk-expo";
import { formatDuration } from "~/utils/duration";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { formatDate } from "~/utils/date";
import { getTotalSets } from "~/utils/wokrout";

export default function HomeTab() {
  const router = useRouter();
  const { user } = useUser();
  const { isLoading, isRefetching, refetch, data: workouts } = useWorkoutsQuery(user?.id);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-4 text-gray-600">Loading your stats...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const lastWorkout = workouts[0] ?? null;
  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((sum, workout) => sum + (workout?.duration || 0), 0);
  const averageDuration = totalWorkouts ? Math.round(totalDuration / totalWorkouts) : 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
        {/*  Header  */}
        <View className="px-6 pb-6 pt-8">
          <Text className="text-lg text-gray-600">Welcome back,</Text>
          <Text className="text-3xl font-bold text-gray-900">{user?.firstName ?? "Athlete"}</Text>
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
                <Text className="text-2xl font-bold text-purple-600">
                  {averageDuration ? formatDuration(averageDuration) : "0m"}
                </Text>
                <Text className="text-center text-sm text-gray-600">Average{"\n"}Duration</Text>
              </View>
            </View>
          </View>
        </View>

        {/*  Quick actions  */}
        <View className="px-6 pb-6">
          <Text className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</Text>

          {/*  Start Workout Button  */}
          <TouchableOpacity
            onPress={() => router.push("/workout")}
            className="mb-4 rounded-2xl bg-blue-600 p-6 shadow-sm"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center gap-x-4">
              <View className="size-12 items-center justify-center rounded-full bg-blue-500">
                <Ionicons name="play" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-semibold text-white">Start Workout</Text>
                <Text className="text-blue-100">Begin your training session</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>
          </TouchableOpacity>

          {/*  Action Grid  */}
          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={() => router.push("/history")}
              className="flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              activeOpacity={0.7}
            >
              <View className="items-center">
                <View className="mb-3 size-12 items-center justify-center rounded-full bg-gray-100">
                  <Ionicons name="time-outline" size={24} color="#6b7280" />
                </View>
                <Text className="text-center font-medium text-gray-900">Workout{"\n"}History</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/exercises")}
              className="flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              activeOpacity={0.7}
            >
              <View className="items-center">
                <View className="mb-3 size-12 items-center justify-center rounded-full bg-gray-100">
                  <Ionicons name="barbell-outline" size={24} color="#6b7280" />
                </View>
                <Text className="text-center font-medium text-gray-900">Browse{"\n"}Exercises</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/*  Last Workout  */}
        {lastWorkout ? (
          <View className="mb-8 px-6">
            <Text className="mb-4 text-lg font-semibold text-gray-900">Last Workout</Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/history/[workoutId]",
                  params: { workoutId: lastWorkout._id }
                })
              }
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              activeOpacity={0.7}
            >
              <View className="mb-4 flex-row items-center justify-between">
                <View>
                  <Text className="text-lg font-semibold text-gray-900">{formatDate(lastWorkout?.date ?? "")}</Text>
                  <View className="mt-1 flex-row items-center">
                    <Ionicons name="time-outline" size={16} color="#6b7280" />
                    <Text className="ml-2 text-gray-600">
                      {lastWorkout.duration ? formatDuration(lastWorkout.duration) : "Duration not recorder"}
                    </Text>
                  </View>
                </View>
                <View className="size-12 items-center justify-center rounded-full bg-blue-100">
                  <Ionicons name="fitness-outline" size={24} color="#3b82f6" />
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600">
                  {lastWorkout.exercises?.length ?? 0} exercises * {getTotalSets(lastWorkout)} sets
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="px-6 pb-8">
            <View className="items-center rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <View className="mb-4 size-16 items-center justify-center rounded-full bg-blue-100">
                <Ionicons name="barbell-outline" size={32} color="#3b82f6" />
              </View>
              <Text className="mb-2 text-xl font-semibold text-gray-900">Ready to start four fitness journey?</Text>
              <Text className="mb-4 text-center text-gray-600">
                Track your workouts and see your progress over time
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/workout")}
                className="rounded-xl bg-blue-600 px-6 py-3"
                activeOpacity={0.8}
              >
                <Text className="font-semibold text-white">Start Your First Workout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
