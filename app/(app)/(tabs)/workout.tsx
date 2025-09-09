import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function WorkoutTab() {
  const router = useRouter();

  function handleStartWorkout() {
    router.push("/active-workout");
  }

  return (
    <SafeAreaView edges={["left", "right", "top"]} className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      {/*  Main Start Workout Screen  */}
      <View className="flex-1 px-6">
        {/*  Header  */}
        <View className="px-6 pt-8">
          <Text className="mb-2 text-3xl font-bold text-gray-900">Ready to Train?</Text>
          <Text className="text-lg text-gray-600">Start your workout</Text>
        </View>
      </View>

      {/*  Generic Start Workout Card  */}
      <View className="mx-6 mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <View className="mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="mr-3 size-12 items-center justify-center rounded-full bg-blue-100">
              <Ionicons name="fitness" size={24} color="#3682f6" />
            </View>
            <View>
              <Text className="text-xl font-semibold text-gray-900">Start Workout</Text>
              <Text className="text-gray-500">Begin your training session</Text>
            </View>
          </View>
          <View className="rounded-full bg-green-100 px-3 py-1">
            <Text className="text-sm font-normal text-green-700">Ready</Text>
          </View>
        </View>

        {/*  Start Button  */}
        <TouchableOpacity
          onPress={handleStartWorkout}
          activeOpacity={0.8}
          className="items-center rounded-2xl bg-blue-600 py-4 active:bg-blue-700"
        >
          <View className="flex-row items-center gap-3">
            <Ionicons name="play" size={20} color="white" />
            <Text className="text-lg font-semibold text-white">Start Workout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
