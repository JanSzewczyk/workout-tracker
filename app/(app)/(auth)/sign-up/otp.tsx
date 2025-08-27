import * as React from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { OTPFormData, otpSchema } from "~/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "~/components/ui/text-field";

export default function SignUpOTPScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    reValidateMode: "onChange"
  });

  // Handle submission of verification form
  async function handleVerifyPress({ code }: OTPFormData) {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-1 px-6">
          <View className="flex-1 justify-center">
            {/*  Logo/Branding  */}
            <View className="mb-8 items-center">
              <View className="mb-4 size-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                <Ionicons name="mail" size={40} color="white" />
              </View>
              <Text className="mb-2 text-3xl font-bold text-gray-900">Check Your Email</Text>
              <Text className="text-center text-lg text-gray-600">
                We&#39;ve sent a verification code to{"\n"}
                <Text className="text-bold">{email}</Text>
              </Text>
            </View>

            {/*  Verification form  */}
            <View className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <Text className="mb-6 text-center text-2xl font-bold text-gray-900">Enter Verification Code</Text>

              {/*  Code Input  */}
              <View className="mb-4">
                <Controller
                  control={control}
                  name="code"
                  render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
                    <TextField
                      icon="key-outline"
                      label="Verification Code"
                      autoCapitalize="none"
                      placeholder="Enter 6-digit code"
                      error={error?.message}
                      editable={!isSubmitting}
                      keyboardType="number-pad"
                      maxLength={6}
                      onChangeText={onChange}
                      {...rest}
                    />
                  )}
                />
              </View>

              {/*  Verify Button  */}
              <TouchableOpacity
                onPress={handleSubmit(handleVerifyPress)}
                disabled={isSubmitting}
                className={`mb-4 rounded-xl py-4 shadow-sm ${isSubmitting ? "bg-gray-400" : "bg-green-600"}`}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  {isSubmitting ? (
                    <Ionicons name="refresh" size={20} color="white" />
                  ) : (
                    <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                  )}
                  <Text className="ml-2 text-lg font-semibold text-white">
                    {isSubmitting ? "Verifying..." : "Verify Email"}
                  </Text>
                </View>
              </TouchableOpacity>

              {/*  Resend Code Link  */}
              <TouchableOpacity className="py-2">
                <Text className="text-center font-medium text-blue-600">Didn&#39;t receive a code? Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/*  Footer section */}
        <View className="pb-4">
          <Text className="text-center text-sm text-gray-500">Almost there! Just one more step</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
