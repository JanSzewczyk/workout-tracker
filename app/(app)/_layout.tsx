import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
  const { isSignedIn = false, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="exercises/[id]"
          options={{
            presentation: "modal",
            gestureEnabled: true,
            animationTypeForReplace: "push",
            animation: "slide_from_bottom"
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/sign-up/index" />
        <Stack.Screen name="(auth)/sign-up/otp" />
      </Stack.Protected>
    </Stack>
  );
}
