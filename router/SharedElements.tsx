import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import ApartmentDetailScreen from "../screens/apartment/Detail";
import TabNavigation from "./Tabs";
import { SharedElementsNavigationParams } from "./types";

const Stack =
  createSharedElementStackNavigator<SharedElementsNavigationParams>();

export default function SharedElementsNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen
        name="apartment_details"
        component={ApartmentDetailScreen}
      />
    </Stack.Navigator>
  );
}
