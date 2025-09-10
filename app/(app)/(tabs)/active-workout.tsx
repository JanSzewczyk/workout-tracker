import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { clsx } from "clsx";
import React from "react";
import { useStopwatch } from "react-timer-hook";
import { useWorkoutStore, WorkoutSet } from "~/store/wokrout-store";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ExerciseSelectionModal } from "~/components/exercise-selection-modal";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-expo";
import { useCreateWorkout, WorkoutPayload } from "~/lib/react-query/hooks/workout";
import { useQueryClient } from "@tanstack/react-query";

export default function ActiveExerciseTab() {
  const router = useRouter();
  const { user } = useUser();

  const { minutes, seconds, reset, totalSeconds } = useStopwatch({ autoStart: true });

  const { resetWorkout, setWeightUnit, weightUnit, setWorkoutExercises, workoutExercises } = useWorkoutStore();

  const queryClient = useQueryClient();
  const { mutateAsync: createWorkoutMutateAsync, isPending } = useCreateWorkout();

  const [showExerciseSelection, setShowExerciseSelection] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (!workoutExercises.length) {
        reset();
      }
    }, [reset, workoutExercises.length])
  );

  function handleSaveWorkout() {
    Alert.alert("Complete Workout", "Are you sure you want to complete workout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Complete", onPress: endWorkout }
    ]);
  }

  async function endWorkout() {
    try {
      const exercisesForSanity = workoutExercises
        .map((exercise) => {
          const setsForSanity = exercise.sets
            .filter((set) => set.isCompleted && set.reps && set.weight)
            .map((set) => ({
              _type: "set",
              _key: set.id,
              reps: parseInt(set.reps, 10) || 0,
              weight: parseInt(set.weight, 10) || 0,
              weightUnit: weightUnit
            }));
          return {
            _type: "workoutExercise",
            _key: exercise.id,
            exercise: {
              _type: "reference",
              _ref: exercise.sanityId
            },
            sets: setsForSanity
          };
        })
        .filter((exercise) => exercise.sets.length);

      if (!exercisesForSanity.length) {
        Alert.alert("No Completed Sets", "Please complete at least one set before saving the workout.");
      }

      const workoutData = {
        _type: "workout",
        userId: user?.id ?? "",
        date: new Date().toISOString(),
        duration: totalSeconds,
        exercises: exercisesForSanity
      } satisfies WorkoutPayload;

      await createWorkoutMutateAsync(workoutData);

      void queryClient.refetchQueries({ queryKey: ["workouts", user?.id] });

      Alert.alert("Workout Saved", "Your workout has been saved successfully!");
      resetWorkout();
      router.replace("/(app)/(tabs)/history");
    } catch {
      Alert.alert("Save Failed", "Failed to save workout. Please try again.");
    }
  }

  function getWorkoutDuration() {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function handleCancelWorkout() {
    Alert.alert("Cancel Workout", "Are you sure you want to cancel the workout?", [
      {
        text: "No",
        style: "cancel"
      },
      {
        text: "End Workout",
        onPress: () => {
          resetWorkout();
          router.back();
        }
      }
    ]);
  }

  function handleAddExercise() {
    setShowExerciseSelection(true);
  }

  function handleDeleteExercise(exerciseId: string) {
    setWorkoutExercises((exercises) => exercises.filter((exercise) => exercise.id !== exerciseId));
  }

  function handleAddSetToExercisePress(exerciseId: string) {
    const newSet: WorkoutSet = {
      id: uuidv4(),
      reps: "",
      weight: "",
      weightUnit: weightUnit,
      isCompleted: false
    };

    setWorkoutExercises((exercises) =>
      exercises.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, sets: [...exercise.sets, newSet] } : exercise
      )
    );
  }

  function handleRepsChange(exerciseId: string, setId: string, field: "reps" | "weight", value: string) {
    setWorkoutExercises((exercises) =>
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId
                  ? {
                      ...set,
                      [field]: value
                    }
                  : set
              )
            }
          : exercise
      )
    );
  }

  function handleToggleSetCompletion(exerciseId: string, setId: string) {
    setWorkoutExercises((exercises) =>
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) => (set.id === setId ? { ...set, isCompleted: !set.isCompleted } : set))
            }
          : exercise
      )
    );
  }

  function handleDeleteSet(exerciseId: string, setId: string) {
    setWorkoutExercises((exercises) =>
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.filter((set) => set.id !== setId)
            }
          : exercise
      )
    );
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      <View
        className="bg-gray-800"
        style={{
          paddingTop: Platform.OS === "ios" ? 55 : StatusBar.currentHeight || 0
        }}
      />

      {/*  Header  */}
      <View className="bg-gray-800 px-6 py-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-semibold text-white">Active Workout</Text>
            <Text className="text-gray-300">{getWorkoutDuration()}</Text>
          </View>
          <View className="flex-row items-center gap-x-3">
            {/*  Weight Unit Toggle*/}
            <View className="flex-row rounded-lg bg-gray-700 p-1">
              <TouchableOpacity
                onPress={() => setWeightUnit("lbs")}
                className={clsx("rounded px-3 py-1", weightUnit === "lbs" ? "bg-blue-600" : "")}
              >
                <Text className={clsx("text-sm font-medium", weightUnit === "lbs" ? "text-white" : "text-gray-300")}>
                  lbs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setWeightUnit("kg")}
                className={clsx("rounded px-3 py-1", weightUnit === "kg" ? "bg-blue-600" : "")}
              >
                <Text className={clsx("text-sm font-medium", weightUnit === "kg" ? "text-white" : "text-gray-300")}>
                  kg
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="rounded-lg bg-red-600 px-4 py-2" onPress={handleCancelWorkout}>
              <Text className="font-medium text-white">End Workout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/*  Content Area with While Background  */}
      <View className="flex-1 bg-white">
        {/*  Workout Progress  */}
        <View className="mt-4 px-6">
          <Text className="mb-2 text-center text-gray-600">{workoutExercises.length} exercises</Text>
        </View>

        {/*  If no exercises, show message  */}
        {!workoutExercises.length ? (
          <View className="mx-6 items-center rounded-2xl bg-gray-50 p-8">
            <Ionicons name="barbell-outline" size={48} color="#9ca3af" />
            <Text className="mt-4 text-center text-lg font-medium text-gray-600">No exercises yet</Text>
            <Text className="mt-2 text-center text-gray-500">Get started by adding your first exercise below</Text>
          </View>
        ) : null}

        {/*  All Exercises - Vertical List*/}
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView className="mt-4 flex-1 px-6">
            {workoutExercises.map((exercise) => (
              <View key={exercise.id} className="mb-8">
                {/*  Header  */}
                <TouchableOpacity
                  onPress={() => router.push({ pathname: "/exercises/[id]", params: { id: exercise.sanityId } })}
                  className="mb-3 rounded-2xl bg-gray-50 p-4"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="mb-2 text-xl font-bold text-gray-900">{exercise.name}</Text>
                      <Text className="text-gray-600">
                        {exercise.sets.length} sets * {exercise.sets.filter((set) => set.isCompleted).length} completed
                      </Text>
                    </View>

                    {/*  Delete Exercise button  */}
                    <TouchableOpacity
                      onPress={() => handleDeleteExercise(exercise.id)}
                      className="ml-3 size-10 items-center justify-center rounded-xl bg-red-500"
                    >
                      <Ionicons name="trash-outline" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>

                {/*  Exercise Sets  */}
                <View className="mb-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <Text className="mb-3 text-lg font-semibold text-gray-900">Sets</Text>
                  {!exercise.sets.length ? (
                    <Text className="py-4 text-center text-gray-500">No sets yet. Add your first set below.</Text>
                  ) : (
                    exercise.sets.map((set, setIndex) => (
                      <View
                        key={set.id}
                        className={clsx(
                          "mb-2 rounded-lg border p-3",
                          set.isCompleted ? "border-green-300 bg-green-100" : "border-gray-200 bg-gray-50"
                        )}
                      >
                        <View className="flex-row items-center justify-between gap-x-2">
                          <Text className="pr-2 text-gray-700">{setIndex + 1}</Text>

                          {/*  Rep input  */}
                          <View className="flex-1">
                            <Text className="mb-1 text-sm text-gray-500">Reps</Text>
                            <TextInput
                              value={set.reps}
                              onChangeText={(value) => handleRepsChange(exercise.id, set.id, "reps", value)}
                              placeholder="0"
                              keyboardType="numeric"
                              className={clsx(
                                "rounded-lg border px-3 py-2 text-center",
                                set.isCompleted
                                  ? "border-gray-300 bg-gray-100 text-gray-500"
                                  : "border-gray-300 bg-white"
                              )}
                              editable={!set.isCompleted}
                            />
                          </View>

                          {/*  Weight input  */}
                          <View className="flex-1">
                            <Text className="mb-1 text-sm text-gray-500">Weight</Text>
                            <TextInput
                              value={set.weight}
                              onChangeText={(value) => handleRepsChange(exercise.id, set.id, "weight", value)}
                              placeholder="0"
                              keyboardType="numeric"
                              className={clsx(
                                "rounded-lg border px-3 py-2 text-center",
                                set.isCompleted
                                  ? "border-gray-300 bg-gray-100 text-gray-500"
                                  : "border-gray-300 bg-white"
                              )}
                              editable={!set.isCompleted}
                            />
                          </View>

                          {/*  Complete Button  */}
                          <TouchableOpacity
                            onPress={() => handleToggleSetCompletion(exercise.id, set.id)}
                            className={clsx(
                              "mb-1 size-12 items-center justify-center rounded-xl",
                              set.isCompleted ? "bg-green-500" : "bg-gray-200"
                            )}
                          >
                            <Ionicons
                              name={set.isCompleted ? "checkmark" : "checkmark-outline"}
                              size={20}
                              color={set.isCompleted ? "white" : "#9ca3af"}
                            />
                          </TouchableOpacity>

                          {/*  Delete Button  */}
                          <TouchableOpacity
                            onPress={() => handleDeleteSet(exercise.id, set.id)}
                            className="ml-1 size-12 items-center justify-center rounded-xl bg-red-500"
                          >
                            <Ionicons name="trash" size={16} color="white" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))
                  )}

                  {/*  Add New Set Button  */}
                  <TouchableOpacity
                    onPress={() => handleAddSetToExercisePress(exercise.id)}
                    className="mt-2 items-center rounded-lg border-2 border-dashed border-blue-300 bg-blue-100 py-3"
                  >
                    <View className="flex-row items-center gap-x-3">
                      <Ionicons name="add" size={16} color="#3b82f6" />
                      <Text className="font-medium text-blue-600">Add Set</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/*  Add Exercise Button  */}
            <TouchableOpacity
              className="mb-8 items-center rounded-2xl bg-blue-600 py-4 active:bg-blue-700"
              activeOpacity={0.8}
              onPress={handleAddExercise}
            >
              <View className="flex-row items-center gap-x-2">
                <Ionicons name="add" size={20} color="white" />
                <Text className="text-lg font-semibold text-white">Add Exercise</Text>
              </View>
            </TouchableOpacity>

            {/* Complete Workout Button */}
            <TouchableOpacity
              onPress={handleSaveWorkout}
              className={clsx(
                "mb-20 items-center rounded-2xl py-4",
                isPending ||
                  !workoutExercises.length ||
                  workoutExercises.some((exercise) => exercise.sets.some((set) => !set.isCompleted))
                  ? "bg-gray-400"
                  : "bg-green-600 active:bg-green-700"
              )}
              disabled={
                isPending ||
                !workoutExercises.length ||
                workoutExercises.some((exercise) => exercise.sets.some((set) => !set.isCompleted))
              }
            >
              {isPending ? (
                <View className="flex-row items-center gap-x-2">
                  <ActivityIndicator size="small" color="white" />
                  <Text className="text-lg font-semibold text-white">Saving...</Text>
                </View>
              ) : (
                <Text className="text-lg font-semibold text-white">Complete Workout</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/*  Exercise Selection Modal  */}
      <ExerciseSelectionModal visible={showExerciseSelection} onClose={() => setShowExerciseSelection(false)} />
    </View>
  );
}
