import React, {useState} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  Text,
} from 'react-native';
import ValidationFields, {ValidationPasswordOptions} from './ValidationFields';

interface InputProps extends TextInputProps {
  iconPosition?: 'left' | 'right';
  icon?: any;
  inputSize?: 'sm' | 'md';
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
  validation?: keyof ValidationFields;
}
interface PasswordInputProps extends InputProps {
  passwordOptions: ValidationPasswordOptions;
  validation: 'password';
}
interface NonPasswordFormInputProps extends InputProps {
  validation?: Exclude<keyof ValidationFields, 'password'>;
  passwordOptions?: never;
}

export type FormInputProps = PasswordInputProps | NonPasswordFormInputProps;

export default function FormInput({
  iconPosition = 'left',
  icon = undefined,
  inputSize = 'md',
  enableFocusBorder = true,
  errorMessage,
  required = false,
  passwordHideIcon,
  passwordShowIcon,
  activeBorder = 'green',
  inputBorder = '#143722',
  errorMessageComponent,
  errorMessageTextStyle = {color: 'red', marginTop: 5},
  errorMessageContainerStyle,
  ...props
}: FormInputProps) {
  const [passwordShow, setPasswordShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    if (enableFocusBorder) {
      setIsFocused(true);
    }
  };
  const handleBlur = () => {
    if (enableFocusBorder) {
      setIsFocused(false);
    }
  };

  const size = inputSize === 'sm' ? 10 : 15;
  const iconSize = inputSize === 'sm' ? 17 : 20;

  const iconSmTop = inputSize === 'sm' ? (Platform.OS === 'ios' ? 10 : 15) : 20;
  const iconMdTop = inputSize === 'md' ? 15 : 20;
  const iconTop = inputSize === 'sm' ? iconSmTop : iconMdTop;

  const inputPaddingHorizontal = inputSize === 'sm' ? 33 : 40;
  return (
    <View>
      {iconPosition === 'left' && icon && icon()}
      <TextInput
        autoFocus={false}
        {...props}
        secureTextEntry={props.secureTextEntry && !passwordShow}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          {
            padding: size,
            paddingLeft:
              iconPosition === 'left' && icon !== undefined
                ? inputPaddingHorizontal
                : size,
            paddingRight:
              iconPosition === 'right' && icon !== undefined
                ? inputPaddingHorizontal
                : size,
            borderColor: isFocused ? activeBorder : inputBorder,
          },
        ]}
      />
      {props.secureTextEntry && (
        <TouchableOpacity
          style={[styles.passwordIcon, {top: iconTop, right: 10}]}
          onPress={() => setPasswordShow(!passwordShow)}>
          {passwordShow ? passwordShowIcon() : passwordHideIcon()}
        </TouchableOpacity>
      )}

      {iconPosition === 'right' && icon !== undefined && (
        <View style={[styles.icon, {top: iconTop, right: 10}]}>{icon()}</View>
      )}
      {errorMessage && (
        <View style={errorMessageContainerStyle}>
          {errorMessageComponent ? (
            errorMessageComponent
          ) : (
            <Text style={errorMessageTextStyle}>{errorMessage}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#143722',
    borderWidth: 1,
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
  },
  passwordIcon: {
    position: 'absolute',
    zIndex: 1,
  },
});
