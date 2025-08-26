import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GoogleSignIn from "@/components/google-sign-in";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        {/*  Header section  */}
        <View className="flex-1 justify-center px-6">
          {/*  Logo/Branding  */}
          <View className="mb-8 items-center">
            <View className="mb-4 size-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
              <Ionicons name="fitness" size={40} color="white" />
            </View>
            <Text className="mb-2 text-3xl font-bold text-gray-900">Fit Tracker</Text>
            <Text className="text-center text-lg text-gray-600">
              Frack your fitness journey{"\n"}and reach your goals
            </Text>
          </View>

          {/*  Sign in form  */}
          <View className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <Text className="mb-6 text-center text-2xl font-bold text-gray-900">Welcome Back</Text>

            {/*  Email Input  */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Email</Text>
              <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
                <Ionicons name="mail-outline" size={20} color="#6b7280" />
                <TextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Enter your email"
                  placeholderClassName="text-gray-400"
                  onChangeText={setEmailAddress}
                  className="ml-3 flex-1 text-gray-900"
                  editable={!isLoading}
                />
              </View>
            </View>

            {/*  Password Input  */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-700">Password</Text>
              <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
                <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
                <TextInput
                  value={password}
                  placeholder="Enter your password"
                  placeholderClassName="text-gray-400"
                  secureTextEntry
                  onChangeText={setPassword}
                  className="ml-3 flex-1 text-gray-900"
                  editable={!isLoading}
                />
              </View>
            </View>
          </View>

          {/*  Sign In button  */}
          <TouchableOpacity
            onPress={onSignInPress}
            disabled={isLoading}
            className={`rounded-xl py-4 shadow-sm ${isLoading ? "bg-gray-400" : "bg-blue-600"}`}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-center">
              {isLoading ? (
                <Ionicons name="refresh" size={20} color="white" />
              ) : (
                <Ionicons name="log-in-outline" size={20} color="white" />
              )}
              <Text className="ml-2 text-lg font-semibold text-white">{isLoading ? "Signing In..." : "Sign In"}</Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <View className="my-4 flex-row items-center">
            <View className="h-px flex-1 bg-gray-200" />
            <Text className="px-4 text-sm text-gray-500">or</Text>
            <View className="h-px flex-1 bg-gray-200" />
          </View>

          {/* Google Sign In button */}
          {/* to be implemented */}
          <GoogleSignIn />

          {/*  Sign Up Link */}
          <View className="mt-4 flex-row items-center justify-center">
            <Text className="text-gray-600">Don&#39;t have an account? </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="font-semibold text-blue-600">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/*  Footer section */}
        <View className="pb-4">
          <Text className="text-center text-sm text-gray-500">Start your fitness journey today!</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
