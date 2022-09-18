import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { fontNames } from "../assets";
import TabBar from "../components/nav/TabBar";
import HomeScreen from "../screens/Home";
import { colors } from "../theme/colors";

const Tabs = createBottomTabNavigator();

const PlaceHolder = () => (
  <View style={styles.container}>
    <Text>This is a place holder</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundColor: colors.paper.main,
    flex: 1,
  },
  tabLabel: {
    fontFamily: fontNames["SF-Pro-Rounded-Bold"],
    fontSize: 22,
    textAlign: "center",
  },
});

export default function TabNavigation() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBar={TabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Explore" component={PlaceHolder} />
    </Tabs.Navigator>
  );
}
