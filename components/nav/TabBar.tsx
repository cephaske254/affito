import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { createRef, Fragment, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { fontNames } from "../../assets";
import { APP_NAME } from "../../constants";
import { colors } from "../../theme/colors";
import { LogoSvg } from "./icons";

type Props = BottomTabBarProps;

const TabBar = ({ descriptors, state, navigation }: Props) => {
  const widths = createRef<{}>();

  const onPress = (route: typeof state.routes[number], active: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!active && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({ name: route.name, merge: true } as any);
    }
  };

  return (
    <View style={[styles.container]}>
      <View
        style={{
          backgroundColor: colors.paper.dark,
          borderRadius: 30,
          display: "flex",
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          // const label =
          //   options.tabBarLabel !== undefined
          //     ? options.tabBarLabel
          //     : options.title !== undefined
          //     ? options.title
          //     : route.name;

          const active = state.index === index;

          return (
            <Animated.View
              key={route.name}
              onLayout={({
                nativeEvent: {
                  layout: { width },
                },
              }) => {
                // @ts-ignore
                if (!widths.current) widths.current = {};
                widths.current[route.name] = width;
              }}
            >
              <Tab active={active} onPress={() => onPress(route, active)}>
                {(() => {
                  switch (route.name) {
                    default:
                      return (
                        <Fragment>
                          <LogoSvg
                            color={
                              active ? colors.paper.main : colors.primary.main
                            }
                            width={10}
                            height={10}
                          />
                          <Text
                            style={{
                              color: active
                                ? colors.paper.main
                                : colors.primary.main,
                              fontFamily: fontNames["SF-Pro-Rounded-Bold"],
                              marginLeft: 2,
                            }}
                          >
                            {route.name === "Home" ? APP_NAME : route.name}
                          </Text>
                        </Fragment>
                      );
                  }
                })()}
              </Tab>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const Tab = ({
  children,
  active,
  onPress,
}: {
  children: ReactNode;
  active: boolean;
  onPress: VoidFunction;
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.tabContainer, active && styles.tabContainerActive]}>
      {children}
    </View>
  </TouchableOpacity>
);
export default TabBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 150,
    bottom: 0,
    left: 0,
    right: 0,
  },

  tabContainer: {
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 20,
  },
  tabContainerActive: {
    backgroundColor: colors.primary.main,
    shadowColor: colors.primary.main,
    shadowOffset: { height: 4, width: -3 },
    shadowOpacity: 0.3,
  },
});
