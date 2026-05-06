import { useUserStore } from "@/store/userStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, View } from "react-native";
import "../../../global.css";

export default function TabLayout() {
  const isAdmin = useUserStore((state) => state.isAdmin);

  if (Platform.OS === "android") {
    return (
      <View className="flex-1 bg-red-500">
        <Tabs
          screenOptions={{
            headerShown: false, // <-- This is the key fix
            tabBarStyle: {
              borderTopWidth: 0, // Removes the physical border line
              elevation: 0, // Removes the shadow on Android
              backgroundColor: "#f9fafb",
            },
            tabBarBackground: () => (
              <BlurView
                intensity={90} // Adjust for more/less blur
                tint="light" // Options: 'light', 'dark', 'default'
                style={{ flex: 1 }}
              />
            ),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "search",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" size={size} color={color} />
              ),
            }}
          />
          {isAdmin && (
            <Tabs.Screen
              name="create"
              options={{
                title: "Add Property",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="search" size={size} color={color} />
                ),
              }}
            />
          )}
          <Tabs.Screen
            name="saved"
            options={{
              title: "saved",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    );
  }

  // iOS – keep your NativeTabs with SF Symbols
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <Label>Search</Label>
        <Icon sf="magnifyingglass" />
      </NativeTabs.Trigger>
      {isAdmin && (
        <NativeTabs.Trigger name="create">
          <Label>Add Property</Label>
          <Icon sf="plus.capsule.fill" />
        </NativeTabs.Trigger>
      )}
      <NativeTabs.Trigger name="saved">
        <Label>Saved</Label>
        <Icon sf="heart.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon sf="person.fill" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
