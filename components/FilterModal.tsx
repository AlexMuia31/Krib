import useFilterStore from "@/store/filterStore";
import React from "react";
import { Text, View } from "react-native";

export default function FilterModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const {
    search,
    type,
    bedrooms,
    minPrice,
    maxPrice,
    setType,
    setSearch,
    setBedrooms,
    setMinPrice,
    setMaxPrice,
  } = useFilterStore();
  return (
    <View>
      <Text>FilterModal</Text>
    </View>
  );
}
