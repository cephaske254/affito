import { BlurView } from "expo-blur";
import { Fragment, ReactNode } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { fontNames } from "../../assets";
import BookmarkIcon from "../../components/BookmarkIcon";
import { Apartment } from "../../models/apartment";
import { colors } from "../../theme/colors";
import { scale } from "../../utils/fontSize";
import { apartments } from "./apartments";

const { width: windowWidth } = Dimensions.get("window");
const AnimatedImage = Animated.createAnimatedComponent(Image);

const BUTTON_HEIGHTS = 60;
const CARD_PADDING = 10;
const CARD_WIDTH = windowWidth * 0.83;

const roundToNearestCardWidth = (x) => {
  "worklet";
  return Math.round(x / CARD_WIDTH) * CARD_WIDTH;
};
const getCurrentIndex = (x: Animated.SharedValue<number>) => {
  "worklet";
  return {
    value: x.value / CARD_WIDTH,
  };
};

function NearbyCards() {
  const x = useSharedValue(0);
  const max_width = CARD_WIDTH * (apartments.length - 1);

  const onScroll = useAnimatedGestureHandler({
    onActive: ({ translationX }) => {
      const step = 15;
      const dir: "right" | "left" = translationX < 0 ? "left" : "right";
      const next = dir === "left" ? x.value - step : x.value + step;
      if (next > 0 && next < max_width) x.value = next;
      else if (next > 0) x.value = dir === "left" ? max_width : x.value;
    },
    onEnd({ velocityX }) {
      x.value = withTiming(roundToNearestCardWidth(x.value), {
        duration: interpolate(velocityX, [0, 1000], [400, 200]),
      });
    },
  });

  return (
    <Fragment>
      <PanGestureHandler onGestureEvent={onScroll} shouldCancelWhenOutside>
        <Animated.View
          style={[
            styles.scrollView,
            { overflow: "hidden", marginLeft: CARD_PADDING },
          ]}
        >
          {apartments.map((apartment, index) => {
            return (
              <NearbyCard
                key={apartment.name}
                apartment={apartment}
                index={index}
                x={x}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </Fragment>
  );
}
const SCALE = 0.8;

const NearbyCard = ({
  apartment,
  index,
  x,
}: {
  apartment: Apartment;
  index: number;
  x: Animated.SharedValue<number>;

  onClick?: VoidFunction;
}) => {
  const input = [index - 1, index, index + 1];

  const card_styles = useAnimatedStyle(() => {
    const currentIndex = getCurrentIndex(x);
    return {
      position: "absolute",
      zIndex: interpolate(
        index,
        [0, apartments.length - 1],
        [apartments.length, 0]
      ),
      opacity: interpolate(
        currentIndex.value,
        [index - 3, index - 1, index, index + 1, index + 2, index + 3],
        [0, 1, 1, 0, 0, 1]
      ),
      transform: [
        {
          translateX: interpolate(
            currentIndex.value,
            [index - 1, index, index + 1],
            [
              -windowWidth + SCALE * CARD_WIDTH + (SCALE * CARD_WIDTH) / 2,
              windowWidth - CARD_WIDTH,
              windowWidth + index * (CARD_PADDING * 2),
            ]
          ),
        },
        {
          scale: interpolate(currentIndex.value, input, [SCALE, 1, SCALE]),
        },
      ],
    };
  });
  const element_styles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        roundToNearestCardWidth(x.value) === index * CARD_WIDTH ? 1 : 0,
        {
          duration: 500,
        }
      ),
    };
  });

  const button_styles = useAnimatedStyle(() => ({
    opacity: withSpring(
      roundToNearestCardWidth(x.value) === index * CARD_WIDTH ? 0 : 1
    ),
  }));

  const blur_styles = useAnimatedStyle(() => {
    const isActive = roundToNearestCardWidth(x.value) === index * CARD_WIDTH;
    return {
      opacity: withTiming(isActive ? 0 : 1, {
        duration: 500,
      }),
      zIndex: isActive ? 0 : 1,
    };
  });

  return (
    <Animated.View style={[styles.card, card_styles]} key={apartment.name}>
      <View style={[styles.cardInnerCont]}>
        <Image
          resizeMethod="scale"
          resizeMode="cover"
          source={apartment.image}
          style={[
            styles.cardInnerCont,
            {
              width: CARD_WIDTH,
            },
          ]}
        />
        <AnimatedImage
          resizeMethod="scale"
          resizeMode="cover"
          source={apartment.image}
          blurRadius={100}
          style={[
            StyleSheet.absoluteFillObject,
            styles.cardInnerCont,
            {
              width: CARD_WIDTH,
            },
            blur_styles,
          ]}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => (x.value = withTiming(index * CARD_WIDTH))}
          style={[
            {
              zIndex: 111,
              position: "absolute",
              top: styles.card.height / 2 - 40,
              paddingHorizontal: 10,
              overflow: "hidden",
            },
          ]}
        >
          <Animated.View
            style={[
              button_styles,
              {
                backgroundColor: colors.paper.light,
                flex: 1,
                height: 80,
                borderRadius: 12,
                width: 10,
              },
            ]}
          />
        </TouchableOpacity>

        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.cardOverlay,
            element_styles,
          ]}
        >
          <View
            style={[
              {
                flexGrow: 1,
                paddingHorizontal: scale(15),
                paddingTop: 40,
              },
            ]}
          >
            <Text style={[styles.cardTitle]}>{apartment.name}</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 13,
            }}
          >
            <TakeALook />
            <SaveButton onClick={() => {}} />
          </View>
        </Animated.View>
        {/*  */}
      </View>
    </Animated.View>
  );
};

const TakeALook = ({ children }: { children?: ReactNode }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ flexGrow: 1, marginRight: 15 }}
    >
      <View style={[styles.takeAlookContainer]}>
        <Text
          style={{
            color: colors.primary.main,
            fontFamily: fontNames["SF-Pro-Rounded-Bold"],
            letterSpacing: 0.7,
          }}
        >
          Take a look {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const SaveButton = ({ onClick }: { onClick: VoidFunction }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onClick()}>
      <BlurView intensity={100} style={[styles.saveButtonContainer]}>
        <BookmarkIcon color={colors.paper.main} />
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: scale(20),
    height: CARD_WIDTH * (4 / 3),
  },
  card: {
    width: CARD_WIDTH,
    paddingLeft: CARD_PADDING * 2,
    height: CARD_WIDTH * (4 / 3),
  },
  cardInnerCont: {
    backgroundColor: colors.paper.main,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    flex: 1,
    display: "flex",
    overflow: "hidden",
  },
  cardTitle: {
    color: colors.paper.light,
    fontFamily: fontNames["SF-Pro-Rounded-Bold"],
    fontSize: scale(32),
  },
  cardOverlay: {
    backgroundColor: colors.mixins.alpha(colors.primary.main, 0.15),
  },
  //   button
  takeAlookContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.paper.main,
    height: BUTTON_HEIGHTS,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  saveButtonContainer: {
    height: BUTTON_HEIGHTS,
    width: BUTTON_HEIGHTS,
    borderRadius: BUTTON_HEIGHTS / 2,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NearbyCards;
