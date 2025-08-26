import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  const onPress = React.useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri()
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        await setActive!({
          session: createdSessionId
        });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [startSSOFlow]);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-xl border-gray-200 bg-white py-4 shadow-sm"
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center">
        <Ionicons name="logo-google" size={20} color="#ea4335" />
        <Text className="ml-2 text-lg font-semibold text-gray-900">Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
}
