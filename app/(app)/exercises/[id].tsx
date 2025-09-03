import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image, Linking, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { defineQuery } from "groq";
import { client, urlFor } from "~/lib/sanity/client";
import { Exercise } from "~/lib/sanity/types";
import { clsx } from "clsx";
import { getDifficultyColor, getDifficultyLabel } from "~/utils/exercise";

export const singleExerciseQuery = defineQuery(`*[_type == "exercise" && _id == $id][0]`);

export default function ExerciseDetailsView() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [exercise, setExercise] = React.useState<Exercise | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiGuidance, setAiGuidance] = React.useState<string>();

  React.useEffect(() => {
    void fetchExercise();

    async function fetchExercise() {
      try {
        const exercise = await client.fetch(singleExerciseQuery, { id });
        setExercise(exercise);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    }
  }, [id]);

  async function getAiGuidance() {
    setAiLoading(true);
    try {
      const response = await fetch("/api/ai/exercise-guidance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ exerciseId: exercise?._id })
      });

      if (!response.ok) {
        throw new Error("Error fetching AiGuidance");
      }

      const data = await response.json();
      setAiGuidance(data.message);
    } catch (error) {
      console.error("Error fetching AiGuidance:", error);
      setAiGuidance("Sorry, we could not fetch AI guidance at this time. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="text-gray-500">Loading exercise...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!exercise) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-lg font-semibold text-gray-500">Exercise not found: {id}</Text>
          <Text className="mb-6 text-center text-base text-gray-300">
            The exercise you are looking for does not exist.
          </Text>
          <TouchableOpacity onPress={() => router.back()} className="rounded-lg bg-blue-500 px-6 py-3">
            <Text className="font-semibold text-white">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View className="absolute left-0 right-0 top-12 z-10 px-4">
        <TouchableOpacity
          className="size-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm"
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/*  Hero image  */}
        <View className="relative h-80 bg-white">
          {exercise?.image ? (
            <Image
              source={{ uri: urlFor(exercise.image?.asset?._ref ?? "").url() }}
              className="size-full"
              resizeMode="contain"
            />
          ) : (
            <View className="size-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
              <Ionicons name="fitness" size={80} color="white" />
            </View>
          )}
        </View>

        {/*  Content  */}
        <View className="p-6">
          {/*  Title and difficulty  */}
          <View className="mb-4 flex-row items-start justify-between">
            <View className="flex-1 items-start">
              <Text className="mb-2 text-3xl font-bold text-gray-800">{exercise?.name}</Text>
              <View className={clsx("rounded-full px-3 py-1", getDifficultyColor(exercise?.difficulty))}>
                <Text className="text-sm font-semibold text-white">{getDifficultyLabel(exercise?.difficulty)}</Text>
              </View>
            </View>
          </View>

          {/*  Description  */}
          <View className="mb-6">
            <Text className="mb-3 text-xl font-semibold text-gray-800">Description</Text>
            <Text className="text-base leading-6 text-gray-600">
              {exercise?.description ?? "No description available for this exercise."}
            </Text>
          </View>

          {/*  Video section  */}
          {exercise?.videoUrl ? (
            <View className="mb-6">
              <Text className="mb-3 text-xl font-semibold text-gray-800">Video Tutorial</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(exercise.videoUrl as string)}
                className="flex-row items-center rounded-xl bg-red-500 p-4"
              >
                <View className="mr-4 size-12 items-center justify-center rounded-full bg-white">
                  <Ionicons name="play" size={20} color="#ef4444" />
                </View>
                <View>
                  <Text className="text-lg font-semibold text-white">Watch Tutorial</Text>
                  <Text className="text-sm text-red-100">Learn proper form</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}

          {/*  TODO: AI Guidance  */}

          {/*  ---  */}

          {/*  Action Buttons  */}
          <View className="mt-8 gap-2">
            <TouchableOpacity
              className={clsx(
                "items-center rounded-xl py-4",
                aiLoading ? "bg-gray-400" : aiGuidance ? "bg-green-500" : "bg-blue-500"
              )}
              onPress={getAiGuidance}
              disabled={aiLoading}
            >
              {aiLoading ? (
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="white" />
                  <Text className="text- white ml-2 text-lg font-bold">Loading...</Text>
                </View>
              ) : (
                <Text className="text-lg font-bold text-white">
                  {aiGuidance ? "Refresh AI Guidance" : "Get AI Guidance on Form & Tips"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity className="items-center rounded-xl bg-gray-200 py-4" onPress={() => router.back()}>
              <Text className="text-lg font-bold text-gray-800">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
