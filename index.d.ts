declare module 'react-native-form-container' {
  import {MutableRefObject, ReactNode} from 'react';
  import {ViewProps, TextInputProps} from 'react-native';

  export interface FormContainerProps extends ViewProps {
    children: ReactNode;
    formId?: string;
    formContainerRef?: MutableRefObject<FormContainerRef | null>;
    errorMessageField?: string;
  }

  export interface FormContainerRef {
    validate: (errorData?: any) => boolean;
  }

  const FormContainer: (props: FormContainerProps) => JSX.Element;
  export default FormContainer;

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

  const FormInput: (props: FormInputProps) => JSX.Element;
  export {FormInput};
}
