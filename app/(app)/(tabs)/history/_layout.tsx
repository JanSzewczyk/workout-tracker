import { Stack } from "expo-router";

export default function HistoryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[workoutId]"
        options={{ headerShown: true, headerTitle: "Workout Record", headerBackTitle: "History" }}
      />
    </Stack>
  );
}
