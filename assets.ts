const fonts: Record<keyof typeof fontNames, number> = {
  "SF-Pro-Rounded-Bold": require("./assets/fonts/SF-Pro-Rounded-Bold.ttf"),
  "SF-Pro-Rounded-Regular": require("./assets/fonts/SF-Pro-Rounded-Regular.ttf"),
};

const fontNames = {
  "SF-Pro-Rounded-Bold": "SF-Pro-Rounded-Bold",
  "SF-Pro-Rounded-Regular": "SF-Pro-Rounded-Regular",
};

const assets = {
  logoLight: require("./assets/icon.png"),
};

export { fonts, fontNames, assets };
