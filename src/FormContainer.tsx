import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { LogBox, View, ViewProps } from "react-native";
import { useTranslation } from "react-i18next";

export interface FormContainerProps extends ViewProps {
  children: ReactNode;
  gap?: number;
  formId?: string;
  autoErrorMessages?: boolean;
  formContainerRef?: MutableRefObject<FormContainerRef | null>;
}

export interface FormContainerRef {
  validate: (errorData?: any) => boolean;
}
LogBox.ignoreLogs([/react-i18next::/]);
export default function FormContainer(props: FormContainerProps) {
  const {
    children: initialChildren,
    gap = 10,
    formContainerRef,
    formId,
  } = props;
  const { t } = useTranslation(formId);
  const [children, setChildren] = useState<ReactNode[] | any>(
    React.Children.toArray(initialChildren)
  );
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const checkValidation = useCallback((errorData: any) => {
    handleErrorMessage(errorData);
  }, []);

  const inputCheckValidation = useCallback((): boolean => {
    let isEmpty = false;
    React.Children.forEach(initialChildren, (child) => {
      if (React.isValidElement(child)) {
        const childProps = { ...child.props };
        if (childProps.id) {
          if (childProps.required && childProps.value === "") {
            isEmpty = true;
          }
        }
      }
    });
    return isEmpty;
  }, [initialChildren]);

  useEffect(() => {
    if (formContainerRef) {
      formContainerRef.current = {
        validate: (errorData: any) => {
          checkValidation(errorData);
          return inputCheckValidation();
        },
      };
    }
    return () => {
      if (formContainerRef) {
        formContainerRef.current = null;
      }
    };
  }, [formContainerRef, inputCheckValidation]);

  const handleErrorMessage = useCallback((errorData?: any) => {
    let errorFields = {} as any;
    if (props.autoErrorMessages && !errorData) {
      React.Children.forEach(initialChildren, (child) => {
        if (React.isValidElement(child)) {
          const childProps = { ...child.props };
          if (childProps.required && childProps?.id) {
            errorFields[childProps.id] = t(childProps.id);
          }
        }
      });
      setErrors(errorFields);
    } else {
      setErrors(errorData);
    }
  }, []);
  useEffect(() => {
    setChildren(
      React.Children.map(initialChildren, (child) => {
        if (React.isValidElement(child)) {
          const childProps = { ...child.props };

          if (childProps.id) {
            if (childProps.required) {
              let error = errors[childProps.id];
              if (childProps.value === "" && error) {
                if (props.autoErrorMessages) {
                  childProps.errorMessage = t(childProps.id);
                } else {
                  if (error) {
                    childProps.errorMessage = error;
                  }
                }
              } else {
                delete childProps.errorMessage;
              }
            }
            if (childProps.type === "checkbox") {
              if (!childProps.checked) {
                if (props.autoErrorMessages) {
                  childProps.errorMessage = t(childProps.id);
                } else {
                  let error = errors[childProps.id];
                  if (error) {
                    childProps.errorMessage = error;
                  }
                }
              } else {
                delete childProps.errorMessage;
              }
            }
          } else {
            delete childProps.errorMessage;
          }
          return React.cloneElement(child, childProps);
        }
        return child;
      })
    );
  }, [initialChildren, errors]);
  return <View {...props}>{children}</View>;
}
