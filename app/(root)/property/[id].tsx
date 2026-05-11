import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PropertyDetails() {
  return (
    <SafeAreaView>
      <View className="flex-1 bg-white">
        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      </View>
    </SafeAreaView>
  );
}
