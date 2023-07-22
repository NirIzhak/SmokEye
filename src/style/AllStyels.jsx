import { DefaultTheme } from "react-native-paper";
export const Colors = {
  primary: '#F39508',
  black: '#000',
  white: '#fff',
  borderColor: "#8C8A89",
  transparent: "transparent"
}
export const fontSizes = {
  XL: 22,
  L: 20,
  M: 18,
  S: 16
}
export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F39508",
    accent: "#f1c40f",
  },
};
