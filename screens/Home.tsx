import { SafeAreaView } from "react-native";
import AppHeader from "../components/nav/AppHeader";
import NearbyCards from "../sections/home/NearbyCards";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <AppHeader />

      {/* Nearby cards */}
      <NearbyCards />
      {/* Footer */}
    </SafeAreaView>
  );
};

export default HomeScreen;
