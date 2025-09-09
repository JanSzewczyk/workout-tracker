import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { clsx } from "clsx";
import React from "react";
import { useStopwatch } from "react-timer-hook";
import { useWorkoutStore } from "~/store/wokrout-store";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ExerciseSelectionModal } from "~/components/exercise-selection-modal";

export default function ActiveExerciseTab() {
  const router = useRouter();
  const { minutes, seconds, reset } = useStopwatch({ autoStart: true });

  const { addExerciseToWorkout, resetWorkout, setWeightUnit, weightUnit, setWorkoutExercises, workoutExercises } =
    useWorkoutStore();

  const [showExerciseSelection, setShowExerciseSelection] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (!workoutExercises.length) {
        reset();
      }
    }, [reset, workoutExercises.length])
  );

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
              <View key={exercise.id} className="mb-8"></View>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/*  Exercise Selection Modal  */}
      <ExerciseSelectionModal visible={showExerciseSelection} onClose={() => setShowExerciseSelection(false)} />
    </View>
  );
}
