import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { GetWorkoutsQueryResult } from "~/lib/sanity/types";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useWorkoutsQuery } from "~/lib/react-query/hooks/workout";
import { formatWorkoutDuration } from "~/utils/wokrout";

export default function HistoryTab() {
  const { user } = useUser();

  const router = useRouter();

  const { data: workouts, isLoading, isRefetching, refetch } = useWorkoutsQuery(user?.id);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    }
  }

  function getTotalSets(workout: GetWorkoutsQueryResult[number]) {
    return (
      workout.exercises?.reduce((total, exercise) => {
        return total + (exercise?.sets?.length || 0);
      }, 0) ?? 0
    );
  }

  function getExerciseNames(workout: GetWorkoutsQueryResult[number]) {
    return workout.exercises?.map((exercise) => exercise.exercise?.name).filter(Boolean) ?? [];
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="border-b border-gray-200 bg-white px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900">Workout History</Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-4 text-gray-600">Loading your workouts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/*  Header  */}
      <View className="border-b border-gray-200 bg-white px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900">Workout History</Text>
        <Text className="mt-1 text-gray-600">
          {workouts.length} workout{workouts.length !== 1 ? "s" : ""} completed
        </Text>
      </View>

      {/*  Workout List  */}
      <FlatList
        className="flex-1"
        data={workouts}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-6 gap-4"
        renderItem={({ item: workout }) => (
          <TouchableOpacity
            key={workout._id}
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: "/history/[workoutId]", params: { workoutId: workout._id } })}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900">{formatDate(workout.date ?? "")}</Text>
                <View className="mt-1 flex-row items-center">
                  <Ionicons name="time-outline" size={16} color="#6b7280" />
                  <Text className="ml-2 text-gray-600">{formatWorkoutDuration(workout.duration)}</Text>
                </View>
              </View>
              <View className="size-12 items-center justify-center rounded-full bg-blue-100">
                <Ionicons name="fitness-outline" size={24} color="#3b82f6" />
              </View>
            </View>
            {/*  Workout Stats  */}
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 rounded-lg bg-gray-100 px-3 py-2">
                  <Text className="text-sm font-medium text-gray-700">{workout.exercises?.length ?? 0} exercises</Text>
                </View>

                <View className="mr-3 rounded-lg bg-gray-100 px-3 py-2">
                  <Text className="text-sm font-medium text-gray-700">{getTotalSets(workout)} sets</Text>
                </View>
              </View>
            </View>

            {/*  Exercise list  */}
            {workout.exercises?.length ? (
              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium text-gray-700">Exercises:</Text>
                <View className="flex-row flex-wrap">
                  {getExerciseNames(workout)
                    .slice(0, 3)
                    .map((name, index) => (
                      <View key={index} className="mr-2 rounded-lg bg-blue-50 px-3 py-1">
                        <Text className="font-mediumr text-sm text-blue-700">{name}</Text>
                      </View>
                    ))}
                  {getExerciseNames(workout).length > 3 ? (
                    <View className="mr-2 rounded-lg bg-gray-100 px-3 py-1">
                      <Text className="text-sm font-medium text-gray-600">
                        +{getExerciseNames(workout).length - 3} more
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={["#3b82f6"]}
            tintColor="#3b82f6"
            title="Pull to refresh workouts"
            titleColor="#6b7280"
          />
        }
        ListEmptyComponent={
          <View className="items-center rounded-2xl bg-white p-8">
            <Ionicons name="barbell-outline" size={64} color="#9ca3af" />
            <Text className="mt-4 text-xl font-semibold text-gray-900">No workouts yet</Text>
            <Text className="mt-2 text-center text-gray-600">your completed workouts will appear here</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
