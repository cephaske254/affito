import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type SharedElementsNavigationParams = {
  apartment_details: {
    id: number;
  };

  Home: NativeStackScreenProps<TabNavigationParams>;
};

export type TabNavigationParams = {
  home: undefined;
  explore: undefined;
};

export type RootStackParamList = SharedElementsNavigationParams;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
