import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Search from "react-native-eva-icons/icons/Search";
import { assets, fontNames } from "../../assets";
import { APP_NAME } from "../../constants";
import { colors } from "../../theme/colors";
import { scale } from "../../utils/fontSize";

const headers = ["Find", "The Perfect", "Place"];
function AppHeaderText() {
  return (
    <View style={[styles.innerContainer]}>
      <View style={styles.verticalLine} />
      <View style={[styles.headerContainer]}>
        {headers.map((text) => (
          <Text key={text} style={[styles.headerText]}>
            {text}
          </Text>
        ))}
      </View>
      <AppHeaderButton />
    </View>
  );
}

function AppHeaderIcon() {
  return (
    <View style={[styles.innerContainer, styles.iconContainer, styles.center]}>
      <Image source={assets.logoLight} style={styles.logoImage} />
      <Text
        style={{
          fontFamily: fontNames["SF-Pro-Rounded-Bold"],
          fontSize: scale(15),
          color: colors.primary.main,
        }}
      >
        {APP_NAME}
      </Text>
    </View>
  );
}

function AppHeaderButton() {
  return (
    <TouchableNativeFeedback>
      <View style={[styles.buttonContainer]}>
        <View style={[styles.buttonContent]}>
          <Search fill={colors.primary.main} height={30} width={30} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

export default function AppHeader() {
  return (
    <View style={styles.container}>
      <AppHeaderIcon />
      <AppHeaderText />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: scale(15),
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    height: scale(50),
    marginBottom: 10,
  },
  logoImage: {
    height: scale(15),
    width: scale(15),
    marginEnd: 5,
  },
  headerContainer: {
    flexGrow: 1,
  },
  headerText: {
    fontSize: scale(35),
    lineHeight: scale(35),
    fontWeight: "700",
    color: colors.primary.main,
  },
  verticalLine: {
    height: "100%",
    backgroundColor: colors.secondary.main,
    width: 10,
    marginEnd: scale(20),
    borderRadius: 12,
  },

  // search button
  buttonContainer: {
    backgroundColor: colors.paper.main,
    padding: 10,
    borderRadius: 50,
  },

  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 8,
    borderRadius: 50,
    backgroundColor: colors.paper.light,
  },
});
