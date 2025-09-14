import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot, SplashScreen } from "expo-router";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import { QueryClientProvider } from "@tanstack/react-query";
import "react-native-get-random-values";

import { queryClient } from "~/lib/react-query/client";
import "./global.css";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
