import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  function handleSignOut() {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => signOut()
      }
    ]);
  }

  async function handleSignOutaa() {
    try {
      await signOut();
      await Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }
  return (
    <TouchableOpacity className="rounded-2xl bg-red-600 p-4 shadow-sm" activeOpacity={0.8} onPress={handleSignOut}>
      <View className="flex-row items-center justify-center">
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text className="ml-2 text-lg font-semibold text-white">Sign Out</Text>
      </View>
    </TouchableOpacity>
  );
};
