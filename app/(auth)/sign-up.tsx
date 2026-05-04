import { useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const [firstName, setFirstName] = React.useState();

  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../assets/images/kribb.png")}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Create account
        </Text>
        <Text>Find your dream home today</Text>
        <View className="flex-row gap-3 mb-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 mt-4"
            placeholder="First Name"
            placeholderTextColor="#9ca3af"
            autoCapitalize="words"
          />
        </View>
      </View>
    </ScrollView>
  );
}
