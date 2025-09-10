import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useWorkoutByIdQuery, useWorkoutDelete } from "~/lib/react-query/hooks/workout";
import { SafeAreaView } from "react-native-safe-area-context";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { formatWorkoutDuration, getTotalSets } from "~/utils/wokrout";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-expo";

export default function HistoryWorkoutScreen() {
  const { user } = useUser();
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: workout = null, isLoading } = useWorkoutByIdQuery(workoutId);
  const deleteWorkout = useWorkoutDelete();

  function formatDate(dateString?: string) {
    if (!dateString) {
      return "Unknown date";
    }

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function formatTime(dateString?: string) {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  }

  function getTotalVolume() {
    const { volume, unit } = workout?.exercises?.reduce(
      (acc, exercise) => {
        exercise?.sets?.forEach((set) => {
          if (set.weight && set.reps) {
            acc.volume += set.weight * set.reps;
            acc.unit = set.weightUnit || "lbs";
          }
        });
        return acc;
      },
      { volume: 0, unit: "lbs" }
    ) || { volume: 0, unit: "lbs" };

    return { volume, unit };
  }

  function handleDeleteWorkoutAlert() {
    Alert.alert("Delete Workout", "Are you sure you want to delete this work? This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: handleDeleteWorkout }
    ]);
  }

  async function handleDeleteWorkout() {
    try {
      await deleteWorkout.mutateAsync(workoutId);
      void queryClient.refetchQueries({ queryKey: ["workouts", user?.id] });
      router.back();
    } catch (error) {
      console.error("Error during deleting workout:", error);
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-4 text-gray-600">Loading workout...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!workout) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-950">
        <View className="flex-1 items-center justify-center">
          <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
          <Text className="mt-4 text-xl font-semibold text-gray-900">Workout Not Found</Text>
          <Text className="mt-2 text-center text-gray-600">This workout record could not be found.</Text>
          <TouchableOpacity onPress={() => router.back()} className="mt-6 rounded-lg bg-blue-600 px-6 py-3">
            <Text className="font-medium text-white">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  const { volume, unit } = getTotalVolume();

  return (
    <SafeAreaView edges={["right", "left"]} className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/*  Workout Summary  */}
        <View className="border-b border-gray-300 bg-white p-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900">Workout Summary</Text>
            <TouchableOpacity
              onPress={handleDeleteWorkoutAlert}
              disabled={deleteWorkout.isPending}
              className="flex-row items-center rounded-lg bg-red-600 px-4 py-2"
            >
              {deleteWorkout.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <React.Fragment>
                  <Ionicons name="trash-outline" size={16} color="#fff" />
                  <Text className="ml-2 font-medium text-white">Delete</Text>
                </React.Fragment>
              )}
            </TouchableOpacity>
          </View>

          <View className="mb-3 flex-row items-center">
            <Ionicons name="calendar-outline" size={20} color="#6b7280" />
            <Text className="ml-3 font-medium text-gray-700">
              {formatDate(workout?.date ?? "")} at {formatTime(workout?.date ?? "")}
            </Text>
          </View>

          <View className="mb-3 flex-row items-center">
            <Ionicons name="time-outline" size={20} color="#6b7280" />
            <Text className="ml-3 font-medium text-gray-700">{formatWorkoutDuration(workout.duration)}</Text>
          </View>

          <View className="mb-3 flex-row items-center">
            <Ionicons name="fitness-outline" size={20} color="#6b7280" />
            <Text className="ml-3 font-medium text-gray-700">{workout.exercises?.length ?? 0} exercises</Text>
          </View>

          <View className="mb-3 flex-row items-center">
            <Ionicons name="bar-chart-outline" size={20} color="#6b7280" />
            <Text className="ml-3 font-medium text-gray-700">{getTotalSets(workout)} total sets</Text>
          </View>

          {volume > 0 ? (
            <View className="mb-3 flex-row items-center">
              <Ionicons name="barbell-outline" size={20} color="#6b7280" />
              <Text className="ml-3 font-medium text-gray-700">
                {volume} {unit} total volume
              </Text>
            </View>
          ) : null}
        </View>

        {/*  Exercise list  */}
        <View className="gap-y-4 p-6">
          {workout.exercises?.map((exerciseData, index) => (
            <View key={exerciseData._key} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              {/*  Exercise Header  */}
              <View className="mb-4 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">
                    {exerciseData?.exercise?.name ?? "Unknown Exercise"}
                  </Text>
                  <Text className="mt-1 text-sm text-gray-600">{exerciseData.sets?.length ?? 0} sets completed</Text>
                </View>
                <View className="size-10 items-center justify-center rounded-full bg-blue-100">
                  <Text className="font-bold text-blue-600">{index + 1}</Text>
                </View>
              </View>

              {/*  Sets  */}
              <View>
                <Text className="mb-2 text-sm font-medium text-gray-700">Sets:</Text>
                {exerciseData?.sets?.map((set, setIndex) => (
                  <View key={set._key} className="mt-2 flex-row items-center justify-between rounded-lg bg-gray-50 p-3">
                    <View className="flex-row items-center">
                      <View className="mr-3 size-6 items-center justify-center rounded-full bg-gray-200">
                        <Text className="text-sm font-medium text-gray-700">{setIndex + 1}</Text>
                      </View>
                      <Text className="font-medium text-gray-900">{set.reps} reps</Text>
                    </View>

                    {set.weight ? (
                      <View className="flex-row items-center">
                        <Ionicons name="barbell-outline" size={16} color="#6b7280" />
                        <Text className="ml-2 font-medium text-gray-700">
                          {set.weight} {set.weightUnit ?? "lbs"}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ))}
              </View>

              {/*  Exercise Volume Summary  */}
              {exerciseData.sets?.length ? (
                <View className="mt-4 border-t border-gray-100 pt-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-gray-600">Exercise Volume:</Text>
                    <Text className="text-sm font-medium text-gray-900">
                      {exerciseData?.sets?.reduce((total, set) => total + (set.weight ?? 0) * (set.reps ?? 0), 0)}{" "}
                      {exerciseData.sets[0]?.weightUnit ?? "lbs"}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
