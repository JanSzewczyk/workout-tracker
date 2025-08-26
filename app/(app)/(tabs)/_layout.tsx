import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ size, color }) => <AntDesign name="home" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          headerShown: false,
          tabBarIcon: ({ size, color }) => <AntDesign name="book" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: "Workout",
          headerShown: false,
          tabBarIcon: ({ size, color }) => <AntDesign name="pluscircle" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="active-workout"
        options={{
          title: "Active Workout",
          headerShown: false,
          href: null,
          tabBarStyle: { display: "none" }
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ size, color }) => <AntDesign name="clockcircleo" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false
          // tabBarIcon: ({ size, color }) => <AntDesign name="clockcircleo" size={size} color={color} />
        }}
      />
    </Tabs>
  );
}
