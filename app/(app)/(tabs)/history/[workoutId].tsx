import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useWorkoutByIdQuery } from "~/lib/react-query/hooks/workout";

export default function HistoryWorkoutScreen() {
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

  const { data: workout, isRefetching, isLoading } = useWorkoutByIdQuery(workoutId);

  return (
    <View>
      <Text>Workout Screen</Text>
    </View>
  );
}
