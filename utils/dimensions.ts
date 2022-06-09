import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get("window");
export const screenWidth = width;
export const screenHeight = height;
export const isSmallDevice = screenWidth < 375;
export const isMediumDevice = screenWidth < 375;
export const isLargeDevice = screenWidth < 375;