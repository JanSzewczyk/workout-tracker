import * as React from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBrandedLogo } from "~/components/app-branded-logo";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { SignUpFormData, signUpSchema } from "~/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "~/components/ui/text-field";

export default function SignUpScreen() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: "onChange"
  });

  // Handle submission of sign-up form
  const onSignUpPress = async ({ password, email }: SignUpFormData) => {
    if (!isLoaded) {
      return;
    }

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: email,
        password
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Redirect to other screen to see second form
      // and capture OTP code
      router.replace("/(app)/(auth)/sign-up/otp");
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        setError("root", { message: err.errors[0]?.longMessage });
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        {/*  Main  */}
        <View className="flex-1 justify-center px-6">
          {/*  Logo/Branding  */}
          <AppBrandedLogo />

          {/*  Sign up form  */}
          <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <Text className="mb-6 text-center text-2xl font-bold text-gray-900">Create Your Account</Text>

            <View className="mb-6 gap-y-4">
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

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
                  <TextField
                    icon="lock-closed-outline"
                    label="Confirm Password"
                    placeholder="Confirmr your password"
                    error={error?.message}
                    editable={!isSubmitting}
                    secureTextEntry
                    onChangeText={onChange}
                    {...rest}
                  />
                )}
              />
            </View>

            {/*  Sign Up button  */}
            <TouchableOpacity
              onPress={handleSubmit(onSignUpPress)}
              disabled={isSubmitting}
              className={`rounded-xl py-4 shadow-sm ${isSubmitting ? "bg-gray-400" : "bg-blue-600"}`}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center">
                {isSubmitting ? (
                  <Ionicons name="refresh" size={20} color="white" />
                ) : (
                  <Ionicons name="person-add-outline" size={20} color="white" />
                )}
                <Text className="ml-2 text-lg font-semibold text-white">
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Text>
              </View>
            </TouchableOpacity>

            {/*  Terms  */}
            <Text className="mt-4 text-center text-xs text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>

          {/*  Sign in Link  */}
          <View className="flex-row items-center justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="font-semibold text-blue-600">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*  Footer  */}
        <View className="pb-6">
          <Text className="text-center text-sm text-gray-500">
            Ready to transform your fitness journey? Sign up now and take the first step towards a healthier, stronger
            you!
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
