import * as React from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBrandedLogo } from "~/components/app-branded-logo";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const isLoading = false;
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP codexc
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  async function onVerifyPress() {
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

  if (pendingVerification) {
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
                  {emailAddress}
                </Text>
              </View>

              {/*  Verification form  */}
              <View className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <Text className="mb-6 text-center text-2xl font-bold text-gray-900">Enter Verification Code</Text>

                {/*  Code Input  */}
                <View className="mb-4">
                  <Text className="mb-2 text-sm font-medium text-gray-700">Verification Code</Text>
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
                    <Ionicons name="key-outline" size={20} color="#6b7280" />
                    <TextInput
                      value={code}
                      placeholder="Enter 6-digit code"
                      placeholderClassName="text-gray-400"
                      onChangeText={setCode}
                      className="ml-3 flex-1 text-lg tracking-widest text-gray-900"
                      keyboardType="number-pad"
                      maxLength={6}
                      editable={!isLoading}
                    />
                  </View>
                </View>

                {/*  Verify Button  */}
                <TouchableOpacity
                  onPress={onVerifyPress}
                  disabled={isLoading}
                  className={`mb-4 rounded-xl py-4 shadow-sm ${isLoading ? "bg-gray-400" : "bg-green-600"}`}
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center justify-center">
                    {isLoading ? (
                      <Ionicons name="refresh" size={20} color="white" />
                    ) : (
                      <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                    )}
                    <Text className="ml-2 text-lg font-semibold text-white">
                      {isLoading ? "Verifying..." : "Verify Email"}
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-1 px-6">
          {/*  Main  */}
          <View className="flex-1 justify-center">
            {/*  Logo/Branding  */}
            <AppBrandedLogo />

            {/*  Sign up form  */}
            <View className="mb-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <Text className="mb-6 text-center text-2xl font-bold text-gray-900">Create Your Account</Text>

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
              <View className="mb-6">
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
                <Text className="mt-1 text-sm text-gray-500">Must be at least 8 characters</Text>
              </View>

              {/*  Sign Up button  */}
              <TouchableOpacity
                onPress={onSignUpPress}
                disabled={isLoading}
                className={`rounded-xl py-4 shadow-sm ${isLoading ? "bg-gray-400" : "bg-blue-600"}`}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <Ionicons name="refresh" size={20} color="white" />
                  ) : (
                    <Ionicons name="person-add-outline" size={20} color="white" />
                  )}
                  <Text className="ml-2 text-lg font-semibold text-white">
                    {isLoading ? "Creating Account..." : "Create Account"}
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
