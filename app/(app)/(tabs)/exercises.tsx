import * as React from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextField } from "~/components/ui/text-field";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Exercise } from "~/lib/sanity/types";
import { client } from "~/lib/sanity/client";
import { ExerciseCard } from "~/components/exercise-card";
import { useExercisesQuery } from "~/lib/react-query/hooks/exercise";

export default function ExercisesTab() {
  const router = useRouter();

  const { data: exercises, refetch, isRefetching } = useExercisesQuery();

  const [searchParams, setSearchParams] = React.useState("");

  const [filteredExercises, setFilteredExercises] = React.useState<Exercise[]>([]);

  React.useEffect(() => {
    const filtered = exercises.filter((exercise) => exercise.name?.toLowerCase().includes(searchParams.toLowerCase()));
    setFilteredExercises(filtered);
  }, [exercises, searchParams]);

  return (
    // TODO Fix this SafeAreaView issue on Android with Expo Router
    // https://github.com/AppAndFlow/react-native-safe-area-context/issues/650
    <SafeAreaView edges={["left", "right", "top"]} className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/*  Header  */}
        <View className="border-b border-gray-200 bg-white px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900">Exercise Library</Text>
          <Text className="mb-4 mt-1 text-gray-600">Discover and master new exercises</Text>

          {/*  Search bar  */}
          <TextField
            value={searchParams}
            onChangeText={setSearchParams}
            icon="search"
            placeholder="Search exercises..."
            showClearButton={!!searchParams}
            onRemoveText={() => setSearchParams("")}
          />
        </View>

        {/*  Exercises list */}
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="p-6"
          renderItem={({ item }) => (
            <ExerciseCard
              item={item}
              onPress={() =>
                router.push({
                  pathname: "/exercises/[id]",
                  params: { id: item._id }
                })
              }
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={["#3b82f6"]}
              tintColor="#3b82f6"
              title="Pull to refresh exercise"
              titleColor="#6b7280"
            />
          }
          ListEmptyComponent={
            <View className="items-center rounded-2xl bg-white p-8">
              <Ionicons name="fitness-outline" size={64} color="#9ca3af" />
              <Text className="mt-4 text-xl font-semibold text-gray-900">
                {searchParams ? "No exercises match your search" : "Loading exercises..."}
              </Text>
              <Text className="mt-2 text-center text-gray-600">
                {searchParams ? "Try adjusting your search" : "Your exercises will appear here once loaded"}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
