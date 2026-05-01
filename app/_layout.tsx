import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaView className="bg-red-500 p-4">
      <View>
        <Text className="text-8xl">
          Edit app/index.tsx to edit this screen.
        </Text>
      </View>
    </SafeAreaView>
  );
}
