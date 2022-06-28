import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { fonts, colors, sizes } from "../styles/themes";
interface TextCutomProps extends TextProps {
  children?: React.ReactNode;

  // text size
  size12?: boolean;
  size14?: boolean;
  size16?: boolean;
  size18?: boolean;
  size25?: boolean;
  size?: number;

  // styling
  bold?: boolean;
  italic?: boolean;
  medium?: boolean;
  regular?: boolean;
  montserrat?: boolean;
  transform?: "none" | "capitalize" | "uppercase" | "lowercase";
  uppercase?: boolean;
  center?: boolean;
  right?: boolean;
  justify?: boolean;
  lineHeight?: number; // line-height

  // colors
  color?: string;
  primary?: boolean;
  lightGrey?: boolean;
  white?: boolean;
  error?: boolean;
  grey?: boolean;
  mediumGrey?: boolean;
  darkGrey?: boolean;
  darkBlue?: boolean;
}

export default ({ ...props }: TextCutomProps) => (
  <Text
    {...props}
    allowFontScaling={false}
    style={[
      styles.text,
      props.size12 && styles.size12,
      props.size14 && styles.size14,
      props.size16 && styles.size16,
      props.size18 && styles.size18,
      props.size25 && styles.size25,
      props.size && { fontSize: props.size },

      // styling
      props.transform && { textTransform: props.transform },
      props.uppercase && { textTransform: "uppercase" },
      props.lineHeight && { lineHeight: props.lineHeight },
      props.bold && styles.bold,
      props.italic && styles.italic,
      props.regular && styles.regular,
      props.medium && styles.medium,
      props.center && styles.center,
      props.right && styles.right,
      props.justify && styles.justify,

      // color
      props.color && styles[props.color],
      props.color && { color: props.color },
      props.primary && styles.primary,
      props.lightGrey && styles.lightGrey,
      props.white && styles.white,
      props.error && styles.error,
      props.grey && styles.grey,
      props.mediumGrey && styles.mediumGrey,
      props.darkGrey && styles.darkGrey,
      props.darkBlue && styles.darkBlue,

      // rewrite predefined styles
      props.style,
    ]}
  >
    {props.children}
  </Text>
);

const styles : any = StyleSheet.create({
  // default style
  text: {
    fontSize: sizes.size16,
    color: colors.darkGrey,
    lineHeight: 24,
    fontFamily: "text-regular",
  },

  // variations
  bold: {
    fontFamily: "text-bold",
  },
  italic: {
    fontFamily: "text-italic",
  },
  medium: {
    fontFamily: "text-medium",
  },
  regular: {
    fontFamily: "text-regular",
  },
    montserrat: {
    fontFamily: "text-montserrat",
    },

  // position
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  justify: { textAlign: "justify" },

  // colors
  primary: { color: colors.primary },
  lightGrey: { color: colors.lightGrey },
  white: { color: colors.white },
  error: { color: colors.error },
  grey: { color: colors.grey },
  mediumGrey: { color: colors.mediumGrey },
  darkGrey: { color: colors.darkGrey },
  darkBlue: { color: colors.darkBlue },

  // fonts
  size12: fonts.size12,
  size14: fonts.size14,
  size16: fonts.size16,
  size18: fonts.size18,
  size25: fonts.size25,
});
