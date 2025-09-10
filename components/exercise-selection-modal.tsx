import { FlatList, Modal, RefreshControl, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useWorkoutStore } from "~/store/wokrout-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextField } from "~/components/ui/text-field";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ExerciseCard } from "~/components/exercise-card";
import { Exercise } from "~/lib/sanity/types";
import { useExercisesQuery } from "~/lib/react-query/hooks/exercise";

export type ExerciseSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function ExerciseSelectionModal({ onClose, visible }: ExerciseSelectionModalProps) {
  const { addExerciseToWorkout } = useWorkoutStore();

  const { data: exercises, refetch, isRefetching } = useExercisesQuery();

  const [searchParams, setSearchParams] = React.useState("");
  const [filteredExercises, setFilteredExercises] = React.useState<Exercise[]>([]);

  React.useEffect(() => {
    const filtered = exercises.filter((exercise) => exercise.name?.toLowerCase().includes(searchParams.toLowerCase()));
    setFilteredExercises(filtered);
  }, [exercises, searchParams]);

  function handleExercisePress(exercise: Exercise) {
    addExerciseToWorkout({ name: exercise.name ?? "", sanityId: exercise._id });
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />

        {/*  Header  */}
        <View className="border-b border-gray-100 bg-white px-6 pb-6 pt-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-gray-800">Add Exercise</Text>
            <TouchableOpacity className="size-8 items-center justify-center" onPress={onClose}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <Text className="mb-4 text-gray-600">Tap any exercise to add it to your workout</Text>

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
          renderItem={({ item }) => <ExerciseCard item={item} onPress={() => handleExercisePress(item)} />}
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
      </SafeAreaView>
    </Modal>
  );
}
