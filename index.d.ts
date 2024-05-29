declare module "react-native-form-container" {
  import { MutableRefObject, ReactNode } from "react";

  export interface FormContainerProps {
    children: ReactNode;
    gap?: number;
    formId?: string;
    autoErrorMessages?: boolean;
    formContainerRef?: MutableRefObject<FormContainerRef | null>;
  }

  export interface FormContainerRef {
    validate: (errorData?: any) => boolean;
  }

  const FormContainer: (props: FormContainerProps) => JSX.Element;
  export default FormContainer;
}
