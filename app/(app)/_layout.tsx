import { SplashScreen, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import * as React from "react";

export default function AppLayout() {
  const { isSignedIn = false, isLoaded } = useAuth();

  React.useEffect(() => {
    if(isLoaded) {
      SplashScreen.hideAsync()
    }
  } ,[isLoaded])

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
