import { FlexAlignType } from "react-native";

export const colors = {
  primary: '#489620',
  lightGrey: '#EEEEEE',
  white: '#FFFFFF',
  error: '#F44336',
  grey: '#C9C2C0',
  mediumGrey: '#9E9E9E',
  darkGrey: '#231F20',
  darkBlue: '#121653',
  mask: 'rgba(0, 0, 0, 0.3)',
  warning: '#FFCA28',
};

export const sizes = {
  size12: 12,
  size14: 14,
  size16: 16,
  size18: 18,
  size25: 25
};

export const fonts = {
  size12: {
    fontSize: sizes.size12
  },
  size14: {
    fontSize: sizes.size14
  },
  size16: {
    fontSize: sizes.size16
  },
  size18: {
    fontSize: sizes.size18
  },
  size25: {
    fontSize: sizes.size25
  }
};


export const appStyle = {
  image: {
    width: "100%",
    height: "100%"
  },
  divider: {
    height: 1,
    backgroundColor: colors.grey,
    opacity: 0.5
  },
  button: {
    borderRadius: 8,
    backgroundColor: colors.primary
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9"
  }
};

export function border(borderWidth: number, borderColor: string) {
  return {
    borderColor,
    borderWidth,
  };
}

type FlexJustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'

export function alignJustify(justifyContent: FlexJustifyContent = 'center', alignItems: FlexAlignType = 'center') {
  return {
    justifyContent,
    alignItems,
  }
}

export function boxShadow(color: any, x = 0, y = 6, blur = 10) {
  return {
    shadowColor: color,
    shadowOffset: { width: x, height: y },
    shadowOpacity: 1,
    shadowRadius: blur,
    elevation: y < 0 ? 2 : y + 1
  };
}
