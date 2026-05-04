import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const { isSignedIn } = useAuth();

  const router = useRouter();

  const isLoading = fetchStatus === "fetching";

  if (signUp.status === "complete" || isSignedIn) {
    return;
  }

  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });

    if (error) {
      alert(error.message);
      return;
    }
    if (!error) await signUp.verifications.sendEmailCode();
  };

  const onVerifyPress = async () => {
    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    }
  };

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../assets/images/kribb.png")}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Verify Your Account
        </Text>
        <Text>we've sent an email to {email}</Text>

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-4"
          placeholder="Enter verification code"
          placeholderTextColor="#9ca3af"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
        />
        {errors.fields.emailAddress && (
          <Text className="text-red-500 mb-4">
            {errors.fields.emailAddress.message}
          </Text>
        )}
        <TouchableOpacity
          onPress={onVerifyPress}
          disabled={isLoading}
          className="bg-blue-500 rounded-xl py-3 mt-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold">Verify</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => signUp.verifications.sendEmailCode()}
          className=" py-3 mt-1"
        >
          <Text className="text-blue-600 font-bold">Resend Code</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 mt-4"
              placeholder="Last Name"
              placeholderTextColor="#9ca3af"
              autoCapitalize="words"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
            placeholder="Email address "
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.fields.emailAddress && (
            <Text className="text-red-500 mb-4">
              {errors.fields.emailAddress.message}
            </Text>
          )}
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.fields.password && (
            <Text className="text-red-500 mb-4">
              {errors.fields.password.message}
            </Text>
          )}
          <TouchableOpacity
            onPress={onSignUpPress}
            disabled={isLoading}
            className="bg-blue-500 rounded-xl py-3 mt-4"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-bold">Sign Up</Text>
            )}
          </TouchableOpacity>
          <View className="flex-row justify-center mt-4 gap-2">
            <Text className="text-gray-500">already have an account?</Text>
            <Link href="/sign-in">
              <Text className="text-blue-600 font-semibold">Sign In</Text>
            </Link>
          </View>
          <View nativeID="clerk-captcha" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
