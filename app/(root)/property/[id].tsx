import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";
import { Property } from "@/types";
import { useAuth } from "@clerk/expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function PropertyDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userId } = useAuth();
  const router = useRouter();
  const isAdmin = useUserStore((state) => state.isAdmin);

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  const fetchProperty = async () => {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();
    setProperty(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  if (!property) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Property not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <ScrollView>
          <View>
            <View style={{ opacity: property.is_sold ? 0.5 : 1 }}>
              <FlatList
                data={property.images}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setImageViewerVisible(true)}>
                    <Image
                      source={{ uri: item }}
                      style={{ width, height: 300 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
              />
            </View>
          </View>
        </ScrollView>
        <Text>PropertyDetails</Text>
      </View>
    </SafeAreaView>
  );
}
