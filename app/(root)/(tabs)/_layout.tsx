import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import "../../../global.css";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Search</Label>
        <Icon sf="magnifyingglass" />
      </NativeTabs.Trigger>
      {/* create Property */}
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
