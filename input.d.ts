// InputProps.d.ts
import { TextInputProps, StyleProp, TextStyle, ViewStyle } from "react-native";

export interface InputProps extends TextInputProps {
  iconPosition?: "left" | "right";
  icon?: any;
  inputSize?: "sm" | "md";
  enableFocusBorder?: boolean;
  errorMessage?: string;
  required?: boolean;
  passwordShowIcon?: any;
  passwordHideIcon?: any;
  activeBorder?: string;
  inputBorder?: string;
  errorMessageComponent?: any;
  errorMessageTextStyle?: StyleProp<TextStyle>;
  errorMessageContainerStyle?: StyleProp<ViewStyle>;
}
