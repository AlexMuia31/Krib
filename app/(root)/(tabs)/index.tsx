import { useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();

  const [featured, setFeatured] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View>
        <Text>HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
}
