export interface ThemeColors {
  screenBackgroundColor: string;
  backgroundColor: string;
  primaryColor: string;
  primaryColor_light: string;
  secondaryColor: string;
  secondaryColor_light: string;
  secondaryColor_dark: string;
  errorColor: string;
  errorColor_light: string;
  cautionColor: string;
  cautionColor_light: string;
  plannedColor: string;
  plannedColor_light: string;
  progressColor: string;
  progressColor_light: string;
  priorityColor: string;
  priorityColor_light: string;
  text: string;
  placeholderTextColor: string;
}

export interface Theme {
  key: string;
  name: string;
  colors: ThemeColors;
}

export const lightTheme: Theme = {
  key: "light",
  name: "Light",
  colors: {
    screenBackgroundColor: "#F2F2F2",
    backgroundColor: "#FAFBFC",
    primaryColor: "#3ECF8E",
    primaryColor_light: "#84DCB7",
    secondaryColor: "#CECECE",
    secondaryColor_light: "#DDDDDD",
    secondaryColor_dark: "#606060",
    errorColor: "#E54D1D",
    errorColor_light: "#EF9477",
    cautionColor: "#F49B76",
    cautionColor_light: "#F5C0AA",
    plannedColor: "#B5A1DF",
    plannedColor_light: "#D3C7EC",
    progressColor: "#FFD101",
    progressColor_light: "#FCE064",
    priorityColor: "#36AEE1",
    priorityColor_light: "#81C9E8",
    text: "#000000",
    placeholderTextColor: "#C0C0C0",
  },
};

export const colorBlindTheme: Theme = {
  key: "colorBlind",
  name: "Color blind",
  colors: {
    screenBackgroundColor: "#F2F2F2",
    backgroundColor: "#FFFFFF",
    primaryColor: "#994F00",
    primaryColor_light: "#BF9263",
    secondaryColor: "#3288D9",
    secondaryColor_light: "#63A4E0",
    secondaryColor_dark: "#006CD1",
    errorColor: "#E54D1D",
    errorColor_light: "#EF9477",
    cautionColor: "#F49B76",
    cautionColor_light: "#F5C0AA",
    plannedColor: "#B5A1DF",
    plannedColor_light: "#D3C7EC",
    progressColor: "#FFD101",
    progressColor_light: "#FCE064",
    priorityColor: "#36AEE1",
    priorityColor_light: "#81C9E8",
    text: "#000000",
    placeholderTextColor: "#C0C0C0",
  },
};
