import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppHeader from "../components/nav/AppHeader";
import NearbyCards from "../sections/home/NearbyCards";

const HomeScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
          paddingBottom: bottom,
        },
      ]}
    >
      <AppHeader />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}

        {/* Nearby cards */}
        <NearbyCards />
        {/* Footer */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
  },
});

export default HomeScreen;
