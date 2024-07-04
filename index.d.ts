declare module 'react-native-form-container' {
  import { MutableRefObject, ReactNode } from 'react';
  import { ViewProps, TextInputProps } from 'react-native';

  export interface FormContainerProps extends ViewProps {
    children: ReactNode;
    formContainerRef?: MutableRefObject<FormContainerRef | null>;
    errorMessageField?: string;
  }
  export interface FormContainerRef {
    validate: (errorData?: any) => boolean;
  }

  const FormContainer: (props: FormContainerProps) => JSX.Element;
  export default FormContainer;

  export interface ValidationFields {
    email?: boolean;
    password?: boolean;
    text?: boolean;
    phone?: boolean;
    number?: boolean;
  }
  export interface ValidationPasswordOptions {
    minLength?: number;
    speacial?: boolean;
    upperCase?: boolean;
    lowerCase?: boolean;
    number?: boolean;
  }
  export type ValidationFieldsKeys = typeof ValidationFields;

  export interface InputProps extends TextInputProps {
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

  export interface ValidationProps extends InputProps {
    required: true;
    id: string;
  }
  export interface NonValidationProps extends InputProps {
    required?: never;
    id?: never;
  }

  export interface PasswordInputProps extends InputProps {
    passwordOptions: ValidationPasswordOptions;
    validation: 'password';

  }

  export interface NonPasswordFormInputProps extends InputProps {
    validation?: Exclude<keyof ValidationFields, 'password'>;
    passwordOptions?: never;
  }

  export type FormInputProps = ValidationProps | NonValidationProps;
  export type FormInputProps = PasswordInputProps | NonPasswordFormInputProps;

  const FormInput: (props: FormInputProps) => JSX.Element;
  export { FormInput };
}
