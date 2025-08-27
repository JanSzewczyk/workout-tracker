import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GoogleSignIn from "~/components/google-sign-in";
import { AppBrandedLogo } from "~/components/app-branded-logo";
import { TextField } from "~/components/ui/text-field";
import { Controller, useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "~/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    reValidateMode: "onChange"
  });

  // Handle the submission of the sign-in form
  async function handleSignInPress({ email, password }: LoginFormData) {
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
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
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        {/*  Header section  */}
        <View className="flex-1 justify-center px-6">
          {/*  Logo/Branding  */}
          <AppBrandedLogo />

          {/*  Sign in form  */}
          <View className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <Text className="mb-6 text-center text-2xl font-bold text-gray-900">Welcome Back</Text>

            <View className="gap-y-4">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
                  <TextField
                    icon="mail-outline"
                    label="Email"
                    autoCapitalize="none"
                    placeholder="Enter your email"
                    error={error?.message}
                    editable={!isSubmitting}
                    autoComplete="email"
                    onChangeText={onChange}
                    {...rest}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
                  <TextField
                    icon="lock-closed-outline"
                    label="Password"
                    placeholder="Enter your password"
                    error={error?.message}
                    editable={!isSubmitting}
                    secureTextEntry
                    onChangeText={onChange}
                    {...rest}
                  />
                )}
              />
            </View>
          </View>

          {/*  Sign In button  */}
          <TouchableOpacity
            onPress={handleSubmit(handleSignInPress)}
            disabled={isSubmitting}
            className={`rounded-xl py-4 shadow-sm ${isSubmitting ? "bg-gray-400" : "bg-blue-600"}`}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-center">
              {isSubmitting ? (
                <Ionicons name="refresh" size={20} color="white" />
              ) : (
                <Ionicons name="log-in-outline" size={20} color="white" />
              )}
              <Text className="ml-2 text-lg font-semibold text-white">
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Text>
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
