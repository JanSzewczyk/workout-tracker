import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignOutButton } from "@/components/sign-out-button";

export default function HomeTab() {
  return (
    <SafeAreaView>
      <Text>Home Tab</Text>
      <SignOutButton />
    </SafeAreaView>
  );
}
